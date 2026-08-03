export function EmptyState({ title = 'Nothing here yet', description = 'New work will appear here when it is ready to share.' }) {
  return <div className="soft-card border-dashed p-10 text-center"><h2 className="font-display text-2xl">{title}</h2><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">{description}</p></div>
}
