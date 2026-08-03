import { BriefcaseBusiness, FileText, Mail, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePortfolio } from '../../features/PortfolioContext'
import { portfolioRepository } from '../../services/portfolioRepository'

export function AdminDashboard() {
  const { projects, experiences, certificates } = usePortfolio()
  const messages = portfolioRepository.getLocalMessages()
  const stats = [
    { label: 'Projects', value: projects.length, icon: BriefcaseBusiness, tone: 'bg-blush/45' },
    { label: 'Published', value: projects.filter((project) => project.isPublished !== false).length, icon: Star, tone: 'bg-peach/50' },
    { label: 'Experiences', value: experiences.length, icon: FileText, tone: 'bg-lavender/45' },
    { label: 'Unread messages', value: messages.filter((message) => message.status === 'unread').length, icon: Mail, tone: 'bg-sage/55' },
  ]
  return <div><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">Dashboard</p><h2 className="mt-2 font-display text-4xl">Content overview</h2></div><Link className="button-primary" to="/admin/projects/create">Add a project</Link></div><div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(({ label, value, icon: Icon, tone }) => <article key={label} className="rounded-2xl border border-line bg-white p-5 shadow-soft"><span className={`grid size-10 place-items-center rounded-full ${tone} text-burgundy`}><Icon size={18} /></span><p className="mt-5 text-3xl font-display">{value}</p><p className="mt-1 text-sm text-muted">{label}</p></article>)}</div><div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]"><article className="rounded-3xl border border-line bg-white p-6 shadow-soft"><div className="flex items-center justify-between"><h3 className="font-display text-2xl">Recent projects</h3><Link to="/admin/projects" className="text-sm font-semibold text-burgundy">Manage</Link></div><div className="mt-5 grid gap-3">{projects.slice(0, 4).map((project) => <div key={project.id} className="flex items-center justify-between gap-4 rounded-xl bg-cream p-4"><div><p className="font-medium">{project.title}</p><p className="mt-1 text-xs text-muted">{project.category} · {project.year}</p></div><span className={`pill ${project.isPublished !== false ? 'bg-sage/35' : 'bg-peach/35'}`}>{project.isPublished !== false ? 'Published' : 'Draft'}</span></div>)}</div></article><article className="rounded-3xl border border-line bg-white p-6 shadow-soft"><h3 className="font-display text-2xl">Data source</h3><p className="mt-4 text-sm leading-6 text-muted">This dashboard reads the Laravel API when available. In local preview mode, it stores changes in this browser so the interface can be tested without a server.</p><p className="mt-5 text-sm font-semibold text-burgundy">Certificates tracked: {certificates.length}</p></article></div></div>
}
