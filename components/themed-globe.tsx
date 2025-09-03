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

interface ThemedGlobeProps {
  className?: string
  size?: number
  scale?: number
  speed?: number
}

export function ThemedGlobe({
  className = "",
  size = 500,
}: {
  className?: string
  size?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  const globeRef = useRef<any>(null)

  useEffect(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready || !canvasRef.current) return

    const canvas = canvasRef.current
    let phi = 0
    
    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0.3,
      dark: 0.4,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [28.6139, 77.2090], size: 0.03 },
        { location: [19.0760, 72.8777], size: 0.03 },
        { location: [13.0827, 80.2707], size: 0.03 },
        { location: [40.7128, -74.0060], size: 0.03 },
        { location: [51.5074, -0.1278], size: 0.03 },
      ],
      onRender: (state) => {
        state.phi = phi
        phi += 0.01
      },
    })

    globeRef.current = globe

    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`

    return () => {
      globe.destroy()
    }
  }, [ready, size])

  if (!ready) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className={className}>
      <canvas ref={canvasRef} className="max-w-full h-auto" />
    </div>
  )
}

export default ThemedGlobe
