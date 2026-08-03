import { Link } from 'react-router-dom'

export function BrandMark({ compact = false }) {
  return (
    <Link to="/" aria-label="Siti Nurhasolah home" className="font-display text-2xl font-semibold tracking-[-0.08em] text-burgundy transition hover:text-ink">
      {compact ? 'SN.' : 'SN.'}
    </Link>
  )
}
