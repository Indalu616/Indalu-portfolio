import { motion } from 'framer-motion'

/** Decorative ambient blobs used behind hero/section headers. Purely visual, aria-hidden. */
export default function FloatingShapes({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden="true">
      <motion.div
        className="accent-glow absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-[100px]"
        animate={{ y: [0, 24, 0], x: [0, 16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="accent-glow absolute right-[-10%] top-1/3 h-80 w-80 rounded-full bg-accent-2/20 blur-[110px]"
        animate={{ y: [0, -30, 0], x: [0, -18, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="accent-glow absolute bottom-[-10%] left-1/3 h-64 w-64 rounded-full bg-accent/10 blur-[100px]"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
