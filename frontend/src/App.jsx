import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AdminLayout } from './components/AdminLayout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ScrollToTop } from './components/ScrollToTop'
import { PortfolioProvider } from './features/PortfolioContext'

const Home = lazy(() => import('./pages/Home').then((module) => ({ default: module.Home })))
const About = lazy(() => import('./pages/About').then((module) => ({ default: module.About })))
const Projects = lazy(() => import('./pages/Projects').then((module) => ({ default: module.Projects })))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail').then((module) => ({ default: module.ProjectDetail })))
const Contact = lazy(() => import('./pages/Contact').then((module) => ({ default: module.Contact })))
const NotFound = lazy(() => import('./pages/NotFound').then((module) => ({ default: module.NotFound })))
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then((module) => ({ default: module.AdminLogin })))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then((module) => ({ default: module.AdminDashboard })))
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects').then((module) => ({ default: module.AdminProjects })))
const AdminProjectForm = lazy(() => import('./pages/admin/AdminProjectForm').then((module) => ({ default: module.AdminProjectForm })))
const AdminCollectionPage = lazy(() => import('./pages/admin/AdminCollectionPage').then((module) => ({ default: module.AdminCollectionPage })))
const AdminMessages = lazy(() => import('./pages/admin/AdminMessages').then((module) => ({ default: module.AdminMessages })))

function RouteLoader({ children }) {
  return <Suspense fallback={<div className="grid min-h-40 place-items-center bg-cream text-sm text-muted">Loading…</div>}>{children}</Suspense>
}

export function App() {
  return (
    <PortfolioProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<RouteLoader><Home /></RouteLoader>} />
        <Route path="/about" element={<RouteLoader><About /></RouteLoader>} />
        <Route path="/projects" element={<RouteLoader><Projects /></RouteLoader>} />
        <Route path="/projects/:slug" element={<RouteLoader><ProjectDetail /></RouteLoader>} />
        <Route path="/contact" element={<RouteLoader><Contact /></RouteLoader>} />
        <Route path="/admin/login" element={<RouteLoader><AdminLogin /></RouteLoader>} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<RouteLoader><AdminDashboard /></RouteLoader>} />
          <Route path="projects" element={<RouteLoader><AdminProjects /></RouteLoader>} />
          <Route path="projects/create" element={<RouteLoader><AdminProjectForm /></RouteLoader>} />
          <Route path="projects/:id/edit" element={<RouteLoader><AdminProjectForm /></RouteLoader>} />
          <Route path="experiences" element={<RouteLoader><AdminCollectionPage type="experiences" /></RouteLoader>} />
          <Route path="certificates" element={<RouteLoader><AdminCollectionPage type="certificates" /></RouteLoader>} />
          <Route path="messages" element={<RouteLoader><AdminMessages /></RouteLoader>} />
        </Route>
        <Route path="*" element={<RouteLoader><NotFound /></RouteLoader>} />
      </Routes>
    </PortfolioProvider>
  )
}
