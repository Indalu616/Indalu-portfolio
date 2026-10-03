import { cn } from '../../utils/cn'

const VARIANTS = {
  default: 'bg-white/5 text-fg border-white/10',
  accent: 'bg-accent/10 text-accent border-accent/40',
  success: 'bg-success/10 text-success border-success/30',
  outline: 'bg-transparent text-muted border-white/15',
}

export default function Badge({ children, variant = 'default', className, icon: Icon }) {
  return (
    <span
      className={cn(
        'chamfer-sm inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em]',
        VARIANTS[variant],
        className,
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      {children}
    </span>
  )
}
