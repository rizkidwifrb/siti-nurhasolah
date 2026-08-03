export function ErrorState({ onRetry }) {
  return <div className="soft-card border-[#E9B0B0] p-8 text-center"><h2 className="font-display text-2xl">Something needs a second try</h2><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">The portfolio data could not be loaded right now.</p>{onRetry && <button type="button" className="button-secondary mt-5" onClick={onRetry}>Try again</button>}</div>
}
