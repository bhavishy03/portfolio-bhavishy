"use client"

import type React from "react"
import { useEffect } from "react"

type ThemeProviderProps = {
  children: React.ReactNode
  attribute?: "class" | "data-theme"
  defaultTheme?: "light" | "dark" | "system"
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "dark",
  enableSystem = true,
  disableTransitionOnChange = true,
}: ThemeProviderProps) {
  useEffect(() => {
    const root = document.documentElement

    const withNoTransition = (fn: () => void) => {
      if (!disableTransitionOnChange) return fn()
      const style = document.createElement("style")
      style.appendChild(document.createTextNode("*{transition:none!important}"))
      document.head.appendChild(style)
      fn()
      // Force reflow
      // @ts-ignore
      void root.offsetHeight
      style.parentNode?.removeChild(style)
    }

    const apply = (mode: "light" | "dark") => {
      withNoTransition(() => {
        if (attribute === "class") {
          root.classList.toggle("dark", mode === "dark")
          if (mode !== "dark") root.classList.remove("dark")
        } else {
          root.setAttribute(attribute, mode)
        }
      })
    }

    if (enableSystem && defaultTheme === "system") {
      const mql = window.matchMedia("(prefers-color-scheme: dark)")
      apply(mql.matches ? "dark" : "light")
      const onChange = (e: MediaQueryListEvent) => apply(e.matches ? "dark" : "light")
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    } else {
      apply(defaultTheme === "dark" ? "dark" : "light")
    }
  }, [attribute, defaultTheme, enableSystem, disableTransitionOnChange])

  return <>{children}</>
}
