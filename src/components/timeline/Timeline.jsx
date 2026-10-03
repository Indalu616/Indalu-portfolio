import { motion } from 'framer-motion'
import { staggerContainer, viewportOnce } from '../../lib/motionVariants'
import { cn } from '../../utils/cn'

/** Vertical timeline shell with an accent rail; children are typically <TimelineItem>. */
export default function Timeline({ children, className }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(0.15)}
      className={cn('relative space-y-8', className)}
    >
      <div className="absolute left-[11px] top-3 bottom-3 hidden w-px bg-gradient-to-b from-accent via-white/10 to-transparent sm:block" aria-hidden="true" />
      {children}
    </motion.div>
  )
}
