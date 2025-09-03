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
  size = 480,
  scale = 1.2,
  speed = 0.005,
}: ThemedGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [ready, setReady] = useState(false)
  const globeRef = useRef<any>(null)

  useEffect(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready || !canvasRef.current) return

    const canvas = canvasRef.current
    let phi = 0
    let width = size
    let height = size
    
    // Safe device pixel ratio check
    const dpi = typeof window !== 'undefined' 
      ? Math.min(2, window.devicePixelRatio || 1) 
      : 1

    // Safe CSS variables reading with fallbacks
    let baseColor: RGB = [0.9, 0.9, 0.9]
    let markerColor: RGB = [0.2, 0.6, 1]
    let glowColor: RGB = [0.4, 0.8, 1]

    try {
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const root = getComputedStyle(document.documentElement)
        const primaryVar = root.getPropertyValue("--primary").trim() || "210 100% 50%"
        const accentVar = root.getPropertyValue("--accent").trim() || "200 94% 65%"
        const fgVar = root.getPropertyValue("--foreground").trim() || "220 14% 96%"

        baseColor = hslVarToRgb(fgVar)
        markerColor = hslVarToRgb(primaryVar)
        glowColor = hslVarToRgb(accentVar)
      }
    } catch (error) {
      console.warn('Failed to read CSS variables, using defaults:', error)
    }

    canvas.width = width * dpi
    canvas.height = height * dpi
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    try {
      const globe = createGlobe(canvas, {
        devicePixelRatio: dpi,
        width: canvas.width,
        height: canvas.height,
        phi: 0,
        theta: 0.25,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 2.2,
        baseColor,
        markerColor,
        glowColor,
        markers: [],
        scale,
        onRender: (state) => {
          state.phi = phi
          phi += speed
        },
      })

      globeRef.current = globe

      // Mouse/touch interaction handlers
      let dragging = false
      let lastX = 0

      const onPointerDown = (e: PointerEvent) => {
        e.preventDefault()
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

      // Event listeners
      canvas.addEventListener("pointerdown", onPointerDown)
      if (typeof window !== 'undefined') {
        window.addEventListener("pointerup", onPointerUp)
        window.addEventListener("pointermove", onPointerMove)
      }

      // Cleanup function
      const cleanup = () => {
        canvas.removeEventListener("pointerdown", onPointerDown)
        if (typeof window !== 'undefined') {
          window.removeEventListener("pointerup", onPointerUp)
          window.removeEventListener("pointermove", onPointerMove)
        }
        if (globeRef.current) {
          globeRef.current.destroy()
          globeRef.current = null
        }
      }

      return cleanup
    } catch (error) {
      console.error('Failed to create globe:', error)
      return () => {}
    }
  }, [ready, size, scale, speed])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (globeRef.current) {
        globeRef.current.destroy()
        globeRef.current = null
      }
    }
  }, [])

  if (!ready) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className={className}>
      <canvas 
        ref={canvasRef} 
        aria-label="Interactive globe" 
        className="block select-none touch-none"
        style={{ cursor: 'grab' }}
      />
    </div>
  )
}

export default ThemedGlobe
