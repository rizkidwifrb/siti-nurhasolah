import { ArrowUpRight, BookOpen, Heart, Lightbulb, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageLayout } from '../components/PageLayout'
import { SEO } from '../components/SEO'
import { ScrollReveal } from '../components/ScrollReveal'
import { SectionHeading } from '../components/SectionHeading'
import { activityPhotos, certificateMedia, coreValues, expertise, siteProfile } from '../data/portfolioData'
import { usePortfolio } from '../features/PortfolioContext'

const certificateVisual = (certificate) => {
  const media = certificateMedia[certificate.title]
  return {
    image: media?.image || certificate.image || certificate.imagePath,
    alt: media?.alt || certificate.imageAlt || `Certificate: ${certificate.title}`,
  }
}

export function About() {
  const { experiences, certificates } = usePortfolio()

  return (
    <PageLayout>
      <SEO title="About" path="/about" description="Learn about Siti Nurhasolah, a Copywriter, Scriptwriter, and Creative Storyteller from Bogor." />

      <section className="page-shell grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-28">
        <ScrollReveal>
          <p className="eyebrow">About Siti</p>
          <h1 className="display-title mt-5 max-w-2xl">The person behind the words.</h1>
          <p className="prose-copy mt-7 max-w-xl">{siteProfile.longIntroduction}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            <span className="pill">Siti Nurhasolah</span>
            <span className="pill bg-blush/30">Creative Storyteller</span>
            <span className="pill bg-lavender/35">Bogor, Indonesia</span>
            <span className="pill bg-sage/40">Available for work</span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.12} className="relative mx-auto w-full max-w-[440px]">
          <div className="absolute -right-3 -top-3 h-[92%] w-[86%] rounded-[26%_74%_52%_48%/44%_45%_55%_56%] bg-peach/40" />
          <div className="relative h-[390px] overflow-hidden rounded-[26%_74%_52%_48%/44%_45%_55%_56%] bg-white shadow-lift">
            <img className="h-full w-full object-contain object-bottom" src={siteProfile.secondaryPortrait} alt="Siti Nurhasolah" />
          </div>
        </ScrollReveal>
      </section>

      <section className="page-shell section-space pt-6">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <ScrollReveal>
            <article className="soft-card relative overflow-hidden p-7 sm:p-9">
              <span aria-hidden="true" className="absolute -right-8 -top-8 size-36 rounded-full border-[28px] border-blush/25" />
              <h2 className="section-title">My story</h2>
              <div className="prose-copy mt-5 max-w-2xl space-y-4">
                <p>I come from a communication and media background, with a particular interest in how words, images, and narrative work together.</p>
                <p>My academic path in Communication and Islamic Broadcasting has strengthened my interest in journalism, creative production, scriptwriting, and content development.</p>
                <p>I value work that is clear, collaborative, and considerate of its audience.</p>
              </div>
            </article>
          </ScrollReveal>
          <div>
            <h2 className="section-title">Core values</h2>
            <div className="mt-5 grid gap-3">
              {coreValues.map((value, index) => (
                <ScrollReveal key={value.title} delay={index * 0.06}>
                  <article className="soft-card flex gap-4 p-5">
                    <span className={`grid size-10 shrink-0 place-items-center rounded-full ${['bg-blush/55', 'bg-peach/55', 'bg-lavender/55'][index]}`}>
                      {index === 0 ? <Lightbulb size={17} /> : index === 1 ? <Heart size={17} /> : <Wrench size={17} />}
                    </span>
                    <div>
                      <h3 className="font-medium text-ink">{value.title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-muted">{value.description}</p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell section-space pt-2">
        <SectionHeading eyebrow="In action" title="Learning, speaking, and reporting." description="A few activity photographs from Hasolah’s documentation." centered />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {activityPhotos.map((activity, index) => (
            <ScrollReveal key={activity.id} delay={index * 0.06}>
              <article className="h-full overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
                <div className="h-48 bg-[#F7F1EE]">
                  <img
                    src={activity.image}
                    alt={activity.alt}
                    className={`h-full w-full ${
                      activity.id === 'portrait'
                        ? 'object-cover object-top'
                        : activity.id === 'reporting'
                          ? 'object-cover object-center'
                          : 'object-cover'
                    }`}
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-2xl">{activity.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{activity.description}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="page-shell section-space">
        <SectionHeading eyebrow="The journey" title="Education and experience" centered />
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-3 border-b border-line pb-4"><BookOpen size={19} className="text-burgundy" /><h2 className="font-display text-2xl">Education</h2></div>
            <div className="relative mt-6 border-l-2 border-blush pl-6">
              <span className="absolute -left-[7px] top-1 size-3 rounded-full border-2 border-burgundy bg-cream" />
              <p className="text-xs font-semibold text-muted">{siteProfile.education.period}</p>
              <h3 className="mt-2 font-display text-xl">{siteProfile.education.degree}</h3>
              <p className="mt-1 text-sm text-muted">{siteProfile.education.institution}</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 border-b border-line pb-4"><Wrench size={19} className="text-burgundy" /><h2 className="font-display text-2xl">Experience</h2></div>
            <div className="mt-6 space-y-4">
              {experiences.map((experience) => (
                <article key={experience.id} className="relative border-l-2 border-peach pl-6">
                  <span className="absolute -left-[7px] top-1 size-3 rounded-full border-2 border-burgundy bg-cream" />
                  <h3 className="font-display text-xl">{experience.organization}</h3>
                  <p className="mt-1 text-sm font-medium text-muted">{experience.position}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{experience.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell section-space pt-4">
        <div className="grid gap-6 lg:grid-cols-[0.65fr_1.35fr]">
          <article className="rounded-[1.5rem] bg-[#F9E9EA] p-7">
            <p className="eyebrow">Toolbox</p>
            <h2 className="mt-3 font-display text-3xl">Creative foundation</h2>
            <div className="mt-6 flex flex-wrap gap-2">{expertise.map((item) => <span key={item.title} className="pill bg-white/80">{item.title}</span>)}</div>
          </article>
          <article className="soft-card p-7">
            <p className="eyebrow">Certificates & training</p>
            <h2 className="mt-3 font-display text-3xl">Continuing to learn</h2>
            {certificates.length ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {certificates.map((certificate) => {
                  const visual = certificateVisual(certificate)
                  return (
                    <article key={certificate.id} className="overflow-hidden rounded-2xl border border-line bg-cream">
                      {visual.image && <img src={visual.image} alt={visual.alt} className="aspect-[4/3] w-full border-b border-line object-cover" loading="lazy" />}
                      <div className="p-4">
                        <p className="text-sm font-semibold text-ink">{certificate.title}</p>
                        {certificate.issuer && <p className="mt-2 text-xs leading-5 text-muted">{certificate.issuer}</p>}
                        {certificate.issueDate && <p className="mt-2 text-xs font-medium text-burgundy">{certificate.issueDate}</p>}
                      </div>
                    </article>
                  )
                })}
              </div>
            ) : <p className="prose-copy mt-4">Certificate details will appear here as they are confirmed.</p>}
          </article>
        </div>
      </section>

      <section className="page-shell pb-20">
        <div className="flex flex-col justify-between gap-5 rounded-[1.8rem] border border-line bg-white p-7 sm:flex-row sm:items-center sm:p-10">
          <div><p className="eyebrow">Let’s connect</p><h2 className="mt-3 font-display text-3xl">Have a project in mind?</h2></div>
          <Link to="/contact" className="button-primary shrink-0">Get in touch <ArrowUpRight size={16} /></Link>
        </div>
      </section>
    </PageLayout>
  )
}
