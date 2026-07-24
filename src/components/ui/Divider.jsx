import { cn } from '../../utils/cn'

export default function Divider({ className, vertical = false }) {
  if (vertical) {
    return <span className={cn('h-full w-px bg-border', className)} aria-hidden="true" />
  }
  return <hr className={cn('border-t border-border', className)} />
}
