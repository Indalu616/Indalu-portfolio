import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/motionVariants'
import { cn } from '../../utils/cn'

export default function TimelineItem({ children, className, current = false }) {
  return (
    <motion.div variants={fadeUp} className={cn('relative sm:pl-12', className)}>
      <span
        className={cn(
          'absolute left-0 top-2 hidden h-[31px] w-[31px] items-center justify-center rounded-full border-2 bg-bg sm:flex',
          current ? 'border-accent' : 'border-border',
        )}
        aria-hidden="true"
      >
        <span className={cn('h-2.5 w-2.5 rounded-full', current ? 'bg-accent' : 'bg-muted')} />
      </span>
      {children}
    </motion.div>
  )
}
