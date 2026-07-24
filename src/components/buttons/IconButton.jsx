import { cn } from '../../utils/cn'

/** Circular icon-only button used for theme toggle, mobile menu, etc. */
export default function IconButton({ icon: Icon, label, onClick, href, className, active = false }) {
  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      href={href}
      onClick={onClick}
      aria-label={label}
      type={href ? undefined : 'button'}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        active && 'border-accent/50 text-accent',
        className,
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </Tag>
  )
}
