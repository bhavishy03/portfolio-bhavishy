"use client"

import { useEffect, useRef, useState } from "react"
import createGlobe from "cobe"

type RGB = [number, number, number]

// Parse CSS var value like "210 100% 50%" from Tailwind hsl(var(--...)) tokens
function hslVarToRgb(hslVar: string): RGB {
  // Expect something like "210 100% 50%" or "210 90% 56%"
  const parts = hslVar
    .trim()
    .replace(/%/g, "")
    .split(/\s+/)
    .map((n) => Number.parseFloat(n))
  const [h, sPct, lPct] = parts.length >= 3 ? parts : [210, 100, 50]
  const s = sPct / 100
  const l = lPct / 100

  // hsl -> rgb (0..1)
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r = 0,
    g = 0,
    b = 0
  if (0 <= h && h < 60) [r, g, b] = [c, x, 0]
  else if (60 <= h && h < 120) [r, g, b] = [x, c, 0]
  else if (120 <= h && h < 180) [r, g, b] = [0, c, x]
  else if (180 <= h && h < 240) [r, g, b] = [0, x, c]
  else if (240 <= h && h < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]
  return [r + m, g + m, b + m]
}

export function ThemedGlobe({
  className,
  size = 480,
  scale = 1.2,
  speed = 0.005,
}: {
  className?: string
  size?: number
  scale?: number
  speed?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready || !canvasRef.current) return

    const canvas = canvasRef.current
    let phi = 0
    let width = size
    let height = size
    const dpi = Math.min(2, window.devicePixelRatio || 1)

    // Read CSS variables for theme colors
    const root = getComputedStyle(document.documentElement)
    const primaryVar = root.getPropertyValue("--primary").trim() || "210 100% 50%"
    const accentVar = root.getPropertyValue("--accent").trim() || "200 94% 65%"
    const fgVar = root.getPropertyValue("--foreground").trim() || "220 14% 96%"

    const baseColor = hslVarToRgb(fgVar) as RGB
    const markerColor = hslVarToRgb(primaryVar) as RGB
    const glowColor = hslVarToRgb(accentVar) as RGB

    canvas.width = width * dpi
    canvas.height = height * dpi
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpi,
      width: canvas.width,
      height: canvas.height,
      phi: 0,
      theta: 0.25,
      dark: 0, // we keep base color in sync with theme, so no forced dark tint
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 2.2,
      baseColor,
      markerColor,
      glowColor,
      glowPower: 2.5,
      glowCoefficient: 0.08,
      // transparent background so only the globe is visible
      backgroundColor: [0, 0, 0, 0],
      markerSize: 0.0, // no markers by default (clean look)
      scale,
      onRender: (state) => {
        state.phi = phi
        phi += speed
      },
    })

    // Make it draggable
    let dragging = false
    let lastX = 0
    const onPointerDown = (e: PointerEvent) => {
      dragging = true
      lastX = e.clientX
    }
    const onPointerUp = () => {
      dragging = false
    }
    const onPointerMove = (e: PointerEvent) => {
      if (dragging) {
        const delta = e.clientX - lastX
        lastX = e.clientX
        phi += delta / 200
      }
    }
    canvas.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("pointerup", onPointerUp)
    window.addEventListener("pointermove", onPointerMove)

    // Resize handler
    const onResize = () => {
      width = size
      height = size
      canvas.width = width * dpi
      canvas.height = height * dpi
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
    }
    window.addEventListener("resize", onResize)

    return () => {
      globe.destroy()
      canvas.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("pointerup", onPointerUp)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("resize", onResize)
    }
  }, [ready, size, scale, speed])

  return (
    <div className={className}>
      <canvas ref={canvasRef} aria-label="Interactive globe" className="block select-none" />
    </div>
  )
}

export default ThemedGlobe
