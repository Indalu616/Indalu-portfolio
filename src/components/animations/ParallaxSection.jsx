import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/** Wraps children in a subtle vertical parallax tied to scroll progress through the element. */
export default function ParallaxSection({ children, className, strength = 60 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  )
}
