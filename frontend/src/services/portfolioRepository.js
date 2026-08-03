import { api } from './api'
import { certificates as seedCertificates, experiences as seedExperiences, projects as seedProjects } from '../data/portfolioData'

const LOCAL_KEYS = {
  projects: 'siti-portfolio-projects',
  experiences: 'siti-portfolio-experiences',
  certificates: 'siti-portfolio-certificates',
  messages: 'siti-portfolio-messages',
  admin: 'siti-portfolio-admin',
}

const clone = (value) => JSON.parse(JSON.stringify(value))
const canUseLocalFallback = (error) => !error?.response
const readLocal = (key, fallback) => {
  try {
    const stored = window.localStorage.getItem(key)
    return stored ? JSON.parse(stored) : clone(fallback)
  } catch {
    return clone(fallback)
  }
}
const writeLocal = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

const normalizeCollection = (response) => response?.data?.data ?? response?.data ?? []

export const portfolioRepository = {
  async getProjects(params = {}) {
    try {
      const response = await api.get('/projects', { params })
      return { items: normalizeCollection(response), source: 'api' }
    } catch (error) {
      if (!canUseLocalFallback(error)) throw error
      let items = readLocal(LOCAL_KEYS.projects, seedProjects).filter((project) => project.isPublished !== false)
      if (params.category && params.category !== 'all') items = items.filter((project) => project.categories?.includes(params.category) || project.category === params.category)
      if (params.search) {
        const query = params.search.toLowerCase()
        items = items.filter((project) => `${project.title} ${project.shortDescription} ${project.category}`.toLowerCase().includes(query))
      }
      return { items, source: 'local' }
    }
  },

  async getProject(slug) {
    try {
      const response = await api.get(`/projects/${slug}`)
      return { item: response.data.data ?? response.data, source: 'api' }
    } catch (error) {
      if (!canUseLocalFallback(error)) throw error
      const item = readLocal(LOCAL_KEYS.projects, seedProjects).find((project) => project.slug === slug && project.isPublished !== false)
      return { item, source: 'local' }
    }
  },

  async getExperiences() {
    try {
      const response = await api.get('/experiences')
      return { items: normalizeCollection(response), source: 'api' }
    } catch (error) {
      if (!canUseLocalFallback(error)) throw error
      return { items: readLocal(LOCAL_KEYS.experiences, seedExperiences), source: 'local' }
    }
  },

  async getCertificates() {
    try {
      const response = await api.get('/certificates')
      return { items: normalizeCollection(response), source: 'api' }
    } catch (error) {
      if (!canUseLocalFallback(error)) throw error
      return { items: readLocal(LOCAL_KEYS.certificates, seedCertificates), source: 'local' }
    }
  },

  async submitContact(payload) {
    try {
      const response = await api.post('/contact', payload)
      return { data: response.data, source: 'api' }
    } catch (error) {
      if (!canUseLocalFallback(error)) throw error
      const messages = readLocal(LOCAL_KEYS.messages, [])
      messages.unshift({ id: Date.now(), ...payload, status: 'unread', createdAt: new Date().toISOString() })
      writeLocal(LOCAL_KEYS.messages, messages)
      return { data: { message: 'Saved in local preview mode.' }, source: 'local' }
    }
  },

  async login(credentials) {
    try {
      const response = await api.post('/admin/login', credentials)
      const user = response.data.data ?? response.data
      writeLocal(LOCAL_KEYS.admin, user)
      return { user, source: 'api' }
    } catch (error) {
      if (!canUseLocalFallback(error)) throw error
      const user = { name: credentials.email.split('@')[0] || 'Admin', email: credentials.email, localPreview: true }
      writeLocal(LOCAL_KEYS.admin, user)
      return { user, source: 'local' }
    }
  },

  currentAdmin() {
    return readLocal(LOCAL_KEYS.admin, null)
  },

  async logout() {
    try { await api.post('/admin/logout') } catch (error) { if (!canUseLocalFallback(error)) throw error }
    window.localStorage.removeItem(LOCAL_KEYS.admin)
  },

  async getAdminProjects() {
    try {
      const response = await api.get('/admin/projects')
      return { items: normalizeCollection(response), source: 'api' }
    } catch (error) {
      if (!canUseLocalFallback(error)) throw error
      return { items: readLocal(LOCAL_KEYS.projects, seedProjects), source: 'local' }
    }
  },

  async saveProject(project) {
    const isNew = !project.id
    try {
      const response = isNew ? await api.post('/admin/projects', project) : await api.put(`/admin/projects/${project.id}`, project)
      return { item: response.data.data ?? response.data, source: 'api' }
    } catch (error) {
      if (!canUseLocalFallback(error)) throw error
      const items = readLocal(LOCAL_KEYS.projects, seedProjects)
      const normalized = {
        ...project,
        id: project.id || Date.now(),
        slug: project.slug || project.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        categories: project.categories?.length ? project.categories : [project.category || 'Creative Content'],
        isPublished: Boolean(project.isPublished),
        isFeatured: Boolean(project.isFeatured),
      }
      const index = items.findIndex((item) => item.id === normalized.id)
      if (index >= 0) items[index] = normalized
      else items.unshift(normalized)
      writeLocal(LOCAL_KEYS.projects, items)
      return { item: normalized, source: 'local' }
    }
  },

  async deleteProject(id) {
    try {
      await api.delete(`/admin/projects/${id}`)
      return { source: 'api' }
    } catch (error) {
      if (!canUseLocalFallback(error)) throw error
      writeLocal(LOCAL_KEYS.projects, readLocal(LOCAL_KEYS.projects, seedProjects).filter((item) => item.id !== id))
      return { source: 'local' }
    }
  },

  getLocalMessages() { return readLocal(LOCAL_KEYS.messages, []) },
  setLocalMessages(messages) { writeLocal(LOCAL_KEYS.messages, messages) },
  getLocalCollection(name) {
    const map = { experiences: [LOCAL_KEYS.experiences, seedExperiences], certificates: [LOCAL_KEYS.certificates, seedCertificates] }
    return readLocal(...map[name])
  },
  setLocalCollection(name, value) {
    const map = { experiences: LOCAL_KEYS.experiences, certificates: LOCAL_KEYS.certificates }
    writeLocal(map[name], value)
  },

  async getAdminCollection(name) {
    try {
      const response = await api.get(`/admin/${name}`)
      return { items: normalizeCollection(response), source: 'api' }
    } catch (error) {
      if (!canUseLocalFallback(error)) throw error
      return { items: this.getLocalCollection(name), source: 'local' }
    }
  },

  async saveCollection(name, item) {
    try {
      const response = item.id ? await api.put(`/admin/${name}/${item.id}`, item) : await api.post(`/admin/${name}`, item)
      return { item: response.data.data ?? response.data, source: 'api' }
    } catch (error) {
      if (!canUseLocalFallback(error)) throw error
      const items = this.getLocalCollection(name)
      const saved = { ...item, id: item.id || Date.now() }
      const index = items.findIndex((entry) => entry.id === saved.id)
      if (index >= 0) items[index] = saved
      else items.push(saved)
      this.setLocalCollection(name, items)
      return { item: saved, source: 'local' }
    }
  },

  async deleteCollectionItem(name, id) {
    try {
      await api.delete(`/admin/${name}/${id}`)
      return { source: 'api' }
    } catch (error) {
      if (!canUseLocalFallback(error)) throw error
      this.setLocalCollection(name, this.getLocalCollection(name).filter((item) => item.id !== id))
      return { source: 'local' }
    }
  },

  async getMessages() {
    try {
      const response = await api.get('/admin/messages')
      return { items: normalizeCollection(response), source: 'api' }
    } catch (error) {
      if (!canUseLocalFallback(error)) throw error
      return { items: this.getLocalMessages(), source: 'local' }
    }
  },

  async updateMessage(id, status) {
    try {
      const response = await api.put(`/admin/messages/${id}`, { status })
      return { item: response.data.data ?? response.data, source: 'api' }
    } catch (error) {
      if (!canUseLocalFallback(error)) throw error
      const next = this.getLocalMessages().map((message) => message.id === id ? { ...message, status } : message)
      this.setLocalMessages(next)
      return { item: next.find((message) => message.id === id), source: 'local' }
    }
  },

  async deleteMessage(id) {
    try {
      await api.delete(`/admin/messages/${id}`)
      return { source: 'api' }
    } catch (error) {
      if (!canUseLocalFallback(error)) throw error
      this.setLocalMessages(this.getLocalMessages().filter((message) => message.id !== id))
      return { source: 'local' }
    }
  },
}
