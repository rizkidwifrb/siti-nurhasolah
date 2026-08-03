import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { cloneElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(120),
  email: z.string().trim().email('Please enter a valid email address.').max(180),
  company: z.string().trim().max(180).optional(),
  projectType: z.string().trim().min(1, 'Please choose a project type.').max(80),
  message: z.string().trim().min(20, 'Please share a little more about your project.').max(3000),
  website: z.string().max(0).optional(),
})

export function ContactForm() {
  const [notice, setNotice] = useState(null)
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      projectType: '',
      message: '',
      website: '',
    },
  })

  const onSubmit = (values) => {
    const body = [
      'Hello Hasolah,',
      '',
      'I would like to discuss a potential project.',
      '',
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Company or organization: ${values.company || '-'}`,
      `Project type: ${values.projectType}`,
      '',
      'Message:',
      values.message,
    ].join('\n')

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=sitinurhasholah%40gmail.com&su=${encodeURIComponent(`Portfolio inquiry - ${values.projectType}`)}&body=${encodeURIComponent(body)}`

    window.open(gmailUrl, '_blank', 'noopener,noreferrer')
    setNotice({
      tone: 'success',
      text: 'Gmail sudah dibuka dengan pesan yang terisi. Periksa lalu tekan Send.',
    })
    reset()
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex="-1" autoComplete="off" {...register('website')} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" error={errors.name?.message}>
          <input className="field-input" autoComplete="name" {...register('name')} />
        </FormField>

        <FormField label="Email" error={errors.email?.message}>
          <input className="field-input" type="email" autoComplete="email" {...register('email')} />
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Company or organization" error={errors.company?.message}>
          <input className="field-input" autoComplete="organization" {...register('company')} />
        </FormField>

        <FormField label="Project type" error={errors.projectType?.message}>
          <select className="field-input" {...register('projectType')}>
            <option value="">Select one</option>
            <option>Copywriting</option>
            <option>Scriptwriting</option>
            <option>Creative Content</option>
            <option>Media Collaboration</option>
            <option>Other</option>
          </select>
        </FormField>
      </div>

      <FormField label="Tell me about the project" error={errors.message?.message}>
        <textarea className="field-input min-h-36 resize-y" {...register('message')} />
      </FormField>

      {notice && (
        <p role="status" className="rounded-2xl bg-sage/45 px-4 py-3 text-sm leading-6 text-[#35533C]">
          {notice.text}
        </p>
      )}

      <button type="submit" className="button-primary w-full sm:w-auto">
        <Send size={16} /> Send with Gmail
      </button>
    </form>
  )
}

function FormField({ label, error, children }) {
  const id = children.props.id || label.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return (
    <div>
      <label className="field-label" htmlFor={id}>{label}</label>
      {cloneElement(children, { id, 'aria-invalid': Boolean(error) })}
      {error && <p className="mt-2 text-xs font-medium text-[#B35454]">{error}</p>}
    </div>
  )
}