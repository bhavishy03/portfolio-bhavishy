"use client"

import { motion, useSpring } from "framer-motion"
import { type FC, type JSX, useEffect, useRef, useState } from "react"

// Utility function 'cn' (classnames)
function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(" ")
}

interface Position {
  x: number
  y: number
}

export interface SpringConfig {
  damping: number
  stiffness: number
  mass: number
  restDelta: number
}

export interface SmoothCursorProps {
  cursor?: JSX.Element
  springConfig?: SpringConfig
  className?: string
  size?: number
  color?: string
  hideOnLeave?: boolean
  trailLength?: number
  showTrail?: boolean
  rotateOnMove?: boolean
  scaleOnClick?: boolean
  glowEffect?: boolean
  magneticDistance?: number
  magneticElements?: string
  onCursorMove?: (position: Position) => void
  onCursorEnter?: () => void
  onCursorLeave?: () => void
  disabled?: boolean
}

// Simple Modern Cursor Dot
const MinimalCursor: FC<{ size?: number; color?: string; isHovering?: boolean }> = ({
  size = 8,
  color = "#87CEEB",
  isHovering = false,
}) => {
  return (
    <div
      className="rounded-full transition-all duration-300 ease-out"
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(135deg, #87CEEB 0%, #4FC3F7 50%, #29B6F6 100%)',
        boxShadow: `0 0 ${isHovering ? '20px' : '10px'} #87CEEB60`,
        border: isHovering ? `2px solid #87CEEB80` : 'none',
        transform: isHovering ? 'scale(1.5)' : 'scale(1)',
      }}
    />
  )
}

// Professional Cursor Ring for Hover States
const HoverRing: FC<{ size?: number; color?: string }> = ({
  size = 32,
  color = "#87CEEB",
}) => {
  return (
    <div
      className="rounded-full border-2 transition-all duration-300 ease-out"
      style={{
        width: size,
        height: size,
        borderColor: '#87CEEB60',
        backgroundColor: '#87CEEB08',
      }}
    />
  )
}

// Simple Trail Dot
const TrailDot: FC<{ position: Position; opacity: number; size: number; color: string }> = ({
  position,
  opacity,
  size,
  color
}) => {
  return (
    <motion.div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        translateX: "-50%",
        translateY: "-50%",
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: "50%",
        opacity: opacity,
        pointerEvents: "none",
        zIndex: 999,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: opacity }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    />
  )
}

