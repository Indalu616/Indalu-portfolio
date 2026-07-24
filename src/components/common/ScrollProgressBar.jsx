import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin fixed progress bar at the top of the viewport reflecting overall page scroll. */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-accent to-accent-2"
      aria-hidden="true"
    />
  )
}
