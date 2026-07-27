import { useEffect, useRef } from 'react'
import { useAccentTheme } from '../../hooks/useAccentTheme'
import { hexToRgba } from '../../utils/color'

const PARTICLE_COUNT = 42

/**
 * Ambient, full-viewport particle field. Purely decorative (aria-hidden,
 * pointer-events-none) and painted behind all page content — it never
 * touches the page background color/gradient, only adds motion on top of it.
 *
 * Reads the live accent color every frame straight from `useAccentTheme()`
 * (kept fresh via a ref so the animation loop never restarts or re-renders),
 * so the dots stay in lockstep with the rest of the accent system.
 */
export default function Particles({ className = '' }) {
  const canvasRef = useRef(null)
  const { accentColor, reducedMotion } = useAccentTheme()
  const colorRef = useRef(accentColor)

  useEffect(() => {
    colorRef.current = accentColor
  }, [accentColor])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let frameId = null
    let particles = []

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const seed = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.6,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        alpha: Math.random() * 0.35 + 0.2,
      }))
    }

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height)
      const color = colorRef.current
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -4) p.x = width + 4
        if (p.x > width + 4) p.x = -4
        if (p.y < -4) p.y = height + 4
        if (p.y > height + 4) p.y = -4

        ctx.beginPath()
        ctx.fillStyle = hexToRgba(color, p.alpha)
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const loop = () => {
      drawFrame()
      frameId = requestAnimationFrame(loop)
    }

    resize()
    seed()

    if (reducedMotion) {
      drawFrame()
    } else {
      frameId = requestAnimationFrame(loop)
    }

    const handleResize = () => {
      resize()
      seed()
      if (reducedMotion) drawFrame()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60 ${className}`}
    />
  )
}
