import { mkdir, writeFile } from 'node:fs/promises'

const siteUrl = (process.env.VITE_SITE_URL || 'http://localhost:5173').replace(/\/$/, '')
const routes = ['/', '/about', '/projects', '/contact']
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`).join('\n')}\n</urlset>\n`

await mkdir(new URL('../public/', import.meta.url), { recursive: true })
await writeFile(new URL('../public/sitemap.xml', import.meta.url), xml)
