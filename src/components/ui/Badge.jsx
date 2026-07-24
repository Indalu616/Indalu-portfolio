import { cn } from '../../utils/cn'

const VARIANTS = {
  default: 'bg-surface text-fg border-border',
  accent: 'bg-accent/10 text-accent border-accent/20',
  success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  outline: 'bg-transparent text-muted border-border',
}

export default function Badge({ children, variant = 'default', className, icon: Icon }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
        VARIANTS[variant],
        className,
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      {children}
    </span>
  )
}
