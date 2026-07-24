import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import { useMagnetic } from '../../hooks/useMagnetic'

const VARIANTS = {
  primary:
    'bg-fg text-bg hover:shadow-[0_8px_30px_-8px_var(--color-accent)] border border-transparent',
  outline: 'border border-border text-fg hover:border-accent/60 hover:text-accent bg-transparent',
  ghost: 'text-fg hover:bg-surface border border-transparent',
  accent: 'bg-accent text-white hover:brightness-110 border border-transparent',
}

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

/**
 * Reusable button/link. Renders an <a> when `href` is provided, otherwise a <button>.
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
  const magneticProps = magnetic
    ? { ref, onMouseMove, onMouseLeave, target: href?.startsWith('http') ? '_blank' : undefined, rel: href?.startsWith('http') ? 'noopener noreferrer' : undefined }
    : {}

  return (
    <Tag
      href={href}
      whileTap={{ scale: 0.96 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...magneticProps}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="h-4 w-4" aria-hidden="true" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="h-4 w-4" aria-hidden="true" />}
    </Tag>
  )
}
