import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { VideoArtwork } from './VideoArtwork'

export function ProjectCard({ project, featured = false }) {
  return (
    <article className={`group overflow-hidden rounded-[1.35rem] border border-line bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift ${featured ? 'lg:col-span-2' : ''}`}>
      <Link to={`/projects/${project.slug}`} className="block focus-visible:ring-inset">
        {project.thumbnailPath || project.coverImage ? <img src={project.thumbnailPath || project.coverImage} alt="" className={`w-full object-cover transition duration-500 group-hover:scale-[1.03] ${featured ? 'h-72' : 'h-52'}`} loading="lazy" /> : <VideoArtwork compact={!featured} />}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3"><span className="pill">{project.category}</span>{project.year && <span className="text-xs font-medium text-muted">{project.year}</span>}</div>
          <h3 className="mt-4 font-display text-2xl leading-tight tracking-[-0.02em] text-ink">{project.title}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{project.shortDescription}</p>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-burgundy">View project <ArrowUpRight size={16} /></span>
        </div>
      </Link>
    </article>
  )
}
