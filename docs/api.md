# API summary

Public endpoints:

- `GET /api/health`
- `GET /api/projects`
- `GET /api/projects/featured`
- `GET /api/projects/{slug}`
- `GET /api/project-categories`
- `GET /api/experiences`
- `GET /api/certificates`
- `POST /api/contact`

Admin endpoints use the `/api/admin` prefix and require a Sanctum-authenticated user whose `is_admin` flag is true. The routes include login, logout, current user, dashboard metrics, project CRUD, experience CRUD, certificate CRUD, and contact-message management.

Every public collection response uses Laravel API Resources and paginated collections include Laravel pagination metadata. The frontend accepts the camelCase resource fields and falls back to local preview data only when the API cannot be reached.
