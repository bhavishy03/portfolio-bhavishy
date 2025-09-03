"use client"

import { useEffect, useRef } from "react"

type Star = {
  x: number
  y: number
  r: number
  baseAlpha: number
  twinkleSpeed: number
  driftX: number
  driftY: number
  phase: number
  color?: string
  depth?: number
}

export default function StarsBackground({
  density = 140,
  connectDistance = 140,
  parallax = 16,
  speed = 0.22,
  className = "",
  respectReducedMotion = true,
  twinkleAmplitude = 0.7,
  twinkleScale = 0.18,
  glow = 12,
  sparkle = true,
  sparkleChance = 0.002,
  speedBoost = 1.0,
  twinkleSpeedMultiplier = 1.2,
}: {
  density?: number
  connectDistance?: number
  parallax?: number
  speed?: number
  className?: string
  respectReducedMotion?: boolean
  twinkleAmplitude?: number
  twinkleScale?: number
  glow?: number
  sparkle?: boolean
  sparkleChance?: number
  speedBoost?: number
  twinkleSpeedMultiplier?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const starsRef = useRef<Star[]>([])
  const rafRef = useRef<number | null>(null)
  const reduceMotionRef = useRef(false)
  const runningRef = useRef(true)
  const mouseRef = useRef({ x: 0, y: 0 })
  const colorsRef = useRef<string[]>([])

  useEffect(() => {
    reduceMotionRef.current =
      respectReducedMotion && (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rootStyle = getComputedStyle(document.documentElement)
    const readVar = (name: string, fallback: string) => rootStyle.getPropertyValue(name)?.trim() || fallback
    const palette = [
      readVar("--primary", "#ffffff"),
      readVar("--chart-1", "#a78bfa"),
      readVar("--chart-2", "#22c55e"),
      readVar("--chart-3", "#60a5fa"),
      readVar("--chart-4", "#f59e0b"),
      readVar("--chart-5", "#ef4444"),
    ].filter(Boolean) as string[]
    colorsRef.current = palette.length ? palette : ["#a78bfa", "#f59e0b", "#22c55e"]

    let width = 0
    let height = 0
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initStars()
    }

    const initStars = () => {
      const area = width * height
      const count = Math.max(60, Math.floor((area / (1200 * 800)) * density))
      const arr: Star[] = []
      const cols = colorsRef.current
      for (let i = 0; i < count; i++) {
        const r = Math.random() * 1.5 + 0.3
        arr.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r,
          baseAlpha: 0.25 + Math.random() * 0.65,
          twinkleSpeed: 0.5 + Math.random() * 1.5,
          driftX: (Math.random() - 0.5) * 0.28 * speed * speedBoost,
          driftY: (Math.random() - 0.5) * 0.28 * speed * speedBoost,
          phase: Math.random() * Math.PI * 2,
          color: cols[Math.floor(Math.random() * cols.length)],
          depth: 0.4 + Math.random() * 0.8,
        })
      }
      starsRef.current = arr
    }

    let lastTime = performance.now()
    const render = (now: number) => {
      if (!runningRef.current) {
        rafRef.current = requestAnimationFrame(render)
        return
      }

      const dt = Math.min(32, now - lastTime)
      lastTime = now

      ctx.clearRect(0, 0, width, height)

      // precompute parallax offset
      const parallaxStrength = reduceMotionRef.current ? parallax * 0.4 : parallax
      const px = mouseRef.current.x * parallaxStrength
      const py = mouseRef.current.y * parallaxStrength

      const stars = starsRef.current

      // Draw stars
      for (const s of stars) {
        const offX = px * (s.depth || 1)
        const offY = py * (s.depth || 1)

        const twinkleBase = (Math.sin(now * 0.001 * s.twinkleSpeed * twinkleSpeedMultiplier + s.phase) + 1) * 0.5 // 0..1
        const amp = reduceMotionRef.current ? twinkleAmplitude * 0.4 : twinkleAmplitude
        const scaleAmp = reduceMotionRef.current ? twinkleScale * 0.4 : twinkleScale
        const alpha = Math.min(1, Math.max(0.05, s.baseAlpha * (1 - amp / 2 + amp * twinkleBase)))
        const radius = s.r * (1 + scaleAmp * twinkleBase)

        // drift
        if (!reduceMotionRef.current) {
          const curve = now * 0.0005 + s.phase
          const swirl = 0.02 * speed * speedBoost
          s.x += s.driftX * dt + Math.cos(curve) * swirl * dt
          s.y += s.driftY * dt + Math.sin(curve) * swirl * dt
        }
        // wrap
        if (s.x < -2) s.x = width + 2
        if (s.x > width + 2) s.x = -2
        if (s.y < -2) s.y = height + 2
        if (s.y > height + 2) s.y = -2

        // star dot with glow
        ctx.beginPath()
        ctx.arc(s.x + offX, s.y + offY, radius, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fillStyle = s.color || "#ffffff"
        ctx.shadowColor = s.color || "rgba(255,255,255,0.6)"
        ctx.shadowBlur = glow
        ctx.globalAlpha = alpha
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1

        if (sparkle && !reduceMotionRef.current && Math.random() < sparkleChance * dt) {
          ctx.beginPath()
          ctx.arc(s.x + offX, s.y + offY, radius * 1.9, 0, Math.PI * 2)
          ctx.closePath()
          ctx.fillStyle = s.color || "#ffffff"
          ctx.shadowColor = s.color || "rgba(255,255,255,0.9)"
          ctx.shadowBlur = glow * 2
          ctx.globalAlpha = 0.85
          ctx.fill()
          ctx.shadowBlur = 0
          ctx.globalAlpha = 1
        }
      }

      // Constellation lines (connect nearby stars)
      const maxDist = connectDistance
      for (let i = 0; i < stars.length; i++) {
        const a = stars[i]
        const offAX = px * (a.depth || 1)
        const offAY = py * (a.depth || 1)
        for (let j = i + 1; j < stars.length; j++) {
          const b = stars[j]
          const offBX = px * (b.depth || 1)
          const offBY = py * (b.depth || 1)
          const dx = a.x + offAX - (b.x + offBX)
          const dy = a.y + offAY - (b.y + offBY)
          const d = Math.hypot(dx, dy)
          if (d < maxDist) {
            const t = 1 - d / maxDist
            ctx.strokeStyle = a.color || "#ffffff"
            ctx.globalAlpha = 0.08 + t * 0.32
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x + offAX, a.y + offAY)
            ctx.lineTo(b.x + offBX, b.y + offBY)
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      rafRef.current = requestAnimationFrame(render)
    }

    const ro = new ResizeObserver(() => resize())
    ro.observe(canvas.parentElement as Element)

    // Pause rendering when hero not visible
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          runningRef.current = entry.isIntersecting
        }
      },
      { threshold: 0.05 },
    )
    io.observe(canvas)

    // Mouse / parallax
    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      // normalize to [-1, 1]
      mouseRef.current.x = ((e.clientX - cx) / (rect.width / 2)) * (reduceMotionRef.current ? 0.4 : 1)
      mouseRef.current.y = ((e.clientY - cy) / (rect.height / 2)) * (reduceMotionRef.current ? 0.4 : 1)
    }
    window.addEventListener("mousemove", onMouse, { passive: true })

    resize()
    rafRef.current = requestAnimationFrame(render)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener("mousemove", onMouse)
    }
  }, [
    density,
    connectDistance,
    parallax,
    speed,
    respectReducedMotion,
    twinkleAmplitude,
    twinkleScale,
    glow,
    sparkle,
    sparkleChance,
    speedBoost,
    twinkleSpeedMultiplier,
  ])

  return (
    <div className={`absolute inset-0 z-0 pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="h-full w-full block" aria-hidden="true" />
    </div>
  )
}
