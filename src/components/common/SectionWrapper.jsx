import Container from '../ui/Container'
import { cn } from '../../utils/cn'

/** Standard section landmark: id anchor, vertical rhythm, and centered container. */
export default function SectionWrapper({ id, className, containerClassName, children, ariaLabel }) {
  return (
    <section id={id} aria-label={ariaLabel} className={cn('relative py-24 sm:py-28 lg:py-32', className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
