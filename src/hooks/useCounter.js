import { useEffect, useRef, useState } from 'react'

/**
 * Animates a number from 0 to `target` once `start` becomes true.
 * Pass `decimals` (e.g. 2) to animate fractional values like a GPA.
 */
export function useCounter(target = 0, { duration = 1600, start = false, decimals = 0 } = {}) {
  const [value, setValue] = useState(0)
  const frame = useRef(null)
  const startTime = useRef(null)
  const factor = 10 ** decimals

  useEffect(() => {
    if (!start) return undefined

    const step = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp
      const progress = Math.min((timestamp - startTime.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target * factor) / factor)
      if (progress < 1) {
        frame.current = requestAnimationFrame(step)
      } else {
        setValue(target)
      }
    }

    frame.current = requestAnimationFrame(step)
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
      startTime.current = null
    }
  }, [start, target, duration, factor])

  return value
}
