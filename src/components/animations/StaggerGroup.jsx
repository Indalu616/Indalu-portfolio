import { motion } from 'framer-motion'
import { staggerContainer, viewportOnce } from '../../lib/motionVariants'

/** Wraps a list/grid of children and staggers their entrance via child `fadeUp`/`scaleIn` variants. */
export default function StaggerGroup({ children, className, stagger = 0.1, delay = 0 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(stagger, delay)}
      className={className}
    >
      {children}
    </motion.div>
  )
}
