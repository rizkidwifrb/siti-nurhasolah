import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, LockKeyhole, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { SEO } from '../../components/SEO'
import { portfolioRepository } from '../../services/portfolioRepository'

const loginSchema = z.object({ email: z.string().email('Enter a valid email.'), password: z.string().min(1, 'Enter your password.') })

export function AdminLogin() {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(loginSchema) })
  const submit = async (values) => {
    setError('')
    try {
      await portfolioRepository.login(values)
      navigate(location.state?.from || '/admin', { replace: true })
    } catch {
      setError('Login could not be completed. Please try again.')
    }
  }
  return <div className="grid min-h-screen place-items-center bg-cream p-5"><SEO title="Admin login" noIndex /><section className="w-full max-w-md rounded-[2rem] border border-line bg-white p-7 shadow-lift sm:p-10"><Link className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:text-ink" to="/"><ArrowLeft size={16} /> Back to portfolio</Link><span className="mt-8 grid size-12 place-items-center rounded-full bg-blush/55 text-burgundy"><LockKeyhole size={21} /></span><p className="eyebrow mt-6">Admin access</p><h1 className="mt-3 font-display text-4xl">Welcome back.</h1><p className="mt-3 text-sm leading-6 text-muted">Sign in to manage portfolio content.</p><form className="mt-8 space-y-5" onSubmit={handleSubmit(submit)} noValidate><div><label className="field-label" htmlFor="admin-email">Email</label><input id="admin-email" className="field-input" type="email" autoComplete="email" {...register('email')} />{errors.email && <p className="mt-2 text-xs text-[#B35454]">{errors.email.message}</p>}</div><div><label className="field-label" htmlFor="admin-password">Password</label><input id="admin-password" className="field-input" type="password" autoComplete="current-password" {...register('password')} />{errors.password && <p className="mt-2 text-xs text-[#B35454]">{errors.password.message}</p>}</div>{error && <p role="alert" className="rounded-xl bg-[#FDE9E8] px-3 py-2 text-sm text-[#9F4C4C]">{error}</p>}<button type="submit" className="button-primary w-full" disabled={isSubmitting}>{isSubmitting && <LoaderCircle className="animate-spin" size={16} />}{isSubmitting ? 'Signing in…' : 'Sign in'}</button></form><p className="mt-6 rounded-xl bg-lavender/25 p-3 text-xs leading-5 text-[#51496E]">When the Laravel API is offline, this screen opens a clearly marked local preview for UI testing. It is not a production authentication substitute.</p></section></div>
}
