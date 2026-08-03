import { AlertTriangle, X } from 'lucide-react'

export function ConfirmDialog({ open, title = 'Are you sure?', description, confirmLabel = 'Delete', onCancel, onConfirm }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/35 p-5" role="presentation">
      <section role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title" className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lift">
        <div className="flex items-start justify-between gap-4"><div className="grid size-10 place-items-center rounded-full bg-[#FDE9E8] text-[#B25B5A]"><AlertTriangle size={19} /></div><button type="button" onClick={onCancel} className="rounded-full p-2 text-muted hover:bg-cream" aria-label="Close dialog"><X size={18} /></button></div>
        <h2 id="confirm-dialog-title" className="mt-5 font-display text-2xl">{title}</h2>
        {description && <p className="mt-3 text-sm leading-6 text-muted">{description}</p>}
        <div className="mt-7 flex justify-end gap-3"><button type="button" className="button-secondary" onClick={onCancel}>Cancel</button><button type="button" className="button-primary bg-[#9F4C4C] hover:bg-[#833C3C]" onClick={onConfirm}>{confirmLabel}</button></div>
      </section>
    </div>
  )
}
