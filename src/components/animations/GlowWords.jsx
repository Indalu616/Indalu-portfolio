import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

/**
 * Ambient centerpiece for the hero: a slow-pulsing radial glow sitting dead
 * center behind the page, like a heartbeat of light. Sits behind foreground
 * content (-z-10) so it never competes with the headline; purely decorative
 * and aria-hidden.
 */
export default function GlowWords({ className }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden',
        className,
      )}
      aria-hidden="true"
    >
      <motion.div
        className="absolute h-[380px] w-[380px] rounded-full bg-accent/25 blur-[100px] sm:h-[540px] sm:w-[540px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute h-56 w-56 rounded-full bg-accent-2/20 blur-[80px] sm:h-72 sm:w-72"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />
    </div>
  )
}
