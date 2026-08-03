import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BrandMark } from './BrandMark'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()
  const reduceMotion = useReducedMotion()

  const close = () => setIsOpen(false)
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/90 backdrop-blur-md">
      <div className="page-shell flex min-h-16 items-center justify-between gap-5">
        <BrandMark />
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={({ isActive }) => `border-b pb-1 text-xs font-medium transition ${isActive ? 'border-burgundy text-burgundy' : 'border-transparent text-ink hover:border-[#D5BCC3]'}`}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <Link to="/contact" className="button-primary hidden min-h-9 px-4 py-2 text-xs md:inline-flex">Let’s Work Together</Link>
        <button type="button" className="grid size-11 place-items-center rounded-full border border-line bg-white md:hidden" onClick={() => setIsOpen((value) => !value)} aria-controls="mobile-navigation" aria-expanded={isOpen} aria-label={isOpen ? 'Close menu' : 'Open menu'}>
          {isOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-line bg-cream px-5 py-5 md:hidden" initial={reduceMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={reduceMotion ? undefined : { opacity: 0, height: 0 }} transition={{ duration: 0.25 }}>
            <div className="mx-auto flex max-w-[1320px] flex-col gap-1">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={close} className={({ isActive }) => `rounded-xl px-4 py-3 text-base font-medium ${isActive ? 'bg-blush/45 text-burgundy' : 'text-ink hover:bg-white'}`}>
                  {link.label}
                </NavLink>
              ))}
              <Link to="/contact" onClick={close} className="button-primary mt-3">Let’s Work Together</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      {pathname.startsWith('/admin') ? null : <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-3">Skip to content</a>}
    </header>
  )
}
