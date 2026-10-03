import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import { useMagnetic } from '../../hooks/useMagnetic'

const VARIANTS = {
  primary:
    'bg-accent text-black hover:bg-accent-2 hover:shadow-[0_0_32px_-6px_var(--color-accent)] border border-accent',
  outline:
    'border border-white/20 text-fg bg-white/[0.02] hover:border-accent hover:text-accent hover:bg-accent/5',
  ghost: 'text-fg hover:text-accent border border-transparent',
  accent: 'border border-accent/60 text-accent bg-accent/5 hover:bg-accent hover:text-black',
}

const SIZES = {
  sm: 'px-4 py-2 text-[11px]',
  md: 'px-6 py-3 text-xs',
  lg: 'px-8 py-4 text-sm',
}

/**
 * Reusable HUD-style button/link (chamfered corners, uppercase display type).
 * Renders an <a> when `href` is provided, otherwise a <button>.
 * Set `magnetic` for a subtle cursor-pull hover effect used on primary CTAs.
 */
export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  magnetic = false,
  icon: Icon,
  iconPosition = 'right',
  className,
  ...props
}) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.25)
  const Tag = href ? motion.a : motion.button
  const magneticProps = magnetic ? { ref, onMouseMove, onMouseLeave } : {}
  const externalProps = href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <Tag
      href={href}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'chamfer inline-flex items-center justify-center gap-2 font-display font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-60',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...externalProps}
      {...magneticProps}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="h-4 w-4" aria-hidden="true" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="h-4 w-4" aria-hidden="true" />}
    </Tag>
  )
}
