import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../../lib/motionVariants'

/** Generic scroll-reveal wrapper — fades/slides children into view once. Pass a custom `variants` to override. */
export default function Reveal({ children, variants = fadeUp, delay = 0, className, as: Tag = motion.div }) {
  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </Tag>
  )
}
