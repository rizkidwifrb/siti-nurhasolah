import { ArrowLeft, PenLine } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageLayout } from '../components/PageLayout'
import { SEO } from '../components/SEO'

export function NotFound() {
  return <PageLayout><SEO title="Page not found" noIndex /><section className="page-shell grid min-h-[65vh] place-items-center py-16 text-center"><div><span className="mx-auto grid size-16 place-items-center rounded-full bg-blush/55 text-burgundy"><PenLine size={26} /></span><p className="eyebrow mt-8">404</p><h1 className="display-title mt-4 max-w-3xl">This story hasn’t been written yet.</h1><p className="prose-copy mx-auto mt-5 max-w-md">The page you are looking for is not part of this portfolio.</p><Link className="button-primary mt-8" to="/"><ArrowLeft size={16} /> Return home</Link></div></section></PageLayout>
}
