import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useCodeTyping } from '../../hooks/useCodeTyping'
import { highlightJava, scrollToId } from '../../utils'
import popupData from '../../data/welcomePopup.json'

/**
 * Compact, first-visit-only popup: a tiny alien-hacker terminal card that
 * "types" a joke Java snippet with the owner's contact info. Gated by
 * localStorage so it only ever appears once per browser.
 */
export default function WelcomePopup() {
  const [seen, setSeen] = useLocalStorage(popupData.storageKey, false)
  const [open, setOpen] = useState(false)
  const closeButtonRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (!popupData.enabled || seen) return undefined
    const t = setTimeout(() => {
      setOpen(true)
      setSeen(true)
    }, popupData.appearDelayMs)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  const { completedLines, currentLine, isDone } = useCodeTyping(popupData.codeLines, {
    active: open,
    charSpeed: 14,
    lineSpeed: 60,
    startDelay: 450,
  })

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [completedLines.length, currentLine])

  const handleCta = () => {
    setOpen(false)
    const action = popupData.cta?.action || ''
    const [kind, target] = action.split(':')
    if (kind === 'scroll' && target) setTimeout(() => scrollToId(target), 380)
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Welcome transmission"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-[#03040a]/80 backdrop-blur-md"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full max-w-[400px] overflow-hidden rounded-2xl p-[1.5px]"
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Rotating RGB glow border */}
            <motion.div
              className="absolute inset-[-80%] opacity-90"
              style={{
                background:
                  'conic-gradient(from 0deg, #22d3ee, #a855f7, #f472b6, #facc15, #34d399, #22d3ee)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            />

            <div className="relative rounded-[15px] bg-[#05060c] text-slate-100 shadow-2xl">
              {/* Title bar */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-3.5 py-2.5">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 truncate font-mono text-[10px] text-slate-400">
                    {popupData.terminal.fileName}
                  </span>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-cyan-400/50 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="px-4 pt-3.5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-cyan-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
                    {popupData.badge}
                  </span>
                  <span className="font-mono text-[9px] text-amber-300">☕ {popupData.statusLabel}</span>
                </div>
              </div>

              {/* Code panel */}
              <div
                ref={scrollRef}
                className="mx-4 mt-3 max-h-[240px] overflow-y-auto rounded-lg border border-white/10 bg-black/70 px-3.5 py-3 font-mono text-[11px] leading-relaxed sm:text-[12px]"
                aria-live="polite"
              >
                {completedLines.map((line, i) => (
                  <div key={i} className="whitespace-pre">
                    {line === ''
                      ? ' '
                      : highlightJava(line).map((tok, j) => (
                          <span key={j} className={tok.className}>
                            {tok.text}
                          </span>
                        ))}
                  </div>
                ))}
                <div className="whitespace-pre">
                  {highlightJava(currentLine).map((tok, j) => (
                    <span key={j} className={tok.className}>
                      {tok.text}
                    </span>
                  ))}
                  {!isDone && (
                    <motion.span
                      className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-0.5 bg-emerald-300"
                      animate={{ opacity: [1, 1, 0, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                    />
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between gap-3 p-4">
                <p className="truncate font-mono text-[10px] italic text-slate-500">{popupData.footerNote}</p>
                <motion.button
                  type="button"
                  onClick={handleCta}
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.04 }}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 px-4 py-2 text-xs font-semibold text-black shadow-[0_0_20px_-6px_rgba(217,70,239,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {popupData.cta?.label}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
