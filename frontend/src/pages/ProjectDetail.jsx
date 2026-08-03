import { ArrowLeft, ArrowUpRight, Calendar, ExternalLink, Film, Link as LinkIcon, UserRound } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { EmptyState } from '../components/EmptyState'
import { PageLayout } from '../components/PageLayout'
import { SEO } from '../components/SEO'
import { VideoArtwork } from '../components/VideoArtwork'
import { usePortfolio } from '../features/PortfolioContext'

function DetailItem({ icon: Icon, label, value }) {
  if (!value) return null
  return <div className="flex gap-3"><Icon size={17} className="mt-0.5 shrink-0 text-burgundy" /><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{label}</p><p className="mt-1 text-sm leading-6 text-ink">{value}</p></div></div>
}

export function ProjectDetail() {
  const { slug } = useParams()
  const { projects } = usePortfolio()
  const project = projects.find((item) => item.slug === slug && item.isPublished !== false)
  if (!project) return <PageLayout><SEO title="Project not found" path={`/projects/${slug || ''}`} /><section className="page-shell py-24"><EmptyState title="This story hasn’t been written yet" description="The project you are looking for is not available." /><Link className="button-secondary mt-7" to="/projects"><ArrowLeft size={16} /> Back to projects</Link></section></PageLayout>

  const structuredData = { '@context': 'https://schema.org', '@type': 'CreativeWork', name: project.title, description: project.shortDescription, datePublished: project.publishedAt || project.year, creator: { '@type': 'Person', name: 'Siti Nurhasolah' }, url: `${import.meta.env.VITE_SITE_URL || 'http://localhost:5173'}/projects/${project.slug}` }
  return (
    <PageLayout>
      <SEO title={project.title} path={`/projects/${project.slug}`} description={project.shortDescription} structuredData={structuredData} />
      <section className="page-shell py-10 sm:py-16"><Link className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:text-ink" to="/projects"><ArrowLeft size={16} /> All projects</Link><div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end"><div><span className="pill">{project.category}</span><h1 className="display-title mt-5 max-w-4xl">{project.title}</h1><p className="prose-copy mt-6 max-w-2xl">{project.shortDescription}</p></div><div className="grid gap-5 rounded-3xl border border-line bg-white p-6 sm:grid-cols-2"><DetailItem icon={Calendar} label="Year" value={project.year} /><DetailItem icon={UserRound} label="Organization" value={project.client} />{project.role && <DetailItem icon={UserRound} label="Role" value={project.role} />}{project.duration && <DetailItem icon={Film} label="Duration" value={project.duration} />}</div></div></section>
      <section className="page-shell"><div className="overflow-hidden rounded-[2rem] border border-line bg-[#332A2E] shadow-lift">{project.videoUrl ? <div className="aspect-video"><iframe className="h-full w-full" src={project.videoUrl} title={`${project.title} video`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div> : <VideoArtwork />}</div></section>
      <section className="page-shell section-space"><div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]"><div className="space-y-10"><article><p className="eyebrow">Overview</p><h2 className="section-title mt-3">The project</h2><p className="prose-copy mt-5">{project.overview}</p></article>{project.context && <article><p className="eyebrow">Context</p><p className="prose-copy mt-3">{project.context}</p></article>}{project.objective && <article><p className="eyebrow">Objective</p><p className="prose-copy mt-3">{project.objective}</p></article>}{project.targetAudience && <article><p className="eyebrow">Audience</p><p className="prose-copy mt-3">{project.targetAudience}</p></article>}{project.results && <article><p className="eyebrow">Outcome</p><p className="prose-copy mt-3">{project.results}</p></article>}</div><aside className="h-fit rounded-[1.5rem] border border-line bg-[#FDF4F2] p-6 sm:p-8"><h2 className="font-display text-2xl">Project links</h2><div className="mt-5 grid gap-3">{project.videoWatchUrl && <a className="button-secondary justify-between" href={project.videoWatchUrl} target="_blank" rel="noreferrer">Watch on YouTube <ExternalLink size={16} /></a>}{project.sourceUrl && <a className="button-secondary justify-between" href={project.sourceUrl} target="_blank" rel="noreferrer">Read project coverage <LinkIcon size={16} /></a>}{project.documentUrl && <a className="button-secondary justify-between" href={project.documentUrl} target="_blank" rel="noreferrer">Open document <ExternalLink size={16} /></a>}</div>{project.tools?.length > 0 && <div className="mt-8"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Tools</p><div className="mt-3 flex flex-wrap gap-2">{project.tools.map((tool) => <span key={tool} className="pill bg-white">{tool}</span>)}</div></div>}</aside></div></section>
      <section className="page-shell pb-20"><div className="flex flex-col gap-4 rounded-[1.6rem] border border-line bg-white p-7 sm:flex-row sm:items-center sm:justify-between"><div><p className="eyebrow">Next step</p><h2 className="mt-2 font-display text-3xl">Have a related story to tell?</h2></div><Link className="button-primary" to="/contact">Let’s collaborate <ArrowUpRight size={16} /></Link></div></section>
    </PageLayout>
  )
}
