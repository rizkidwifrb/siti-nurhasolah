import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { LoadingState } from '../../components/LoadingState'
import { portfolioRepository } from '../../services/portfolioRepository'

export function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [pendingDelete, setPendingDelete] = useState(null)
  const load = async () => { setLoading(true); const response = await portfolioRepository.getAdminProjects(); setProjects(response.items); setLoading(false) }
  useEffect(() => { load() }, [])
  const remove = async () => { await portfolioRepository.deleteProject(pendingDelete.id); setPendingDelete(null); load() }
  return <div><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">Content</p><h2 className="mt-2 font-display text-4xl">Projects</h2></div><Link className="button-primary" to="/admin/projects/create"><Plus size={16} /> Add project</Link></div>{loading ? <div className="mt-8"><LoadingState /></div> : <div className="mt-8 overflow-hidden rounded-3xl border border-line bg-white shadow-soft"><div className="hidden grid-cols-[1fr_140px_120px_116px] gap-4 border-b border-line px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted md:grid"><span>Project</span><span>Category</span><span>Status</span><span>Actions</span></div><div className="divide-y divide-line">{projects.map((project) => <article key={project.id} className="grid gap-4 px-5 py-5 md:grid-cols-[1fr_140px_120px_116px] md:items-center md:px-6"><div><p className="font-medium text-ink">{project.title}</p><p className="mt-1 text-xs text-muted">{project.year || 'No year'} · /{project.slug}</p></div><span className="pill w-fit">{project.category}</span><span className={`pill w-fit ${project.isPublished !== false ? 'bg-sage/40' : 'bg-peach/40'}`}>{project.isPublished !== false ? 'Published' : 'Draft'}</span><div className="flex gap-2"><Link className="grid size-10 place-items-center rounded-xl border border-line text-burgundy hover:bg-cream" aria-label={`Edit ${project.title}`} to={`/admin/projects/${project.id}/edit`}><Pencil size={16} /></Link><button type="button" className="grid size-10 place-items-center rounded-xl border border-line text-[#A34E4E] hover:bg-[#FDE9E8]" aria-label={`Delete ${project.title}`} onClick={() => setPendingDelete(project)}><Trash2 size={16} /></button></div></article>)}</div></div>}<ConfirmDialog open={Boolean(pendingDelete)} title="Delete this project?" description={pendingDelete ? `“${pendingDelete.title}” will be removed from the current data source.` : ''} onCancel={() => setPendingDelete(null)} onConfirm={remove} /></div>
}
