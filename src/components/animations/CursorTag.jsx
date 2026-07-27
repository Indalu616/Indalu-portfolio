import { useEffect, useRef, useState } from 'react'
import { useAccentTheme } from '../../hooks/useAccentTheme'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const IDLE_DELAY_MS = 650
const FOLLOW_EASE = 0.16
const OFFSET_X = 22
const OFFSET_Y = 22

/**
 * A small pill that follows the pointer and flashes a label near it on
 * every mouse move, fading out once the cursor goes idle — a quick "flash,"
 * not a persistent cursor replacement.
 *
 * Accepts a `labels` array (e.g. ["Hire Me", phone, email]) and cycles to
 * the next one each time a new flash starts (i.e. whenever the cursor
 * resumes moving after a pause), so repeated movement rotates through all
 * of them instead of only ever showing the first.
 *
 * Purely decorative (aria-hidden, pointer-events-none), skipped on
 * touch/coarse-pointer devices, and its follow-lag collapses to an instant
 * snap under prefers-reduced-motion. Tinted with the live accent color via
 * `text-accent` / `border-accent`, so it stays in sync with the rest of the
 * dynamic accent system automatically.
 */
export default function CursorTag({ labels = [] }) {
  const { reducedMotion } = useAccentTheme()
  const hasFinePointer = useMediaQuery('(pointer: fine)')
  const elRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [labelIndex, setLabelIndex] = useState(0)

  const items = labels.filter(Boolean)
  const hasLabels = items.length > 0

  useEffect(() => {
    if (!hasFinePointer || !hasLabels) return undefined
    const el = elRef.current
    if (!el) return undefined

    let rafId = null
    let idleTimer = null
    let wasIdle = true
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY

    const hide = () => {
      wasIdle = true
      setVisible(false)
    }

    const handleMove = (e) => {
      targetX = e.clientX
      targetY = e.clientY

      if (wasIdle) {
        // A fresh flash is starting — advance to the next label in rotation.
        wasIdle = false
        setLabelIndex((i) => (i + 1) % items.length)
        setVisible(true)
      }

      clearTimeout(idleTimer)
      idleTimer = setTimeout(hide, IDLE_DELAY_MS)
    }

    const tick = () => {
      const ease = reducedMotion ? 1 : FOLLOW_EASE
      currentX += (targetX - currentX) * ease
      currentY += (targetY - currentY) * ease
      el.style.transform = `translate3d(${currentX + OFFSET_X}px, ${currentY + OFFSET_Y}px, 0)`
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', hide)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', hide)
      clearTimeout(idleTimer)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [hasFinePointer, hasLabels, reducedMotion, items.length])

  if (!hasFinePointer || !hasLabels) return null

  return (
    <div
      ref={elRef}
      aria-hidden="true"
      className={`accent-glow pointer-events-none fixed left-0 top-0 z-[70] whitespace-nowrap rounded-full border border-accent/40 bg-bg/90 px-4 py-1.5 text-xs font-semibold text-accent shadow-lg backdrop-blur transition-[opacity,transform] duration-300 ease-out ${
        visible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
      }`}
    >
      {items[labelIndex]}
    </div>
  )
}
