import { Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { EmptyState } from '../components/EmptyState'
import { ErrorState } from '../components/ErrorState'
import { LoadingState } from '../components/LoadingState'
import { PageLayout } from '../components/PageLayout'
import { ProjectCard } from '../components/ProjectCard'
import { SEO } from '../components/SEO'
import { usePortfolio } from '../features/PortfolioContext'

export function Projects() {
  const { projects, status, refresh } = usePortfolio()
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategory = searchParams.get('category') || 'all'
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const categories = useMemo(() => ['all', ...Array.from(new Set(projects.flatMap((project) => project.categories?.length ? project.categories : [project.category]).filter(Boolean)))], [projects])
  const filteredProjects = useMemo(() => projects.filter((project) => {
    const categoryMatch = selectedCategory === 'all' || project.categories?.includes(selectedCategory) || project.category === selectedCategory
    const normalized = `${project.title} ${project.shortDescription} ${project.category}`.toLowerCase()
    return categoryMatch && normalized.includes(query.toLowerCase().trim())
  }), [projects, selectedCategory, query])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const next = new URLSearchParams(searchParams)
      if (query.trim()) next.set('q', query.trim())
      else next.delete('q')
      setSearchParams(next, { replace: true })
    }, 250)
    return () => window.clearTimeout(timer)
  }, [query, searchParams, setSearchParams])

  const selectCategory = (category) => {
    const next = new URLSearchParams(searchParams)
    if (category === 'all') next.delete('category')
    else next.set('category', category)
    setSearchParams(next)
  }

  return (
    <PageLayout>
      <SEO title="Projects" path="/projects" description="Writing, short-film, and creative content projects by Siti Nurhasolah." />
      <section className="page-shell py-16 sm:py-24"><p className="eyebrow">Portfolio</p><h1 className="display-title mt-5 max-w-4xl">Stories, ideas, and creative work.</h1><p className="prose-copy mt-5 max-w-2xl">A collection of published projects currently verified in Siti’s portfolio materials.</p>
        <div className="mt-10 flex flex-col gap-5"><div className="flex flex-wrap gap-2" aria-label="Project category filters"><span className="sr-only">Filter projects</span>{categories.map((category) => <button key={category} type="button" className={`min-h-10 rounded-full border px-4 text-sm transition ${selectedCategory === category ? 'border-burgundy bg-blush/45 text-burgundy' : 'border-line bg-white text-ink hover:border-burgundy'}`} onClick={() => selectCategory(category)}>{category === 'all' ? 'All work' : category}</button>)}</div><div className="relative max-w-md"><label className="sr-only" htmlFor="project-search">Search projects</label><Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" /><input id="project-search" className="field-input pl-10" placeholder="Search projects" value={query} onChange={(event) => setQuery(event.target.value)} /></div></div>
      </section>
      <section className="page-shell pb-20"><div className="mb-6 flex items-center gap-2 text-sm text-muted"><SlidersHorizontal size={16} /> {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} shown</div>{status.loading ? <LoadingState /> : status.error ? <ErrorState onRetry={refresh} /> : filteredProjects.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div> : <EmptyState title="No matching work yet" description="Try another keyword or choose a different category." />}</section>
    </PageLayout>
  )
}
