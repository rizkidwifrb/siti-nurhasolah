import { ArrowUpRight, Instagram, Mail, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { siteProfile } from '../data/portfolioData'
import { BrandMark } from './BrandMark'

export function Footer() {
  return (
    <footer className="mt-10 border-t border-line bg-white py-10 sm:py-12">
      <div className="page-shell grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <BrandMark />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">© {new Date().getFullYear()} Siti Nurhasolah. Crafted with care for stories and creative work.</p>
        </div>
        <div className="grid gap-3 text-sm sm:text-right">
          <a href={`mailto:${siteProfile.email}`} className="inline-flex items-center gap-2 text-ink transition hover:text-burgundy sm:justify-end"><Mail size={15} /> Email</a>
          <a href={siteProfile.instagramHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-ink transition hover:text-burgundy sm:justify-end"><Instagram size={15} /> Instagram</a>
          <a href={siteProfile.whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-ink transition hover:text-burgundy sm:justify-end"><MessageCircle size={15} /> WhatsApp</a>
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-1 text-burgundy transition hover:text-ink sm:justify-end">Back to top <ArrowUpRight size={14} /></Link>
        </div>
      </div>
    </footer>
  )
}
