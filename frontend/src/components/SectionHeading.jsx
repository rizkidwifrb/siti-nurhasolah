export function SectionHeading({ eyebrow, title, description, centered = false, action }) {
  return (
    <div className={`flex flex-col gap-3 ${centered ? 'mx-auto max-w-2xl items-center text-center' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <div className={centered ? 'contents' : 'flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'}>
        <h2 className="section-title">{title}</h2>
        {action}
      </div>
      {description && <p className="prose-copy max-w-2xl">{description}</p>}
    </div>
  )
}