export function SmoothCursor({
  cursor,
  springConfig = {
    damping: 800,
    stiffness: 600,
    mass: 0.3,
    restDelta: 0.001,
  },
  className,
  size = 8,
  color = "#87CEEB",
  hideOnLeave = true,
  trailLength = 6,
  showTrail = true,
  rotateOnMove = false,
  scaleOnClick = true,
  glowEffect = true,
  magneticDistance = 60,
  magneticElements = "[data-magnetic], button, a, .cursor-pointer",
  onCursorMove,
  onCursorEnter,
  onCursorLeave,
  disabled = false,
}: SmoothCursorProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isClicking, setIsClicking] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [trail, setTrail] = useState<Position[]>([])

  const lastMousePos = useRef<Position>({ x: 0, y: 0 })
  const velocity = useRef<Position>({ x: 0, y: 0 })
  const lastUpdateTime = useRef(Date.now())

  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 400,
    damping: 25,
  })

  const defaultCursor = <MinimalCursor size={size} color={color} isHovering={isHovering} />
  const cursorElement = cursor || defaultCursor

  useEffect(() => {
    if (disabled) return

    const updateVelocity = (currentPos: Position) => {
      const currentTime = Date.now()
      const deltaTime = currentTime - lastUpdateTime.current

      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        }
      }

      lastUpdateTime.current = currentTime
      lastMousePos.current = currentPos
    }

    const updateTrail = (pos: Position) => {
      if (!showTrail) return

      setTrail((prev) => {
        const newTrail = [pos, ...prev.slice(0, trailLength - 1)]
        return newTrail
      })
    }

    const findMagneticElement = (x: number, y: number) => {
      const elements = document.querySelectorAll(magneticElements)

      for (const element of Array.from(elements)) {
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))

        if (distance < magneticDistance) {
          return { element, x: centerX, y: centerY, distance }
        }
      }
      return null
    }

    const checkHoverElements = (x: number, y: number) => {
      const elements = document.elementsFromPoint(x, y)
      const interactiveElement = elements.find(el => 
        el.tagName === 'BUTTON' || 
        el.tagName === 'A' || 
        el.classList.contains('cursor-pointer') ||
        el.hasAttribute('data-magnetic') ||
        getComputedStyle(el).cursor === 'pointer'
      )
      
      const wasHovering = isHovering
      const shouldHover = !!interactiveElement
      
      if (shouldHover !== wasHovering) {
        setIsHovering(shouldHover)
      }
    }

    const smoothMouseMove = (e: MouseEvent) => {
      let currentPos = { x: e.clientX, y: e.clientY }

      // Check for hover elements
      checkHoverElements(currentPos.x, currentPos.y)

      // Simple magnetic effect
      const magneticTarget = findMagneticElement(currentPos.x, currentPos.y)
      if (magneticTarget) {
        const strength = 1 - magneticTarget.distance / magneticDistance
        currentPos = {
          x: currentPos.x + (magneticTarget.x - currentPos.x) * strength * 0.2,
          y: currentPos.y + (magneticTarget.y - currentPos.y) * strength * 0.2,
        }
      }

      updateVelocity(currentPos)
      updateTrail(currentPos)

      cursorX.set(currentPos.x)
      cursorY.set(currentPos.y)

      onCursorMove?.(currentPos)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
      onCursorEnter?.()
    }

    const handleMouseLeave = () => {
      if (hideOnLeave) {
        setIsVisible(false)
      }
      setIsHovering(false)
      onCursorLeave?.()
    }

    const handleMouseDown = () => {
      if (scaleOnClick) {
        setIsClicking(true)
        scale.set(0.8)
      }
    }

    const handleMouseUp = () => {
      if (scaleOnClick) {
        setIsClicking(false)
        scale.set(1)
      }
    }

    // Throttled mouse movement for performance
    let rafId: number
    const throttledMouseMove = (e: MouseEvent) => {
      if (rafId) return

      rafId = requestAnimationFrame(() => {
        smoothMouseMove(e)
        rafId = 0
      })
    }

    // Hide default cursor
    document.body.style.cursor = "none"
    
    // Event listeners
    window.addEventListener("mousemove", throttledMouseMove)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "auto"
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [
    cursorX, cursorY, scale, disabled, showTrail, trailLength, scaleOnClick,
    hideOnLeave, magneticDistance, magneticElements, onCursorMove,
    onCursorEnter, onCursorLeave, isHovering
  ])

  if (disabled || !isVisible) return null

  return (
    <>
      {/* Simple Trail */}
      {showTrail && trail.map((pos, index) => {
        const opacity = ((trailLength - index) / trailLength) * 0.5
        const dotSize = Math.max(2, size * ((trailLength - index) / trailLength) * 0.6)
        
        return (
          <TrailDot
            key={`trail-${index}`}
            position={pos}
            opacity={opacity}
            size={dotSize}
            color="#87CEEB"
          />
        )
      })}

      {/* Main Cursor */}
      <motion.div
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          scale: scale,
          zIndex: 1000,
          pointerEvents: "none",
          willChange: "transform",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        className={cn("select-none", className)}
      >
        {cursorElement}
      </motion.div>

      {/* Hover Ring - Only shows on interactive elements */}
      {isHovering && (
        <motion.div
          style={{
            position: "fixed",
            left: cursorX,
            top: cursorY,
            translateX: "-50%",
            translateY: "-50%",
            zIndex: 999,
            pointerEvents: "none",
          }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
        >
          <HoverRing size={32} color={color} />
        </motion.div>
      )}
    </>
  )
}

export default SmoothCursor