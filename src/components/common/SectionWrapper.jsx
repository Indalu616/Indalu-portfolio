import Container from '../ui/Container'
import { cn } from '../../utils/cn'

/** Standard section landmark: id anchor, vertical rhythm, centered container, faint top rule. */
export default function SectionWrapper({ id, className, containerClassName, children, ariaLabel }) {
  return (
    <section id={id} aria-label={ariaLabel} className={cn('relative scroll-mt-24 py-24 sm:py-28 lg:py-32', className)}>
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
