import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import { hoverLift } from '../../lib/motionVariants'

/**
 * Base card surface — rounded corners, soft shadow, subtle border.
 * Pass `hover` to enable the lift-on-hover interaction used across cards/grids.
 */
export default function Card({ children, className, hover = false, as: Tag = motion.div, ...props }) {
  return (
    <Tag
      initial={hover ? 'rest' : undefined}
      whileHover={hover ? 'hover' : undefined}
      variants={hover ? hoverLift : undefined}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-sm backdrop-blur-sm transition-colors duration-300',
        hover && 'hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
