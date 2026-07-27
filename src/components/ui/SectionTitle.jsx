import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../../lib/motionVariants'
import { cn } from '../../utils/cn'

/** Consistent eyebrow + heading + description pattern used at the top of every section. */
export default function SectionTitle({ eyebrow, title, description, align = 'left', className }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}
    >
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-accent sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-balance text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      )}
    </motion.div>
  )
}
