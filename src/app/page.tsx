"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, LayoutGroup } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { SmoothCursor } from "../components/ui/smooth-cursor"
import SocialIcons from "../components/ui/social-icons"
import StarsBackground from "@/components/stars-background"
import Globe from "@/components/globe"
import emailjs from "@emailjs/browser"
import WhatsAppFab from "@/components/whatsapp-fab"
import {
  Code2,
  Palette,
  ExternalLink,
  Github,
  Mail,
  ArrowRight,
  Menu,
  X,
  Download,
  MapPin,
  Phone,
  Send,
  Monitor,
  Smartphone,
  Coffee,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const BhavishyLogo = ({ scrollToSection }: { scrollToSection: (section: string) => void }) => {
  return (
    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault()
        scrollToSection("home")
      }}
      aria-label="Go to home - BHAVISHY"
      className="group flex items-center gap-4 transition-all duration-300 hover:scale-105"
      data-magnetic
    >
      <div className="relative flex items-center">
        {/* Compact Spinning Planet Earth */}
        <motion.div
          whileHover={{ 
            scale: 1.1,
            filter: "drop-shadow(0 0 20px rgba(6,182,212,0.6))"
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative mr-3 h-9 w-9 cursor-pointer"
        >
          {/* Orbit rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-cyan-300/15 border-dashed"
          />

          {/* Main Rotating Planet */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-1 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-400/60 transition-shadow duration-300 overflow-hidden"
          >
            {/* Planet surface with continents */}
            <div className="absolute inset-0 rounded-full">
              {/* Landmasses that rotate with planet */}
              <div className="absolute top-0.5 left-1.5 h-1.5 w-2 bg-emerald-400/80 rounded-full"></div>
              <div className="absolute top-2 right-0.5 h-1 w-1.5 bg-emerald-500/70 rounded-full"></div>
              <div className="absolute bottom-1.5 left-0.5 h-1.5 w-1 bg-emerald-400/60 rounded-full"></div>
              <div className="absolute bottom-0.5 right-1.5 h-0.5 w-1.5 bg-emerald-500/80 rounded-full"></div>
            </div>

            {/* Ocean patterns */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-300/30 via-blue-400/40 to-indigo-500/50"></div>
          </motion.div>

          {/* Static clouds layer */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-1 rounded-full pointer-events-none"
          >
            <div className="absolute top-0.5 right-1.5 h-0.5 w-1.5 bg-white/50 rounded-full blur-sm"></div>
            <div className="absolute bottom-1.5 left-1 h-0.5 w-1 bg-white/40 rounded-full blur-sm"></div>
            <div className="absolute top-1/2 right-0.5 h-0.5 w-0.5 bg-white/35 rounded-full blur-sm"></div>
          </motion.div>

          {/* Orbiting moon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute -top-0.5 left-1/2 h-0.5 w-0.5 bg-gray-200 rounded-full transform -translate-x-1/2"></div>
          </motion.div>
        </motion.div>

        {/* Clean Professional Text */}
        <motion.div
          whileHover={{ x: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative"
        >
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wide relative">
            {/* Professional gradient text */}
            <span className="text-white group-hover:text-cyan-100 transition-colors duration-500 font-['Inter', 'system-ui', sans-serif] drop-shadow-lg">
              {Array.from("Bhavishy").map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block relative"
                  whileHover={{
                    y: -4,
                    scale: 1.05,
                    textShadow: "0 0 20px rgba(34,211,238,0.8)"
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    delay: i * 0.03
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Enhanced accent line with glow */}
          <motion.div
            className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
            initial={{ width: "25%", opacity: 0.7 }}
            whileHover={{ width: "100%", opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Vibrant background glow */}
          <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-400/10 blur-2xl rounded-xl transition-all duration-700 -z-10"></div>
        </motion.div>

        {/* Modern Hover Effect */}
        <motion.div
          className="absolute -inset-2 rounded-xl border border-transparent group-hover:border-cyan-400/20 transition-all duration-300 -z-20"
          whileHover={{ 
            boxShadow: "0 0 30px rgba(34, 211, 238, 0.1)",
            scale: 1.01 
          }}
          whileTap={{ 
            scale: 0.99,
            boxShadow: "0 0 20px rgba(34, 211, 238, 0.15)"
          }}
        />
      </div>
    </Link>
  )
}
// Client-side only wrapper to prevent hydration issues
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <>{children}</>
}

// Smooth reveal animation
const RevealAnimation = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}

// Floating geometric shapes - wrapped in ClientOnly
const FloatingShapes = () => {
  return (
    <ClientOnly>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border border-primary/30 rounded-full"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-12 h-12 border-2 border-yellow-500/40 rotate-45"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>
    </ClientOnly>
  )
}

// Skill card component
const SkillCard = ({
  skill,
  icon,
  level,
  delay,
  logoSrc,
}: { skill: string; icon: React.ReactNode; level: number; delay: number; logoSrc?: string }) => {
  return (
    <RevealAnimation delay={delay}>
      <motion.div whileHover={{ y: -5, scale: 1.02 }} className="glass-card rounded-2xl p-6 smooth-hover">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 gradient-button rounded-xl text-white">
            {logoSrc ? (
              <Image
                src={logoSrc || "/placeholder.svg"}
                alt={`${skill} logo`}
                width={20}
                height={20}
                className="h-5 w-5 object-contain filter brightness-0 invert"
              />
            ) : (
              icon
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{skill}</h3>
            <div className="text-sm text-muted-foreground">{level}% Proficiency</div>
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <motion.div
            className="gradient-button h-2 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: delay + 0.2 }}
          />
        </div>
      </motion.div>
    </RevealAnimation>
  )
}

// Project card component
const ProjectCard = ({ project, delay }: { project: any; delay: number }) => {
  return (
    <RevealAnimation delay={delay}>
      <motion.div
        whileHover={{ y: -8 }}
        className="group glass-card rounded-2xl overflow-hidden smooth-hover shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="relative aspect-video bg-muted/50 overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            loading="lazy"
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-300" />
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="outline" className="border-primary text-primary bg-primary/10">
              {project.category}
            </Badge>
            <div className="text-sm text-muted-foreground">{project.status}</div>
          </div>

          <h3 className="text-xl font-semibold text-foreground mb-2 text-shadow">{project.title}</h3>
          <p className="text-secondary-foreground mb-4 leading-relaxed">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech: string) => (
              <Badge key={tech} variant="secondary" className="bg-secondary text-secondary-foreground text-xs">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              size="sm"
              className="gradient-button text-white flex-1 hover:-translate-y-0.5 transition-transform"
              asChild
            >
              <Link href={project.liveUrl}>
                <ExternalLink className="mr-2 h-4 w-4" />
                View Live
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-border flex-1 bg-transparent hover:bg-accent/20 hover:text-foreground hover:-translate-y-0.5 transition-transform"
              asChild
            >
              <Link href={project.githubUrl}>
                <Github className="mr-2 h-4 w-4" />
                Code
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </RevealAnimation>
  )
}

// Animated professional titles component with typing effect
const AnimatedProfessionalTitle = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)

  const titles = ["Web Developer", "UI/UX Designer", "Frontend Developer", "Creative Designer"]

  useEffect(() => {
    const currentTitle = titles[currentIndex]
    let timeoutId: NodeJS.Timeout

    if (isTyping) {
      // Typing effect
      if (displayText.length < currentTitle.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length + 1))
        }, 100) // Typing speed
      } else {
        // Finished typing, wait before deleting
        timeoutId = setTimeout(() => {
          setIsTyping(false)
        }, 2000) // Display time
      }
    } else {
      // Deleting effect
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 50) // Deleting speed
      } else {
        // Finished deleting, move to next title
        timeoutId = setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % titles.length)
          setIsTyping(true)
        }, 500) // Pause before next title
      }
    }

    return () => clearTimeout(timeoutId)
  }, [displayText, isTyping, currentIndex])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <div className="relative min-w-[300px] md:min-w-[400px]">
      <div className="text-secondary-foreground font-semibold text-4xl tracking-wide tabular-nums">
        {displayText}
        <span
          className={`inline-block w-0.5 h-8 bg-primary ml-1 ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}
        >
          |
        </span>
      </div>
    </div>
  )
}

// Helper functions to convert CSS HSL triplets to normalized RGB for Globe colors
function hslToRgbNormalized(h: number, s: number, l: number): [number, number, number] {
  // h: degrees [0..360], s/l: percent [0..100]
  s /= 100
  l /= 100
  const c = (1 - Math.abs(2 * l - 1)) * s
  const hh = h / 60
  const x = c * (1 - Math.abs((hh % 2) - 1))
  let r1 = 0,
    g1 = 0,
    b1 = 0
  if (hh >= 0 && hh < 1) [r1, g1, b1] = [c, x, 0]
  else if (hh >= 1 && hh < 2) [r1, g1, b1] = [x, c, 0]
  else if (hh >= 2 && hh < 3) [r1, g1, b1] = [0, c, x]
  else if (hh >= 3 && hh < 4) [r1, g1, b1] = [0, x, c]
  else if (hh >= 4 && hh < 5) [r1, g1, b1] = [x, 0, c]
  else if (hh >= 5 && hh < 6) [r1, g1, b1] = [c, 0, x]
  const m = l - c / 2
  const r = r1 + m
  const g = g1 + m
  const b = b1 + m
  return [r, g, b]
}

function hexToRgbNormalized(hex: string): [number, number, number] {
  const h = hex.trim()
  if (!h.startsWith("#")) return [1, 1, 1]
  const clean = h.slice(1)
  const parse = (s: string) => Number.parseInt(s, 16)
  if (clean.length === 3) {
    const r = parse(clean[0] + clean[0])
    const g = parse(clean[1] + clean[1])
    const b = parse(clean[2] + clean[2])
    return [r / 255, g / 255, b / 255]
  }
  if (clean.length === 6) {
    const r = parse(clean.slice(0, 2))
    const g = parse(clean.slice(2, 4))
    const b = parse(clean.slice(4, 6))
    return [r / 255, g / 255, b / 255]
  }
  return [1, 1, 1]
}

function parseCssHslTripletToRgbNormalized(triplet: string | null | undefined): [number, number, number] {
  if (!triplet) return [1, 1, 1]
  const value = triplet.trim()
  // If variables are hex (e.g., #1746a2), handle here
  if (value.startsWith("#")) return hexToRgbNormalized(value)
  // Tailwind v4 tokens like "222.2 47.4% 11.2%"
  const parts = value.split(/\s+/).filter(Boolean)
  if (parts.length < 3) return [1, 1, 1]
  const h = Number(Number.parseFloat(parts[0]))
  const s = Number(Number.parseFloat(parts[1]))
  const l = Number(Number.parseFloat(parts[2]))
  return hslToRgbNormalized(h, s, l)
}

export default function ProfessionalPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [formState, setFormState] = useState<{success?: boolean, error?: boolean, message?: string}>({})
const [isPending, setIsPending] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [globeTheme, setGlobeTheme] = useState<{
    base: [number, number, number]
    marker: [number, number, number]
    glow: [number, number, number]
    dark: number
  }>({
    base: [1, 1, 1],
    marker: [0.8, 0.4, 0.1],
    glow: [0.2, 0.5, 0.9],
    dark: 0,
  })
   
const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setIsPending(true)
  setFormState({})
  const form = e.currentTarget

  try {
    await emailjs.sendForm(
      "service_6t02dxa",    // <-- apna EmailJS Service ID dalein
      "template_pwq94lw",   // <-- apna EmailJS Template ID dalein
      form,
      "zn_l-OyR4DkxGXh2J"     // <-- apna EmailJS Public Key dalein
    )
    setFormState({ success: true, message: "Thank you for your message! I'll get back to you soon. 😊" })
    form.reset()
  } catch (err) {
    setFormState({ error: true, message: "Sorry, something went wrong. Please try again later." })
  }
  setIsPending(false)
}

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  const skills = [
    {
      name: "HTML5",
      icon: <Code2 className="h-5 w-5" />,
      level: 90,
      logoSrc: "/html5-logo-monochrome.png",
    },
    {
      name: "Node.js",
      icon: <Palette className="h-5 w-5" />,
      level: 73,
      logoSrc: "/nodejs-logo-monochrome.png",
    },
    {
      name: "JavaScript",
      icon: <Code2 className="h-5 w-5" />,
      level: 70,
      logoSrc: "/javascript-logo-monochrome.png",
    },
    {
      name: "React",
      icon: <Code2 className="h-5 w-5" />,
      level: 75,
      logoSrc: "/react-logo-monochrome.png",
    },
    {
      name: "Tailwind CSS",
      icon: <Palette className="h-5 w-5" />,
      level: 65,
      logoSrc: "/tailwind-css-logo-monochrome.png",
    },
    {
      name: "Figma",
      icon: <Palette className="h-5 w-5" />,
      level: 76,
      logoSrc: "/figma-logo-monochrome.png",
    },
    
  ]

  const projects = [
    {
      title: "Data Analytics Portfolio Website",
      category: "Frontend project",
      description:
        "A responsive portfolio website built with modern web technologies, featuring smooth animations and clean design.",
      image: "/placeholder.png?height=300&width=500&text=Portfolio+Website",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "Next.js"],
      liveUrl: "https://shubhan.vercel.app/",
      githubUrl: "https://github.com/bhavishy03/portfolio-website",
      status: "Live",
    },
    {
      title: "Food-Adda - Food Delivery Website",
      category: "Full Stack Development",
      description:
        "A full-stack food delivery website with responsive UI cart & checkout, authentication, and order tracking.",
      image: "/food-adda.png?height=300&width=500&text=Todo+App",
      technologies: [ "React.js",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "JWT Authentication"],
      liveUrl: "https://adda-food.vercel.app/",
      githubUrl: "https://github.com/bhavishy03/Food-Adda",
      status: "Live",
    },
    {
      title: "NovaGrowth - Digital Marketing Agency Website",
      category: "Landing Page",
      description:
       "A responsive digital agency website with modern design, 3D elements, and smooth animations.",
      image: "/digital.png?height=300&width=500&text=Weather+App",
      technologies: [ "Next.js 14",
    "TypeScript","Tailwind CSS",
    "shadcn/ui", "React"],
      liveUrl: "https://novagrowth.vercel.app/",
      githubUrl: "https://github.com/bhavishy03/novagrowth",
      status: "Live",
    },
    {
      title: "Portfolio website",
      category: "UI/UX Design",
      description:
         "A responsive portfolio website built with modern web technologies, featuring smooth animations, clean design, and a contact form integration.",
      image: "/bhavishyport.png?height=300&width=500&text=Landing+Page",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "Next.js"],
      liveUrl: "#",
      githubUrl: "#",
      status: "Live",
    },
  ]

  const services = [
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Web Development",
      description: "Creating responsive and modern websites using latest technologies and best practices.",
      features: ["Responsive Design", "Modern Frameworks", "Performance Optimization", "SEO Friendly"],
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "UI/UX Design",
      description: "Designing beautiful and user-friendly interfaces that provide excellent user experience.",
      features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile-First Design",
      description: "Ensuring your website looks and works perfectly on all devices and screen sizes.",
      features: ["Mobile Optimization", "Touch-Friendly", "Fast Loading", "Cross-Browser"],
    },
  ]

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
    setActiveSection(sectionId)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "services", "contact"]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
      setIsScrolled(window.scrollY > 8)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // wait until mounted to read computed styles
    if (!mounted) return
    const root = document.documentElement
    const styles = getComputedStyle(root)
    const primaryTriplet = styles.getPropertyValue("--primary")
    const accentTriplet = styles.getPropertyValue("--accent")
    const foregroundTriplet = styles.getPropertyValue("--foreground")
    const backgroundTriplet = styles.getPropertyValue("--background")

    const base = parseCssHslTripletToRgbNormalized(foregroundTriplet)
    const marker = parseCssHslTripletToRgbNormalized(primaryTriplet || foregroundTriplet)
    const glow = parseCssHslTripletToRgbNormalized(accentTriplet || primaryTriplet || foregroundTriplet)

    // detect dark mode from background L; if L < 50%, treat as dark
    let dark = 0
    if (backgroundTriplet) {
      const parts = backgroundTriplet.trim().split(/\s+/)
      const l = parts.length >= 3 ? Number(Number.parseFloat(parts[2])) : 100
      dark = l < 50 ? 1 : 0
    }

    setGlobeTheme({ base, marker, glow, dark })
  }, [mounted])

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav
        aria-label="Primary"
        className={`fixed top-0 w-full z-50 border-b border-border/60 transition-all duration-300 ${
          isScrolled
            ? "bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/50 shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
            : "bg-transparent"
        }`}
      >
        {/* Navbar container: animate padding on scroll for a sleeker feel */}
        <div
          className={`container mx-auto px-4 sm:px-6 transition-[padding] duration-300 ${
            isScrolled ? "py-2 sm:py-3" : "py-3 sm:py-4"
          }`}
        >
          <div className="flex justify-between items-center">
            {/* Enhanced Brand Logo */}
            <BhavishyLogo scrollToSection={scrollToSection} />

            {/* Desktop nav + CTA */}
            <div className="hidden md:flex items-center gap-6">
              <LayoutGroup id="primary-nav">
                <div className="flex items-center gap-2 relative">
                  {["Home", "About", "Skills", "Projects", "Services", "Contact"].map((item) => {
                    const id = item.toLowerCase()
                    const active = activeSection === id
                    return (
                      <button
                        key={item}
                        onClick={() => scrollToSection(id)}
                        aria-current={active ? "page" : undefined}
                        // Add subtle lift on hover while keeping existing active underline
                        className={`group relative rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 smooth-hover hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                          active
                            ? "text-primary bg-accent/15"
                            : "text-secondary-foreground hover:text-foreground hover:bg-accent/10"
                        }`}
                        data-magnetic
                      >
                        {item}
                        {active && (
                          <motion.span
                            layoutId="nav-underline"
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 40, mass: 1 }}
                            className="pointer-events-none absolute -bottom-1 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-primary via-accent to-yellow-500"
                          />
                        )}
                      </button>
                    )
                  })}
                </div>
              </LayoutGroup>

              <Button
                size="sm"
                onClick={() => scrollToSection("contact")}
                className="rounded-full gradient-button text-white px-4"
                data-magnetic
              >
                Hire Me
              </Button>
            </div>

            {/* Mobile menu toggle */}
            {/* Make toggle more interactive with scale + focus ring */}
            <button
              className="md:hidden p-2 rounded-lg text-foreground hover:text-primary transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation"
              aria-expanded={isMenuOpen}
              data-magnetic
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-2 pb-4 border-t border-border pt-4">
              {["Home", "About", "Skills", "Projects", "Services", "Contact"].map((item) => {
                const id = item.toLowerCase()
                const active = activeSection === id
                return (
                  <button
                    key={item}
                    onClick={() => scrollToSection(id)}
                    className={`block w-full text-left rounded-lg px-3 py-2 transition-colors ${
                      active
                        ? "bg-accent/15 text-primary"
                        : "text-secondary-foreground hover:bg-accent/10 hover:text-foreground"
                    }`}
                  >
                    {item}
                  </button>
                )
              })}
              <Button
                onClick={() => scrollToSection("contact")}
                className="w-full mt-2 rounded-full gradient-button text-white"
              >
                Hire Me
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center pt-20 scroll-mt-24 sm:scroll-mt-28 relative overflow-hidden"
      >
        {/* Add animated star particles behind hero content */}
        <StarsBackground speed={0.25} respectReducedMotion={false} density={160} connectDistance={140} />
        <FloatingShapes />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-2 items-center gap-8">
            <div className="max-w-4xl">
              {/* polished the availability pill: better spacing, subtle border/blur, and refined animated status dot */}
              <div
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-1.5 mb-8 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow hover:shadow-md"
                role="status"
                aria-label="Availability status"
              >
                {/* animated status dot with soft ping */}
                <span className="relative inline-flex h-2.5 w-2.5">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full bg-accent/40 animate-ping"
                    aria-hidden
                  ></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" aria-hidden></span>
                </span>
                <span className="text-xs sm:text-sm text-secondary-foreground">Available for freelance work</span>
              </div>

              <motion.h1
                initial={{ y: 12, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight text-shadow"
              >
                Hi, I'm{" "}
                <span className="relative accent-hover">
                  Bhavishy
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-yellow-500" />
                </span>
              </motion.h1>

              <div className="mb-8">
                <ClientOnly>
                  <AnimatedProfessionalTitle />
                </ClientOnly>
              </div>

              <p className="text-lg text-secondary-foreground mb-12 max-w-2xl leading-relaxed">
                I'm a passionate developer and designer who loves creating beautiful, functional websites. Currently
                learning and building projects to grow my skills in modern web development.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("projects")}
                  className="gradient-button text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:-translate-y-0.5 transition-transform"
                  data-magnetic
                >
                  View My Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-border hover:border-accent hover:bg-accent/20 hover:text-foreground px-6 py-3 sm:px-8 sm:py-4 rounded-full smooth-hover bg-transparent border-smooth hover:-translate-y-0.5 transition-transform"
                  data-magnetic
                >
                  <Download className="mr-2 h-5 w-5" />
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Download Resume
 </a>
                </Button>
              </div>

              {/* Social Media Icons */}
              <div className="mt-6">
                <SocialIcons />
              </div>
            </div>

            <div className="hidden md:flex justify-end">
              {/* Globe colors now follow the site theme (transparent canvas preserved) */}
              <Globe
                className="md:mr-0"
                baseColor={globeTheme.base}
                markerColor={globeTheme.marker}
                glowColor={globeTheme.glow}
                dark={globeTheme.dark}
                scale={1.1}
                diffuse={1.2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-mt-24 sm:scroll-mt-28 py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block gradient-button text-white px-4 py-2 rounded-full text-sm mb-6">
                About Me
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight text-shadow text-balance">
                Passionate about creating digital experiences
              </h2>

              <p className="text-lg text-secondary-foreground mb-8 leading-relaxed">
                I'm a beginner web developer and UI/UX designer with a strong passion for learning and creating. I enjoy
                working with modern technologies and am constantly improving my skills through practice and personal
                projects.
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div className="glass-card p-4 rounded-xl border-smooth">
                  <div className="text-3xl font-bold text-primary mb-2">Learning</div>
                  <div className="text-muted-foreground">Every Day</div>
                </div>
                <div className="glass-card p-4 rounded-xl border-smooth">
                  <div className="text-3xl font-bold text-accent mb-2">Projects</div>
                  <div className="text-muted-foreground">Building More</div>
                </div>
                <div className="glass-card p-4 rounded-xl border-smooth">
                  <div className="text-3xl font-bold text-yellow-500 mb-2">Passion</div>
                  <div className="text-muted-foreground">For Coding</div>
                </div>
                <div className="glass-card p-4 rounded-xl border-smooth">
                  <div className="text-3xl font-bold text-primary mb-2">Goal</div>
                  <div className="text-muted-foreground">Professional Dev</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square glass-card rounded-2xl overflow-hidden border-smooth w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                <motion.div
                  initial={{ y: 8, opacity: 0.95 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.995 }}
                  className="group relative h-full w-full ring-1 ring-border/40 transition-[transform,box-shadow,ring-color] duration-500 hover:ring-accent/40 hover:shadow-2xl"
                >
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-0 opacity-[0.10]"
                    style={{
                      backgroundImage:
                        "radial-gradient(currentColor 1px, transparent 1px), radial-gradient(currentColor 1px, transparent 1px)",
                      backgroundPosition: "0 0, 12px 12px",
                      backgroundSize: "24px 24px",
                    }}
                    animate={{ x: [0, 12, 0], y: [0, -12, 0] }}
                    transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                  {/* existing ambient blobs */}
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl mix-blend-overlay dark:mix-blend-screen z-[1]"
                    animate={{ x: [0, 8, -6, 0], y: [0, -6, 8, 0] }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-10 -right-12 h-48 w-48 rounded-full bg-accent/20 blur-3xl mix-blend-overlay dark:mix-blend-screen z-[1]"
                    animate={{ x: [0, -6, 6, 0], y: [0, 8, -8, 0] }}
                    transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.3 }}
                  />

                  {/* image frame slightly inset to add breathing room */}
                  <div className="absolute inset-2 md:inset-3 rounded-xl overflow-hidden z-10">
                    <Image
                      src="/bhavishy.jpg"
                      alt="Bhavishy portrait"
                      fill
                      priority
                      sizes="(min-width: 1024px) 420px, (min-width: 768px) 45vw, 90vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    {/* soft highlight overlay */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    {/* subtle sheen sweep */}
                    <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                      <span className="block h-full w-1/5 -skew-x-12 bg-foreground/5 translate-x-[-120%] group-hover:translate-x-[220%] transition-transform duration-700 ease-out" />
                    </span>
                  </div>
                </motion.div>
              </div>
              <div className="absolute -bottom-6 -right-6 gradient-button text-white p-6 rounded-2xl glow-accent">
                <Coffee className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="scroll-mt-24 sm:scroll-mt-28 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block gradient-button text-white px-4 py-2 rounded-full text-sm mb-6">My Skills</div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-shadow text-balance">
              Technologies I Work With
            </h2>
            <p className="text-lg text-secondary-foreground max-w-2xl mx-auto">
              I'm continuously learning and improving my skills in these technologies to build better web experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto items-stretch">
            {skills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill.name}
                icon={skill.icon}
                level={skill.level}
                delay={index * 0.1}
                logoSrc={skill.logoSrc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="scroll-mt-24 sm:scroll-mt-28 py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block gradient-button text-white px-4 py-2 rounded-full text-sm mb-6">My Work</div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-shadow text-balance">
              Projects I've Built
            </h2>
            <p className="text-lg text-secondary-foreground max-w-2xl mx-auto">
              Here are some projects I've worked on to practice and improve my development skills.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="scroll-mt-24 sm:scroll-mt-28 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block gradient-button text-white px-4 py-2 rounded-full text-sm mb-6">
              What I Offer
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-shadow text-balance">
              Services I Provide
            </h2>
            <p className="text-lg text-secondary-foreground max-w-2xl mx-auto">
              I offer these services as I continue to learn and grow as a developer and designer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="glass-card rounded-2xl p-6 md:p-7 smooth-hover shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="gradient-button text-white p-4 rounded-xl w-fit mb-6">{service.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-4 text-shadow">{service.title}</h3>
                <p className="text-secondary-foreground mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-secondary-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-24 sm:scroll-mt-28 py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block gradient-button text-white px-4 py-2 rounded-full text-sm mb-6">
              Get In Touch
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-shadow text-balance">
              Let's Work Together
            </h2>
            <p className="text-lg text-secondary-foreground max-w-2xl mx-auto">
              I'm always open to discussing new opportunities and interesting projects. Let's connect!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-8 text-shadow">Contact Information</h3>
                <div className="space-y-6">
                  {[
                    { icon: <Mail className="h-5 w-5" />, label: "Email", value: "hi.bhavishy@gmail.com" },
                    { icon: <MapPin className="h-5 w-5" />, label: "Location", value: "Indore, India" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 glass-card rounded-xl smooth-hover">
                      <div className="gradient-button text-white p-3 rounded-lg">{item.icon}</div>
                      <div>
                        <div className="font-semibold text-foreground">{item.label}</div>
                        <div className="text-secondary-foreground">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4">Why work with me?</h4>
                <div className="space-y-3">
                  {[
                    "Passionate about learning and growing",
                    "Dedicated to delivering quality work",
                    "Always eager to take on new challenges",
                    "Committed to meeting deadlines",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-secondary-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="border-0 shadow-lg glass-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground text-shadow">Send me a message</CardTitle>
                <CardDescription className="text-secondary-foreground">
                  I'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Name</label>
                      <Input
                        name="name"
                        placeholder="Your name"
                        className="border-border focus:border-primary focus:ring-primary bg-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        className="border-border focus:border-primary focus:ring-primary bg-input"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
                    <Input
                      name="subject"
                      placeholder="What's this about?"
                      className="border-border focus:border-primary focus:ring-primary bg-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                    <Textarea
                      name="message"
                      placeholder="Tell me about your project or just say hi..."
                      rows={5}
                      className="border-border focus:border-primary focus:ring-primary bg-input"
                      required
                    />
                  </div>

                  {formState?.success && (
                    <div className="p-4 bg-accent/20 border border-accent rounded-lg">
                      <p className="text-accent font-medium">✅ {formState.message}</p>
                    </div>
                  )}

                  {formState?.error && (
                    <div className="p-4 bg-destructive/20 border border-destructive rounded-lg">
                      <p className="text-destructive font-medium">❌ {formState.message}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full gradient-button text-white py-3"
                    data-magnetic
                  >
                    {isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border glass-card">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-muted-foreground">© 2024 Bhavishy Rajak. All rights reserved.</div>
            <div className="flex space-x-8">
              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Smooth Cursor */}
      <ClientOnly>
        <SmoothCursor
          color="#7F5AF0"
          size={20}
          glowEffect={true}
          scaleOnClick={true}
          rotateOnMove={true}
          magneticElements="button, a, [data-magnetic]"
          magneticDistance={60}
          springConfig={{
            damping: 40,
            stiffness: 350,
            mass: 1,
            restDelta: 0.001,
          }}
        />
      </ClientOnly>

      {/* WhatsApp Floating Button */}
      <WhatsAppFab />
    </div>
  )
}