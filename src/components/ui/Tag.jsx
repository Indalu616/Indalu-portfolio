import { cn } from '../../utils/cn'

/** Small pill used for technology/skill labels inside cards. */
export default function Tag({ children, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-border bg-surface/60 px-2.5 py-1 text-xs font-medium text-muted backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-fg',
        className,
      )}
    >
      {children}
    </span>
  )
}
