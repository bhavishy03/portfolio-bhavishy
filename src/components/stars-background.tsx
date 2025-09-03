"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type Star = {
  x: number
  y: number
  z: number
  r: number
  vx: number
  vy: number
  twinkle: number
}

interface StarsBackgroundProps {
  className?: string
  density?: number // stars per 10,000 px^2 (rough heuristic)
  speed?: number // base movement multiplier
}

export default function StarsBackground({ className, density, speed = 1 }: StarsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const starsRef = useRef<Star[]>([])
  const mouseRef = useRef<{ x: number; y: number } | null>(null)
  const dprRef = useRef<number>(1)
  const reduceMotionRef = useRef<boolean>(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // respect prefers-reduced-motion
    reduceMotionRef.current = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false

    // high-DPI scaling
    const setSize = () => {
      const { clientWidth, clientHeight } = canvas.parentElement || document.body
      dprRef.current = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(clientWidth * dprRef.current)
      canvas.height = Math.floor(clientHeight * dprRef.current)
      canvas.style.width = clientWidth + "px"
      canvas.style.height = clientHeight + "px"
      initStars()
    }

    // infer light/dark color (canvas doesn't support OKLCH, so we approximate)
    const getStarColor = () => {
      const isDark = document.documentElement.classList.contains("dark")
      // Slightly bluish-white for depth, subtle opacity for twinkle overlay
      const base = isDark ? "rgba(255,255,255" : "rgba(20,20,30"
      return {
        dot: `${base},0.9)`,
        trail: `${base},0.25)`,
      }
    }
    let colors = getStarColor()

    const initStars = () => {
      const area = (canvas.width * canvas.height) / (dprRef.current * dprRef.current)
      // default density: tuned for performance; less if reduced motion
      const baseDensity = density ?? (reduceMotionRef.current ? 0.0004 : 0.0012) // stars per px^2
      const count = Math.max(20, Math.floor(area * baseDensity))

      const newStars: Star[] = []
      for (let i = 0; i < count; i++) {
        // z used as parallax layer (0..1)
        const z = Math.random()
        const r = Math.max(0.6, (1 - z) * 1.6) // smaller when further (higher z)
        const s = speed * (0.15 + 0.85 * (1 - z)) // faster when closer (lower z)
        newStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z,
          r,
          vx: (Math.random() - 0.5) * s,
          vy: (Math.random() - 0.5) * s,
          twinkle: Math.random() * Math.PI * 2,
        })
      }
      starsRef.current = newStars
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: (e.clientX - rect.left) * dprRef.current, y: (e.clientY - rect.top) * dprRef.current }
    }

    const onThemeChange = () => {
      colors = getStarColor()
    }

    const draw = () => {
      if (!ctx) return
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      const stars = starsRef.current
      const mouse = mouseRef.current

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        // parallax: mouse influence
        let parallaxX = 0
        let parallaxY = 0
        if (mouse && !reduceMotionRef.current) {
          const strength = 0.02 * (1 - s.z) // closer stars move more
          parallaxX = (mouse.x - width / 2) * strength
          parallaxY = (mouse.y - height / 2) * strength
        }

        // movement
        if (!reduceMotionRef.current) {
          s.x += s.vx
          s.y += s.vy
        }

        // wrap around edges
        if (s.x < -5) s.x = width + 5
        if (s.x > width + 5) s.x = -5
        if (s.y < -5) s.y = height + 5
        if (s.y > height + 5) s.y = -5

        // twinkle
        s.twinkle += 0.02 + 0.02 * (1 - s.z)
        const twinkleAlpha = reduceMotionRef.current ? 1 : 0.75 + 0.25 * Math.sin(s.twinkle)

        // glow/trail
        if (!reduceMotionRef.current) {
          ctx.beginPath()
          ctx.strokeStyle = colors.trail
          ctx.lineWidth = Math.max(0.6, s.r * 0.75)
          ctx.moveTo(s.x + parallaxX, s.y + parallaxY)
          ctx.lineTo(s.x + parallaxX - s.vx * 3, s.y + parallaxY - s.vy * 3)
          ctx.stroke()
        }

        // dot
        ctx.beginPath()
        ctx.fillStyle = colors.dot
        ctx.globalAlpha = twinkleAlpha
        ctx.arc(s.x + parallaxX, s.y + parallaxY, s.r * dprRef.current, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    const onResize = () => {
      // debounce resize a bit
      cancelAnimationFrame(rafRef.current || 0)
      setSize()
      rafRef.current = requestAnimationFrame(draw)
    }

    // initial
    setSize()
    rafRef.current = requestAnimationFrame(draw)

    // listeners
    window.addEventListener("mousemove", onMouseMove, { passive: true })
    window.addEventListener("resize", onResize)
    // observe class changes on <html> to update colors when theme toggles
    const mo = new MutationObserver(onThemeChange)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize", onResize)
      mo.disconnect()
    }
  }, [density, speed])

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0",
        // ensure canvas uses the full section area
        className,
      )}
      aria-hidden="true"
    >
      {/* The canvas is sized by script; keep it simple here */}
      <canvas ref={canvasRef} />
    </div>
  )
}
