import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
const apiOrigin = new URL(apiBaseUrl, window.location.origin).origin
const writeMethods = new Set(['post', 'put', 'patch', 'delete'])

export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  withXSRFToken: true,
  timeout: 8000,
  headers: { Accept: 'application/json' },
})

const csrfClient = axios.create({
  withCredentials: true,
  timeout: 8000,
  headers: { Accept: 'application/json' },
})

export const ensureCsrfCookie = () => csrfClient.get(`${apiOrigin}/sanctum/csrf-cookie`)

api.interceptors.request.use(async (config) => {
  if (writeMethods.has((config.method || 'get').toLowerCase())) await ensureCsrfCookie()
  return config
})

export const isApiAvailable = async () => {
  try {
    await api.get('/health')
    return true
  } catch {
    return false
  }
}
