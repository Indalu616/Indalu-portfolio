import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react'
import Badge from '../ui/Badge'
import { resolveImage } from '../../utils/resolveAsset'

/**
 * Full-screen certificate viewer. Keyboard: ←/→ to browse, Esc to close.
 * `items` is the certificate list, `index` the open one (null = closed).
 */
export default function CertificateLightbox({ items, index, onClose, onNavigate }) {
  const open = index !== null && index !== undefined
  const closeRef = useRef(null)
  const item = open ? items[index] : null

  const go = useCallback(
    (dir) => {
      if (!open) return
      onNavigate((index + dir + items.length) % items.length)
    },
    [open, index, items.length, onNavigate],
  )

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose, go])

  const src = item ? resolveImage(item.image) : null

  return createPortal(
    <AnimatePresence>
      {open && item && (
        <motion.div
          key="cert-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title} certificate`}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="hud-corners relative grid max-h-[92vh] w-full max-w-6xl grid-cols-1 overflow-hidden border border-white/10 bg-surface shadow-[0_40px_140px_-40px_var(--color-accent)] lg:grid-cols-[1fr_320px]"
          >
            {/* Image stage */}
            <div className="relative flex min-h-[40vh] items-center justify-center bg-[radial-gradient(ellipse_at_center,#1a1a1a,#070707)] p-4 sm:p-8">
              <div className="hud-grid absolute inset-0 opacity-40" aria-hidden="true" />
              <AnimatePresence mode="wait">
                <motion.img
                  key={item.id}
                  src={src}
                  alt={`${item.title}, ${item.issuer}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="relative max-h-[52vh] w-auto max-w-full object-contain shadow-[0_20px_60px_rgba(0,0,0,0.7)] lg:max-h-[80vh]"
                />
              </AnimatePresence>

              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous certificate"
                className="chamfer-sm absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/70 text-fg transition-colors hover:border-accent hover:text-accent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next certificate"
                className="chamfer-sm absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/70 text-fg transition-colors hover:border-accent hover:text-accent"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Details */}
            <div className="relative flex flex-col overflow-y-auto border-t border-white/10 p-6 lg:border-l lg:border-t-0 lg:p-8">
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close certificate viewer"
                className="chamfer-sm absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center border border-white/15 text-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X className="h-4 w-4" />
              </button>

              <span className="hud-label text-white/40">
                {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge variant="accent">{item.type}</Badge>
                {item.date && <Badge variant="outline">{item.date}</Badge>}
              </div>
              <h3 className="mt-4 pr-6 font-display text-2xl font-bold uppercase leading-tight tracking-wide text-fg">{item.title}</h3>
              {item.subtitle && <p className="mt-2 text-sm text-accent/90">{item.subtitle}</p>}
              <p className="mt-4 flex items-center gap-2 text-sm text-fg/85">
                <span className="h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden="true" />
                {item.issuer}
              </p>
              {item.description && <p className="mt-5 text-sm leading-relaxed text-muted">{item.description}</p>}

              <div className="mt-auto pt-8">
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent transition-colors hover:text-accent-2"
                >
                  Open full size <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <p className="mt-4 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-white/35 lg:block">
                  ← → to browse · Esc to close
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
