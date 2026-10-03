import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import { hoverLift } from '../../lib/motionVariants'

/**
 * Base HUD panel — near-black surface, hairline border, accent corner brackets.
 * Pass `hover` to enable the lift + accent-border interaction used across grids.
 */
export default function Card({ children, className, hover = false, as: Tag = motion.div, ...props }) {
  return (
    <Tag
      initial={hover ? 'rest' : undefined}
      whileHover={hover ? 'hover' : undefined}
      variants={hover ? hoverLift : undefined}
      className={cn(
        'hud-corners relative border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-white/[0.01] backdrop-blur-sm transition-colors duration-300',
        hover && 'hover:border-accent/35 hover:shadow-[0_20px_60px_-30px_var(--color-accent)]',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
