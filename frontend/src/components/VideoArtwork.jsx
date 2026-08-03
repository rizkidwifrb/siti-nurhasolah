import { Clapperboard, Play } from 'lucide-react'

export function VideoArtwork({ compact = false }) {
  return (
    <div className={`relative isolate overflow-hidden bg-[#332A2E] ${compact ? 'min-h-40' : 'min-h-64'} `}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_12%,rgba(245,184,200,0.35),transparent_28%),radial-gradient(circle_at_20%_84%,rgba(207,196,255,0.24),transparent_32%)]" />
      <div className="absolute -right-8 top-8 h-24 w-24 rounded-full border border-white/20" />
      <div className="absolute bottom-7 left-7 flex items-center gap-3 text-white"><span className="grid size-11 place-items-center rounded-full bg-white/15 backdrop-blur"><Play size={18} fill="currentColor" /></span><div><p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/70">Short film</p><p className="mt-1 font-display text-xl">A story with purpose</p></div></div>
      <Clapperboard className="absolute right-7 top-7 text-white/60" size={compact ? 32 : 44} strokeWidth={1.2} />
    </div>
  )
}
