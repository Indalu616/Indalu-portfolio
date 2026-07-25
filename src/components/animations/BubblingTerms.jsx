import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

const LANES = [
  { offset: -4, drift: 6 },
  { offset: 14, drift: 12 },
  { offset: -20, drift: -10 },
  { offset: 4, drift: -6 },
]

/**
 * A column of glassy word-bubbles that rise continuously from the bottom,
 * like champagne bubbles — used to surface a themed word list (e.g. data
 * structure terms) beside a portrait. Purely decorative; aria-hidden.
 * Lane/timing math is memo-free but index-derived (not Math.random), so it
 * stays stable across parent re-renders without needing useMemo.
 */
export default function BubblingTerms({ terms = [], className, side = 'right' }) {
  if (!terms.length) return null

  const cycle = 9.5

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.7 }}
      className={cn(
        'pointer-events-none absolute top-0 bottom-0 z-20 w-32 select-none overflow-visible',
        side === 'right' ? 'right-2 sm:right-4' : 'left-2 sm:left-4',
        className,
      )}
      aria-hidden="true"
    >
      {terms.map((term, i) => {
        const lane = LANES[i % LANES.length]
        const duration = cycle + (i % 4) * 1.6
        const delay = (i * (cycle / terms.length)).toFixed(2)

        return (
          <span
            key={term + i}
            className="animate-bubble-up absolute bottom-0 left-1/2 whitespace-nowrap rounded-full border border-accent/25 bg-surface/75 px-3 py-1 font-mono text-[11px] font-medium tracking-tight text-accent shadow-[0_6px_24px_-8px_var(--color-accent)] backdrop-blur-md"
            style={{
              marginLeft: lane.offset,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              '--bubble-drift': `${lane.drift}px`,
            }}
          >
            {term}
          </span>
        )
      })}
    </motion.div>
  )
}
