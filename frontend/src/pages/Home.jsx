import { ArrowDownRight, ArrowUpRight, CheckCircle2, MapPin, MessageCircle, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { ScrollReveal } from '../components/ScrollReveal'
import { SectionHeading } from '../components/SectionHeading'
import { LoadingState } from '../components/LoadingState'
import { ProjectCard } from '../components/ProjectCard'
import { PageLayout } from '../components/PageLayout'
import { siteProfile, expertise, processSteps } from '../data/portfolioData'
import { usePortfolio } from '../features/PortfolioContext'

export function Home() {
  const { projects, experiences, status } = usePortfolio()
  const featuredProjects = projects.filter((project) => project.isFeatured).slice(0, 3)
  const visibleExperiences = experiences.slice(0, 2)

  return (
    <PageLayout>
      <SEO
        description="Portfolio of Siti Nurhasolah, Copywriter, Scriptwriter, and Creative Storyteller based in Bogor, Indonesia."
        structuredData={{ '@context': 'https://schema.org', '@type': 'Person', name: siteProfile.name, jobTitle: siteProfile.title, email: siteProfile.email, url: import.meta.env.VITE_SITE_URL || 'http://localhost:5173', sameAs: [siteProfile.instagramHref] }}
      />
      <section className="relative overflow-hidden">
        <div className="page-shell relative grid min-h-[630px] items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:py-28">
          <span aria-hidden="true" className="decor-star absolute left-2 top-16 size-5 bg-lavender/70 sm:left-10" />
          <span aria-hidden="true" className="absolute left-[37%] top-[19%] size-1.5 rounded-full bg-peach" />
          <ScrollReveal className="relative z-10">
            <p className="eyebrow">Hello, I’m Hasolah</p>
            <h1 className="display-title mt-5 max-w-3xl">Copywriter, Scriptwriter, and <span className="text-burgundy underline decoration-peach decoration-2 underline-offset-[0.18em]">Creative Storyteller.</span></h1>
            <p className="prose-copy mt-7 max-w-xl">{siteProfile.introduction} I care about words that make an idea feel closer, clearer, and worth remembering.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link className="button-primary" to="/projects">View My Work <ArrowDownRight size={17} /></Link><Link className="button-secondary" to="/contact">Let’s Collaborate <ArrowUpRight size={16} /></Link></div>
            <div className="mt-7 flex flex-wrap gap-2"><span className="pill"><MapPin size={12} className="mr-1.5" /> Bogor</span><span className="pill"><span className="mr-1.5 size-1.5 rounded-full bg-[#44A85B]" /> Open for work</span><span className="pill bg-lavender/35">Creative media</span></div>
          </ScrollReveal>
          <ScrollReveal delay={0.12} className="relative mx-auto w-full max-w-[490px] lg:mx-0">
            <div className="absolute -right-3 top-8 h-[76%] w-[83%] rounded-organic bg-blush/50" />
            <div className="relative h-[410px] overflow-hidden rounded-[52%_48%_43%_57%/42%_45%_55%_58%] border-[10px] border-white bg-[#E7E0E1] shadow-lift sm:h-[480px]">
              <img src={siteProfile.portrait} alt="Hasolah seated in front of a whiteboard" className="h-full w-full object-cover object-center" fetchPriority="high" />
            </div>
            <div className="absolute -bottom-5 -left-3 max-w-[220px] rounded-2xl border border-white/70 bg-white/90 px-4 py-3 text-[0.62rem] font-medium leading-4 text-muted shadow-soft backdrop-blur sm:-left-7">Copywriting · Scriptwriting ·<br />Creative Media Production</div>
            <p className="absolute -right-2 top-2 max-w-28 rotate-[8deg] font-display text-xl leading-6 text-burgundy sm:text-2xl">Let’s tell a good story <span className="inline-block translate-y-1">〰</span></p>
          </ScrollReveal>
        </div>
      </section>

      <section className="page-shell section-space">
        <SectionHeading eyebrow="Portfolio" title="Selected Work" centered description="A considered selection of work currently verified in Siti’s portfolio materials." />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {status.loading ? <div className="lg:col-span-3"><LoadingState /></div> : featuredProjects.map((project, index) => <ProjectCard key={project.id} project={project} featured={index === 0} />)}
        </div>
        <div className="mt-8 text-center"><Link className="button-secondary" to="/projects">View all projects</Link></div>
      </section>

      <section className="border-y border-line bg-white/60">
        <div className="page-shell section-space">
          <SectionHeading eyebrow="What I bring" title="Words, stories, and media with a purpose." description="A flexible creative foundation shaped around storytelling, research, and communication." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item, index) => <ScrollReveal key={item.title} delay={index * 0.04}><article className="soft-card h-full p-6"><span className={`grid size-10 place-items-center rounded-full ${['bg-blush/50', 'bg-peach/55', 'bg-lavender/45', 'bg-sage/55', 'bg-[#EDE1D0]', 'bg-[#E9DDF2]'][index]}`}><Sparkles size={17} className="text-burgundy" /></span><h3 className="mt-5 font-display text-2xl">{item.title}</h3><p className="mt-3 text-sm leading-6 text-muted">{item.description}</p></article></ScrollReveal>)}
          </div>
        </div>
      </section>

      <section className="page-shell section-space">
        <SectionHeading eyebrow="How I work" title="A simple, thoughtful process." description="Every brief needs its own shape. This is the framework I return to when creating a story." centered />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => <ScrollReveal key={step.number} delay={index * 0.06}><li className="relative h-full rounded-[1.3rem] border border-line bg-white p-6 shadow-soft"><span className="font-display text-4xl text-blush">{step.number}</span><h3 className="mt-7 font-display text-2xl">{step.title}</h3><p className="mt-3 text-sm leading-6 text-muted">{step.description}</p></li></ScrollReveal>)}
        </ol>
      </section>

      <section className="page-shell section-space pt-6">
        <div className="grid items-center gap-10 rounded-[2rem] border border-line bg-[#FDF4F2] p-6 sm:p-10 lg:grid-cols-[0.72fr_1fr] lg:p-14">
          <div className="relative mx-auto w-full max-w-[340px]"><div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[38%_62%_55%_45%/58%_45%_55%_42%] bg-lavender/40" /><div className="relative h-80 overflow-hidden rounded-[38%_62%_55%_45%/58%_45%_55%_42%] bg-white"><img src={siteProfile.secondaryPortrait} alt="Siti Nurhasolah" className="h-full w-full object-contain object-bottom" loading="lazy" /></div></div>
          <div><p className="eyebrow">A little about me</p><h2 className="section-title mt-4">The person behind the words.</h2><p className="prose-copy mt-5 max-w-xl">{siteProfile.longIntroduction}</p><p className="prose-copy mt-4 max-w-xl">I’m interested in making creative work that feels human, focused, and easy to understand.</p><Link className="button-secondary mt-7" to="/about">More about Siti <ArrowUpRight size={16} /></Link></div>
        </div>
      </section>

      {visibleExperiences.length > 0 && <section className="page-shell section-space pt-6"><SectionHeading eyebrow="Experience highlights" title="Learning through media and editorial work." /><div className="mt-9 grid gap-4 lg:grid-cols-2">{visibleExperiences.map((experience) => <article key={experience.id} className="soft-card p-6"><CheckCircle2 size={19} className="text-burgundy" /><p className="mt-5 text-sm font-semibold text-muted">{experience.position}</p><h3 className="mt-1 font-display text-2xl">{experience.organization}</h3><p className="mt-3 text-sm leading-6 text-muted">{experience.description}</p></article>)}</div></section>}

      <section className="page-shell pb-20 pt-6 sm:pb-28"><div className="relative overflow-hidden rounded-[2rem] bg-burgundy px-7 py-12 text-white sm:px-12 sm:py-16"><span aria-hidden="true" className="decor-star absolute right-10 top-9 size-7 bg-peach/90" /><div className="relative max-w-2xl"><p className="eyebrow !text-peach">Let’s make something meaningful</p><h2 className="mt-4 font-display text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">Have a story or project to explore?</h2><p className="mt-5 max-w-xl text-sm leading-7 text-white/80 sm:text-base">Tell me what you are working on. I would be glad to hear the brief.</p><Link className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-burgundy transition hover:-translate-y-0.5" to="/contact"><MessageCircle size={16} /> Start a conversation</Link></div></div></section>
    </PageLayout>
  )
}
