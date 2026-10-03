import { useEffect, useRef, useState } from 'react'
import { cn } from '../../utils/cn'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Renders a background-removed portrait as an animated halftone dot matrix
 * (the cinematic "pixel scan" look). The source image is sampled once into a
 * grid; each frame we redraw the dots with:
 *   - a soft vertical scan beam that brightens/enlarges dots as it passes,
 *   - a pointer "lens" that swells dots near the cursor,
 *   - an accent-tinted glow toward the bottom of the figure.
 * Drawing pauses when off-screen and collapses to a single static frame under
 * prefers-reduced-motion.
 */
export default function HalftonePortrait({ src, alt, cell = 6, className, fallback }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas || !src) return undefined

    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia(REDUCED_MOTION_QUERY).matches
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#ff8a00'
    const accentRgb = hexToRgb(accent)

    let dots = []
    let width = 0
    let height = 0
    let dpr = 1
    let rafId = null
    let visible = true
    let start = performance.now()
    const pointer = { x: -9999, y: -9999, active: false }
    const img = new Image()
    img.decoding = 'async'

    const build = () => {
      const rect = wrap.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Fit the image inside the box (contain), anchored to the bottom like a bust.
      const scale = Math.min(width / img.naturalWidth, height / img.naturalHeight)
      const drawW = img.naturalWidth * scale
      const drawH = img.naturalHeight * scale
      const offX = (width - drawW) / 2
      const offY = height - drawH

      const step = width < 420 ? cell - 1 : cell
      const cols = Math.ceil(drawW / step)
      const rows = Math.ceil(drawH / step)
      const sampler = document.createElement('canvas')
      sampler.width = cols
      sampler.height = rows
      const sctx = sampler.getContext('2d', { willReadFrequently: true })
      sctx.drawImage(img, 0, 0, cols, rows)
      const { data } = sctx.getImageData(0, 0, cols, rows)

      // Auto-levels across opaque pixels so darker photos still read clearly.
      let lo = 255
      let hi = 0
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] < 128) continue
        const l = luminance(data[i], data[i + 1], data[i + 2])
        if (l < lo) lo = l
        if (l > hi) hi = l
      }
      const range = Math.max(1, hi - lo)

      dots = []
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const i = (y * cols + x) * 4
          const a = data[i + 3] / 255
          if (a < 0.08) continue
          const l = (luminance(data[i], data[i + 1], data[i + 2]) - lo) / range
          // Soften the hard crop edges (left shoulder + bottom) so the bust melts into the frame.
          const edge = smoothstep(0, 0.16, x / cols) * smoothstep(0, 0.14, 1 - y / rows)
          const v = a * edge * (0.3 + 0.7 * Math.pow(l, 0.6))
          if (v < 0.04) continue
          const px = offX + x * step + step / 2
          const py = offY + y * step + step / 2
          const depth = py / height // 0 top → 1 bottom
          dots.push({ x: px, y: py, v, depth, seed: Math.random() })
        }
      }
      start = performance.now()
      drawFrame(start)
    }

    const drawFrame = (now) => {
      ctx.clearRect(0, 0, width, height)
      const t = (now - start) / 1000
      const intro = reduced ? 1 : Math.min(1, t / 1.6)
      const scanY = reduced ? -9999 : ((t * 0.18) % 1.3) * height - 0.15 * height
      const step = width < 420 ? cell - 1 : cell
      const maxR = step * 0.5

      for (let k = 0; k < dots.length; k += 1) {
        const d = dots[k]
        if (d.seed > intro * 1.05) continue

        let boost = 0
        const dy = d.y - scanY
        boost += Math.exp(-(dy * dy) / 1800) * 0.55
        if (pointer.active) {
          const dx = d.x - pointer.x
          const dyp = d.y - pointer.y
          boost += Math.exp(-(dx * dx + dyp * dyp) / 5200) * 0.7
        }

        const v = Math.min(1, d.v * (1 + boost) + boost * 0.15)
        const size = Math.max(0.6, v * maxR * 2 * 0.92)

        // Mostly cool white, warming to the accent toward the bottom and in the beam.
        const warm = Math.min(1, Math.max(0, (d.depth - 0.62) * 2.2) + boost * 0.8)
        const r = Math.round(235 + (accentRgb.r - 235) * warm)
        const g = Math.round(235 + (accentRgb.g - 235) * warm)
        const b = Math.round(235 + (accentRgb.b - 235) * warm)
        ctx.fillStyle = `rgba(${r},${g},${b},${0.3 + v * 0.7})`
        ctx.fillRect(d.x - size / 2, d.y - size / 2, size, size)
      }
    }

    const loop = (now) => {
      if (visible) drawFrame(now)
      rafId = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
      if (reduced) drawFrame(performance.now())
    }
    const onLeave = () => {
      pointer.active = false
      if (reduced) drawFrame(performance.now())
    }

    const ro = new ResizeObserver(() => {
      if (img.complete && img.naturalWidth) build()
    })
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })

    img.onload = () => {
      build()
      ro.observe(wrap)
      io.observe(wrap)
      if (!reduced) rafId = requestAnimationFrame(loop)
    }
    img.onerror = () => setFailed(true)
    img.src = src

    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      ro.disconnect()
      io.disconnect()
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
      img.onload = null
      img.onerror = null
    }
  }, [src, cell])

  return (
    <div ref={wrapRef} className={cn('relative h-full w-full', className)}>
      {failed || !src ? (
        fallback
      ) : (
        <canvas ref={canvasRef} role="img" aria-label={alt} className="absolute inset-0 block" />
      )}
    </div>
  )
}

function smoothstep(e0, e1, x) {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function hexToRgb(hex) {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}
