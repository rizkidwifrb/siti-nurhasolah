import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, LoaderCircle, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { LoadingState } from '../../components/LoadingState'
import { portfolioRepository } from '../../services/portfolioRepository'

const projectSchema = z.object({
  title: z.string().trim().min(3, 'A title is required.').max(180),
  slug: z.string().trim().max(190).optional(),
  category: z.string().trim().min(1, 'Choose a category.'),
  year: z.string().trim().max(12).optional(),
  shortDescription: z.string().trim().min(10, 'Add a short description.').max(400),
  overview: z.string().trim().min(20, 'Add a project overview.').max(10000),
  context: z.string().trim().max(6000).optional(),
  objective: z.string().trim().max(6000).optional(),
  targetAudience: z.string().trim().max(2000).optional(),
  client: z.string().trim().max(180).optional(),
  videoWatchUrl: z.string().trim().url('Use a valid URL.').or(z.literal('')).optional(),
  sourceUrl: z.string().trim().url('Use a valid URL.').or(z.literal('')).optional(),
  isFeatured: z.boolean().optional(),
  isPublished: z.boolean().optional(),
})

const emptyProject = { title: '', slug: '', category: 'Creative Content', year: '', shortDescription: '', overview: '', context: '', objective: '', targetAudience: '', client: '', videoWatchUrl: '', sourceUrl: '', isFeatured: false, isPublished: false }

export function AdminProjectForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(Boolean(id))
  const [notice, setNotice] = useState('')
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(projectSchema), defaultValues: emptyProject })
  useEffect(() => { if (!id) return; portfolioRepository.getAdminProjects().then(({ items }) => { const existing = items.find((item) => String(item.id) === id); if (existing) reset({ ...emptyProject, ...existing }); setLoading(false) }) }, [id, reset])
  const submit = async (values) => { const result = await portfolioRepository.saveProject({ ...values, id: id ? Number(id) : undefined, categories: [values.category] }); setNotice(result.source === 'api' ? 'Project saved to the API.' : 'Project saved in local preview mode.'); window.setTimeout(() => navigate('/admin/projects'), 550) }
  if (loading) return <LoadingState label="Loading project…" />
  return <div><Link className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:text-ink" to="/admin/projects"><ArrowLeft size={16} /> Back to projects</Link><div className="mt-7"><p className="eyebrow">{id ? 'Edit project' : 'New project'}</p><h2 className="mt-2 font-display text-4xl">{id ? 'Refine the story' : 'Add a project'}</h2></div><form className="mt-8 grid gap-6" onSubmit={handleSubmit(submit)} noValidate><section className="rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8"><div className="grid gap-5 lg:grid-cols-2"><AdminField label="Title" error={errors.title?.message}><input className="field-input" {...register('title')} /></AdminField><AdminField label="Slug" error={errors.slug?.message}><input className="field-input" placeholder="Generated from title if blank" {...register('slug')} /></AdminField><AdminField label="Category" error={errors.category?.message}><select className="field-input" {...register('category')}><option>Copywriting</option><option>Scriptwriting</option><option>Journalism</option><option>Video Editing</option><option>Creative Content</option></select></AdminField><AdminField label="Year" error={errors.year?.message}><input className="field-input" placeholder="2026" {...register('year')} /></AdminField></div><div className="mt-5"><AdminField label="Short description" error={errors.shortDescription?.message}><textarea className="field-input min-h-24" {...register('shortDescription')} /></AdminField></div><div className="mt-5"><AdminField label="Project overview" error={errors.overview?.message}><textarea className="field-input min-h-40" {...register('overview')} /></AdminField></div><div className="mt-5 grid gap-5 lg:grid-cols-2"><AdminField label="Context" error={errors.context?.message}><textarea className="field-input min-h-28" {...register('context')} /></AdminField><AdminField label="Objective" error={errors.objective?.message}><textarea className="field-input min-h-28" {...register('objective')} /></AdminField></div><div className="mt-5 grid gap-5 lg:grid-cols-2"><AdminField label="Target audience" error={errors.targetAudience?.message}><input className="field-input" {...register('targetAudience')} /></AdminField><AdminField label="Client or organization" error={errors.client?.message}><input className="field-input" {...register('client')} /></AdminField></div></section><section className="rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8"><h3 className="font-display text-2xl">Links and visibility</h3><div className="mt-5 grid gap-5 lg:grid-cols-2"><AdminField label="Video URL" error={errors.videoWatchUrl?.message}><input className="field-input" type="url" {...register('videoWatchUrl')} /></AdminField><AdminField label="Source or document URL" error={errors.sourceUrl?.message}><input className="field-input" type="url" {...register('sourceUrl')} /></AdminField></div><div className="mt-6 flex flex-wrap gap-5"><label className="inline-flex min-h-11 items-center gap-3 text-sm font-medium"><input className="size-4 accent-burgundy" type="checkbox" {...register('isFeatured')} /> Mark as featured</label><label className="inline-flex min-h-11 items-center gap-3 text-sm font-medium"><input className="size-4 accent-burgundy" type="checkbox" {...register('isPublished')} /> Publish project</label></div><p className="mt-5 rounded-xl bg-lavender/25 p-3 text-xs leading-5 text-[#51496E]">Image upload and storage are handled by the Laravel API in production. This frontend preview intentionally does not upload a file to a third party.</p></section>{notice && <p role="status" className="rounded-xl bg-sage/45 px-4 py-3 text-sm text-[#35533C]">{notice}</p>}<div className="flex justify-end gap-3"><Link className="button-secondary" to="/admin/projects">Cancel</Link><button type="submit" className="button-primary" disabled={isSubmitting}>{isSubmitting ? <><LoaderCircle className="animate-spin" size={16} /> Saving…</> : <><Save size={16} /> Save project</>}</button></div></form></div>
}

function AdminField({ label, error, children }) { return <div><label className="field-label">{label}</label>{children}{error && <p className="mt-2 text-xs text-[#B35454]">{error}</p>}</div> }
