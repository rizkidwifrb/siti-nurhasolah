export function LoadingState({ label = 'Loading stories…' }) {
  return <div className="soft-card flex min-h-48 items-center justify-center p-8 text-sm text-muted" role="status">{label}</div>
}
