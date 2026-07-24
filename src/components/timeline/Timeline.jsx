import { motion } from 'framer-motion'
import { staggerContainer, viewportOnce } from '../../lib/motionVariants'
import { cn } from '../../utils/cn'

/** Vertical timeline shell with a connecting line; children are typically <TimelineItem>. */
export default function Timeline({ children, className }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(0.15)}
      className={cn('relative space-y-10', className)}
    >
      <div className="absolute left-[15px] top-2 bottom-2 hidden w-px bg-gradient-to-b from-accent via-border to-transparent sm:block" aria-hidden="true" />
      {children}
    </motion.div>
  )
}
