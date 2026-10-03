import { cn } from '../../utils/cn'

/** Small technical label used for technology/skill names inside cards. */
export default function Tag({ children, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:border-accent/50 hover:text-accent',
        className,
      )}
    >
      {children}
    </span>
  )
}
