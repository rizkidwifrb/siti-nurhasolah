import { Instagram, Mail, MapPin, MessageCircle } from 'lucide-react'
import { ContactForm } from '../components/ContactForm'
import { PageLayout } from '../components/PageLayout'
import { SEO } from '../components/SEO'
import { siteProfile } from '../data/portfolioData'

const contactMethods = [
  { icon: Mail, title: 'Email', detail: siteProfile.email, href: `mailto:${siteProfile.email}` },
  { icon: Instagram, title: 'Instagram', detail: `@${siteProfile.instagram}`, href: siteProfile.instagramHref },
  { icon: MessageCircle, title: 'WhatsApp', detail: siteProfile.whatsapp, href: siteProfile.whatsappHref },
]

export function Contact() {
  return (
    <PageLayout>
      <SEO title="Contact" path="/contact" description="Contact Siti Nurhasolah for copywriting, scriptwriting, creative content, or media collaboration." />
      <section className="page-shell grid gap-10 py-16 sm:py-24 lg:grid-cols-[0.78fr_1.22fr]"><div><p className="eyebrow">Contact</p><h1 className="display-title mt-5">Let’s make room for a good story.</h1><p className="prose-copy mt-6 max-w-md">For copywriting, scripts, creative content, media collaboration, or a thoughtful brief, you can reach Siti here.</p><div className="mt-9 grid gap-3">{contactMethods.map(({ icon: Icon, title, detail, href }) => <a key={title} className="soft-card flex items-center gap-4 p-4 transition hover:-translate-y-0.5 hover:shadow-lift" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}><span className="grid size-10 place-items-center rounded-full bg-blush/45 text-burgundy"><Icon size={18} /></span><span><span className="block text-xs font-semibold uppercase tracking-[0.12em] text-muted">{title}</span><span className="mt-1 block text-sm font-medium text-ink">{detail}</span></span></a>)}</div><div className="mt-7 flex items-center gap-2 text-sm text-muted"><MapPin size={17} className="text-burgundy" /> {siteProfile.location}</div></div><div className="rounded-[2rem] border border-line bg-white p-6 shadow-soft sm:p-9"><p className="eyebrow">Start a conversation</p><h2 className="mt-3 font-display text-3xl leading-tight">Tell me about the idea.</h2><p className="mt-3 text-sm leading-6 text-muted">Share a few details and I’ll have the context needed to respond.</p><div className="mt-8"><ContactForm /></div></div></section>
    </PageLayout>
  )
}
