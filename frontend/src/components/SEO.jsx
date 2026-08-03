import { useEffect } from 'react'

const siteUrl = import.meta.env.VITE_SITE_URL || 'http://localhost:5173'

export function SEO({ title, description, path = '/', noIndex = false, structuredData }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Siti Nurhasolah` : 'Siti Nurhasolah | Creative Storyteller'
    document.title = fullTitle
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description || 'Portfolio of Siti Nurhasolah, Copywriter, Scriptwriter, and Creative Storyteller.')

    const canonical = document.querySelector('link[rel="canonical"]') || document.head.appendChild(document.createElement('link'))
    canonical.setAttribute('rel', 'canonical')
    canonical.setAttribute('href', `${siteUrl}${path}`)

    let robots = document.querySelector('meta[name="robots"]')
    if (noIndex) {
      if (!robots) {
        robots = document.createElement('meta')
        robots.setAttribute('name', 'robots')
        document.head.appendChild(robots)
      }
      robots.setAttribute('content', 'noindex, nofollow')
    } else if (robots) robots.remove()

    let jsonLd = document.querySelector('#page-structured-data')
    if (structuredData) {
      if (!jsonLd) {
        jsonLd = document.createElement('script')
        jsonLd.id = 'page-structured-data'
        jsonLd.type = 'application/ld+json'
        document.head.appendChild(jsonLd)
      }
      jsonLd.textContent = JSON.stringify(structuredData)
    } else if (jsonLd) jsonLd.remove()
  }, [title, description, path, noIndex, structuredData])

  return null
}
