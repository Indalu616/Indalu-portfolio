import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/motionVariants'
import { cn } from '../../utils/cn'

export default function TimelineItem({ children, className, current = false }) {
  return (
    <motion.div variants={fadeUp} className={cn('relative sm:pl-12', className)}>
      <span className="absolute left-0 top-7 hidden h-[23px] w-[23px] items-center justify-center sm:flex" aria-hidden="true">
        <span className={cn('h-3 w-3 rotate-45 border bg-bg', current ? 'border-accent shadow-[0_0_12px_var(--color-accent)]' : 'border-white/30')}>
          <span className={cn('block h-full w-full scale-50', current ? 'bg-accent' : 'bg-white/30')} />
        </span>
      </span>
      {children}
    </motion.div>
  )
}
