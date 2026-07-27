import { useEffect, useRef } from 'react'
import { useAccentTheme } from '../../hooks/useAccentTheme'
import { useMediaQuery } from '../../hooks/useMediaQuery'

/**
 * A soft radial glow that follows the pointer, tinted with the live accent
 * color via `var(--color-accent)` — no per-frame React state needed, the
 * color itself is driven by AccentThemeProvider.
 *
 * Skipped on touch/coarse-pointer devices (no persistent cursor), and its
 * follow-lag collapses to an instant snap under prefers-reduced-motion.
 */
export default function CursorGlow() {
  const glowRef = useRef(null)
  const { reducedMotion } = useAccentTheme()
  const hasFinePointer = useMediaQuery('(pointer: fine)')

  useEffect(() => {
    if (!hasFinePointer) return undefined
    const el = glowRef.current
    if (!el) return undefined

    let rafId = null
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY
    let visible = false

    const show = () => {
      if (visible) return
      visible = true
      el.style.opacity = '1'
    }

    const hide = () => {
      visible = false
      el.style.opacity = '0'
    }

    const handleMove = (e) => {
      targetX = e.clientX
      targetY = e.clientY
      show()
    }

    const tick = () => {
      const ease = reducedMotion ? 1 : 0.14
      currentX += (targetX - currentX) * ease
      currentY += (targetY - currentY) * ease
      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', hide)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', hide)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [hasFinePointer, reducedMotion])

  if (!hasFinePointer) return null

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="accent-glow pointer-events-none fixed left-0 top-0 z-0 h-[420px] w-[420px] rounded-full opacity-0 blur-[90px] transition-opacity duration-500 ease-out"
      style={{ background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)' }}
    />
  )
}
