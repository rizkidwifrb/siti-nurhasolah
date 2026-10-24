# Siti Nurhasolah Portfolio

A full-stack personal portfolio for **Siti Nurhasolah**, a Copywriter, Scriptwriter, and Creative Storyteller based in Bogor, Indonesia.

The public experience is an editorial React application inspired by the supplied Stitch screens. The API and CMS are designed as a Laravel 11 application with Sanctum authentication and MySQL persistence.

## What is included

- Responsive public routes: home, about, projects, project detail, contact, and custom 404.
- Shared React components, local font packages, Tailwind design tokens, Framer Motion transitions, accessibility affordances, and SEO metadata.
- Searchable/category-filtered project collection with URL query state.
- Verified public project: **Panggung Sekolah Bukan Tempat Luka**, linked to the provided KKN "AfterOne" 2025 YouTube short film and related coverage.
- Contact form with client-side Zod validation, honeypot field, loading and result states.
- Ten certificate entries with locally bundled WebP images, duplicate-aware reuse, and previews that preserve the full document.
- Secure Laravel-source API design: validation, rate limits, sanitization, safe file validation, CORS configuration, database migrations, seeders, resources, and Sanctum-backed admin access.
- Admin routes for dashboard, projects, experiences, certificates, and contact messages.
- Browser-local preview fallback when the API is offline. It is marked inside the admin UI and must not be used as a production auth layer.

## Source material and content policy

- Stitch `screen.png` files informed the layout, palette, typography scale, card rhythm, and editorial character.
- The supplied Canva file provided identity data, verified contact information, the education entry, skills, experience names, certificates, and the portrait used locally in the app.
- No fictional Stitch project, metric, testimonial, client, award, or outcome is published.
- See [asset notes](docs/asset-notes.md) for local asset usage and the Instagram retrieval limitation.

## Architecture

```text
.
├── frontend/              React + Vite + Tailwind + Framer Motion
│   ├── src/components/    Shared UI, navigation, state views, SEO
│   ├── src/pages/         Public and admin route views
│   ├── src/services/      Axios API client and offline-preview repository
│   └── src/data/          Verified fallback portfolio data
├── backend/               Laravel REST API source
│   ├── app/               Models, controllers, requests, resources, services
│   ├── database/          Migrations, factory, verified seed data
│   └── routes/api.php     Public and protected API routes
├── docs/                  API and asset notes
└── docker-compose.yml     MySQL 8.4 local service
```

## Requirements

- Node.js 20 or newer.
- PHP 8.2 or newer.
- Composer 2.
- MySQL 8.0 or newer, or Docker Compose.

## Docker database setup

```bash
docker compose up -d
```

This exposes MySQL at `127.0.0.1:3307`. Change the development password before using a shared machine or any remote environment.

## Backend setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve
```

Set `FRONTEND_URL`, `SANCTUM_STATEFUL_DOMAINS`, database values, and optional mail settings in `backend/.env`. To create the first local admin, set `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` before `php artisan migrate --seed`. Do not commit `.env`.

## Frontend setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Set `VITE_API_BASE_URL=http://localhost:8000/api` and set `VITE_SITE_URL` to the eventual production URL before the production build. The `prebuild` step regenerates `public/sitemap.xml` from `VITE_SITE_URL`.

## Tests and quality checks

```bash
# frontend
cd frontend
npm run lint
npm run test
npm run build

# backend
cd ../backend
composer test
composer lint
```

The frontend test suite covers the home project route and contact-form validation. The Laravel feature suite covers health, public project visibility, contact validation/persistence, and admin authorization.

## API notes

See [docs/api.md](docs/api.md). Public project content is transformed through Laravel API Resources. Admin data is protected by `auth:sanctum` and an `is_admin` middleware check.

## Deployment notes

- The frontend includes `_redirects` and `vercel.json` SPA fallbacks so direct React routes resolve correctly on common static hosts.
- Deploy the Laravel API behind HTTPS, set `APP_DEBUG=false`, configure a unique `APP_KEY`, and restrict `FRONTEND_URL` to the production frontend origin.
- Run `php artisan storage:link` on the production API host and serve `/storage` from the public directory.
- Configure a real mailer only through environment variables. Contact records save to the database even if notification mail is not configured or delivery fails.

## Known limitations in this workspace

The provided workspace did not contain PHP, Composer, Docker, or the GitHub CLI. As a result, the Laravel source is present and documented but its dependencies, migrations, and PHPUnit suite could not be executed here. The React app was installed, linted, unit-tested, and built successfully in this workspace.

The uploaded portfolio PDFs were not made available to the workspace, so their contents are not used. Add the missing PDF or additional original Siti photos later to expand the verified project gallery.
