import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../../lib/motionVariants'
import { cn } from '../../utils/cn'

/**
 * HUD section header: mono index label, uppercase display heading with an
 * optional accent-colored `highlight` word, and a short description.
 */
export default function SectionTitle({ eyebrow, index, title, highlight, description, align = 'left', className }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}
    >
      {eyebrow && (
        <span className={cn('hud-label mb-5 flex items-center gap-3 text-accent', align === 'center' && 'justify-center')}>
          {index && <span className="text-white/40">{index}</span>}
          {eyebrow}
          <span className="h-px w-12 bg-gradient-to-r from-accent to-transparent" aria-hidden="true" />
        </span>
      )}
      <h2 className="text-balance text-3xl font-bold uppercase leading-[1.05] tracking-wide text-fg sm:text-4xl lg:text-5xl">
        {title}
        {highlight && (
          <>
            {' '}
            <span className="text-accent text-glow">{highlight}</span>
          </>
        )}
      </h2>
      {description && (
        <p className="mt-5 text-balance text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      )}
    </motion.div>
  )
}
