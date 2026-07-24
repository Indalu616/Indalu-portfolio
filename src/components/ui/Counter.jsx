import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useCounter } from '../../hooks/useCounter'

/** Animated count-up number that starts once scrolled into view. Pass `decimals` for fractional targets (e.g. a GPA). */
export default function Counter({ value, suffix = '', duration = 1600, decimals = 0, className }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })
  const [hasStarted, setHasStarted] = useState(false)
  const count = useCounter(value, { duration, start: hasStarted, decimals })
  const started = useRef(false)

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true
      setHasStarted(true)
    }
  }, [inView])

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}
