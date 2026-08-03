import { BookOpenText, BriefcaseBusiness, FileText, LayoutDashboard, LogOut, Mail, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { portfolioRepository } from '../services/portfolioRepository'
import { BrandMark } from './BrandMark'

const links = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/projects', label: 'Projects', icon: BriefcaseBusiness },
  { to: '/admin/experiences', label: 'Experiences', icon: BookOpenText },
  { to: '/admin/certificates', label: 'Certificates', icon: FileText },
  { to: '/admin/messages', label: 'Messages', icon: Mail },
]

export function AdminLayout() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const user = portfolioRepository.currentAdmin()
  const logout = async () => { await portfolioRepository.logout(); navigate('/admin/login') }
  return (
    <div className="min-h-screen bg-[#FBF7F5] text-ink">
      <button className="fixed right-5 top-4 z-50 grid size-11 place-items-center rounded-full border border-line bg-white lg:hidden" type="button" aria-label={open ? 'Close admin menu' : 'Open admin menu'} onClick={() => setOpen((value) => !value)}>{open ? <X size={19} /> : <Menu size={19} />}</button>
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-line bg-white p-6 transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <BrandMark /><p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Portfolio CMS</p>
        <nav className="mt-10 grid gap-2" aria-label="Admin navigation">{links.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)} className={({ isActive }) => `flex min-h-11 items-center gap-3 rounded-xl px-4 text-sm font-medium transition ${isActive ? 'bg-blush/45 text-burgundy' : 'text-muted hover:bg-cream hover:text-ink'}`}><Icon size={17} />{label}</NavLink>)}</nav>
        <div className="mt-auto rounded-2xl bg-cream p-4"><p className="truncate text-sm font-semibold">{user?.name || user?.email}</p><p className="mt-1 text-xs leading-5 text-muted">{user?.localPreview ? 'Local preview mode' : 'Authenticated admin'}</p><button type="button" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:text-ink" onClick={logout}><LogOut size={16} /> Log out</button></div>
      </aside>
      <div className="lg:pl-72"><header className="border-b border-line bg-white px-6 py-5 sm:px-10"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-burgundy">Siti Nurhasolah</p><h1 className="mt-1 font-display text-2xl">Portfolio Admin</h1></header><main className="p-5 sm:p-8 lg:p-10"><Outlet /></main></div>
      {open && <button className="fixed inset-0 z-30 bg-ink/20 lg:hidden" onClick={() => setOpen(false)} aria-label="Close admin menu overlay" />}
    </div>
  )
}
