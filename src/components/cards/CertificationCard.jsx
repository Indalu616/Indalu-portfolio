import { memo } from 'react'
import { Eye } from 'lucide-react'
import Badge from '../ui/Badge'
import { resolveImage } from '../../utils/resolveAsset'
import { cn } from '../../utils/cn'

/**
 * Certificate tile used in the certificates marquee: framed preview of the
 * certificate image, plus type, date, title and issuer. The whole tile is a
 * button that opens the lightbox via `onOpen`.
 */
function CertificationCard({ certification, index, total, onOpen, inert = false, className }) {
  const { title, subtitle, issuer, type, date, image, featured } = certification
  const src = resolveImage(image)

  return (
    <button
      type="button"
      onClick={() => onOpen?.(certification)}
      tabIndex={inert ? -1 : undefined}
      aria-label={inert ? undefined : `View certificate: ${title}, ${issuer}`}
      className={cn(
        'hud-corners group relative flex w-[300px] shrink-0 flex-col border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_24px_70px_-30px_var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-[360px]',
        className,
      )}
    >
      {/* Preview */}
      <div className="relative m-3 mb-0 aspect-[4/3] overflow-hidden border border-white/[0.06] bg-[radial-gradient(ellipse_at_center,#1b1b1b,#0a0a0a)]">
        <div className="hud-grid absolute inset-0 opacity-50" aria-hidden="true" />
        {src && (
          <img
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            draggable="false"
            className="absolute inset-0 m-auto h-[86%] w-[86%] object-contain shadow-[0_10px_40px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        )}
        {/* hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/45 group-hover:opacity-100 group-focus-visible:bg-black/45 group-focus-visible:opacity-100">
          <span className="chamfer-sm flex items-center gap-2 border border-accent bg-black/70 px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
            <Eye className="h-4 w-4" aria-hidden="true" /> View
          </span>
        </div>
        {/* scan line on hover */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
          <div className="h-1/3 w-full animate-scan bg-gradient-to-b from-transparent via-accent/15 to-transparent" />
        </div>
        <span className="absolute left-2 top-2 font-mono text-[10px] tracking-widest text-white/50">
          {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </span>
        {featured && (
          <Badge variant="accent" className="absolute right-2 top-2 bg-black/70">
            Featured
          </Badge>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{type}</span>
          {date && <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{date}</span>}
        </div>
        <h3 className="mt-2.5 font-display text-lg font-semibold uppercase leading-tight tracking-wide text-fg transition-colors group-hover:text-accent">
          {title}
        </h3>
        {subtitle && <p className="mt-1 line-clamp-1 text-xs text-muted">{subtitle}</p>}
        <p className="mt-auto flex items-center gap-2 pt-4 text-sm text-fg/80">
          <span className="h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden="true" />
          {issuer}
        </p>
      </div>
    </button>
  )
}

export default memo(CertificationCard)
