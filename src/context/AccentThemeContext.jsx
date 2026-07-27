import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { AccentContext } from './accent-context'
import { ACCENT_COLORS, ACCENT_CYCLE_INTERVAL_MS, ACCENT_TRANSITION_DURATION_MS } from '../constants/accentColors'
import { lerpColor, easeInOutCubic } from '../utils/color'

const PULSE_CLASS = 'accent-pulse'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

const wrapIndex = (i) => ((i % ACCENT_COLORS.length) + ACCENT_COLORS.length) % ACCENT_COLORS.length
const nextOf = (i) => wrapIndex(i + 1)

function applyAccentVars(primary, secondary) {
  const root = document.documentElement
  root.style.setProperty('--color-accent', primary)
  root.style.setProperty('--color-accent-2', secondary)
}

/**
 * Drives the site-wide dynamic accent color system.
 *
 * Every ACCENT_CYCLE_INTERVAL_MS it advances to the next color in
 * ACCENT_COLORS, animating `--color-accent` / `--color-accent-2` on <html>
 * frame-by-frame (requestAnimationFrame, eased) rather than leaning on a
 * single CSS transition — that way every consumer animates in lockstep with
 * zero flicker, including things a plain CSS transition can't smoothly tween
 * (gradients, box-shadows, <canvas> particles).
 *
 * Because the two CSS variables are the single source of truth, most
 * consumers (Tailwind's `accent` / `accent-2` utilities — buttons, borders,
 * icons, glows, gradients) update automatically with no React re-render at
 * all. Components that need the live value in JS (e.g. <canvas> particles)
 * should read it via `useAccentTheme()`.
 */
export function AccentThemeProvider({ children }) {
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches,
  )
  const [accentIndex, setAccentIndexState] = useState(0)
  const [accentColor, setAccentColor] = useState(ACCENT_COLORS[0])
  const [isTransitioning, setIsTransitioning] = useState(false)

  const indexRef = useRef(0)
  const rafRef = useRef(null)
  const pulseTimeoutRef = useRef(null)

  // Track prefers-reduced-motion live in case the user flips it mid-session.
  useEffect(() => {
    const mql = window.matchMedia(REDUCED_MOTION_QUERY)
    const onChange = (e) => setReducedMotion(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  // Paint the starting colors synchronously, before the browser's first
  // paint, so there's no flash-of-default-then-jump-to-accent on load.
  useLayoutEffect(() => {
    applyAccentVars(ACCENT_COLORS[0], ACCENT_COLORS[nextOf(0)])
  }, [])

  const animateTo = (toIndex) => {
    const computed = getComputedStyle(document.documentElement)
    const fromPrimary = computed.getPropertyValue('--color-accent').trim() || ACCENT_COLORS[0]
    const fromSecondary = computed.getPropertyValue('--color-accent-2').trim() || ACCENT_COLORS[nextOf(0)]
    const toPrimary = ACCENT_COLORS[toIndex]
    const toSecondary = ACCENT_COLORS[nextOf(toIndex)]

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    clearTimeout(pulseTimeoutRef.current)

    if (reducedMotion) {
      applyAccentVars(toPrimary, toSecondary)
      setAccentColor(toPrimary)
      return
    }

    let start = null
    setIsTransitioning(true)
    document.documentElement.classList.add(PULSE_CLASS)

    const step = (timestamp) => {
      if (start === null) start = timestamp
      const t = Math.min((timestamp - start) / ACCENT_TRANSITION_DURATION_MS, 1)
      const eased = easeInOutCubic(t)
      const primary = lerpColor(fromPrimary, toPrimary, eased)
      const secondary = lerpColor(fromSecondary, toSecondary, eased)
      applyAccentVars(primary, secondary)
      setAccentColor(primary)

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step)
        return
      }
      rafRef.current = null
      pulseTimeoutRef.current = setTimeout(() => {
        document.documentElement.classList.remove(PULSE_CLASS)
        setIsTransitioning(false)
      }, 250)
    }

    rafRef.current = requestAnimationFrame(step)
  }

  const goToIndex = (index) => {
    const safe = wrapIndex(index)
    indexRef.current = safe
    setAccentIndexState(safe)
    animateTo(safe)
  }

  // Auto-cycle every ACCENT_CYCLE_INTERVAL_MS. Disabled entirely under
  // prefers-reduced-motion — the accent stays fixed on the starting color.
  useEffect(() => {
    if (reducedMotion) return undefined
    const id = setInterval(() => {
      goToIndex(indexRef.current + 1)
    }, ACCENT_CYCLE_INTERVAL_MS)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      clearTimeout(pulseTimeoutRef.current)
      document.documentElement.classList.remove(PULSE_CLASS)
    },
    [],
  )

  const value = useMemo(
    () => ({
      accentColors: ACCENT_COLORS,
      accentIndex,
      accentColor,
      isTransitioning,
      reducedMotion,
      setAccentIndex: goToIndex,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accentIndex, accentColor, isTransitioning, reducedMotion],
  )

  return <AccentContext.Provider value={value}>{children}</AccentContext.Provider>
}
