"use client"

import { useMemo } from "react"

type WhatsAppFabProps = {
  phone?: string // E.164 format, e.g., "919876543210"
  message?: string
  className?: string
}

export default function WhatsAppFab({
  phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "",
  message = "Hi, I came from your portfolio website and would like to chat!",
  className = "",
}: WhatsAppFabProps) {
  const sanitizedPhone = useMemo(() => (phone || "").replace(/[^\d]/g, ""), [phone])
  const href = useMemo(() => {
    if (!sanitizedPhone) return "#"
    return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(message)}`
  }, [sanitizedPhone, message])

  const disabled = useMemo(() => !sanitizedPhone, [sanitizedPhone])

  return (
    <div className="fixed z-50 right-4 bottom-4 md:right-6 md:bottom-6">
      {/* Animated ripple effect background */}
      <div className="absolute inset-0 animate-ping">
        <div className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-cyan-400 opacity-20"></div>
      </div>
      
      {/* Secondary pulse effect */}
      <div className="absolute inset-0 animate-pulse">
        <div className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-teal-400 opacity-25"></div>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        aria-disabled={disabled}
        title={disabled ? "Set NEXT_PUBLIC_WHATSAPP_PHONE in .env.local to enable WhatsApp chat" : "Chat on WhatsApp"}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault()
            alert(
              "Please set NEXT_PUBLIC_WHATSAPP_PHONE in .env.local (E.164 format, e.g., 919876543210) to enable WhatsApp chat.",
            )
          }
        }}
        className={[
          "relative group",
          "h-12 w-12 md:h-14 md:w-14 rounded-full",
          "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900",
          "hover:from-slate-600 hover:via-slate-700 hover:to-slate-800",
          "text-cyan-400 hover:text-cyan-300",
          "shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30",
          "ring-2 ring-cyan-500/30 hover:ring-cyan-400/50",
          "backdrop-blur-sm border border-slate-600/50 hover:border-cyan-500/50",
          "transition-all duration-300 ease-out",
          disabled 
            ? "opacity-60 cursor-not-allowed grayscale" 
            : "hover:scale-110 active:scale-95 focus-visible:scale-110",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-500/50",
          "grid place-items-center",
          "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-cyan-400/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
          className,
        ].join(" ")}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-15 blur-xl transition-opacity duration-300"></div>
        
        {/* WhatsApp logo with better styling */}
        <svg 
          aria-hidden="true" 
          width="28" 
          height="28" 
          viewBox="0 0 32 32" 
          className="md:h-8 md:w-8 relative z-10 drop-shadow-sm transition-transform duration-300 group-hover:scale-110" 
          fill="currentColor"
        >
          <path d="M19.11 17.24c-.29-.15-1.68-.83-1.94-.92-.26-.1-.45-.15-.64.15-.19.29-.74.91-.9 1.1-.17.19-.33.22-.62.08-.29-.15-1.23-.45-2.35-1.44-.87-.77-1.46-1.72-1.63-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.33.43-.49.15-.17.19-.29.29-.49.1-.19.05-.37-.02-.52-.08-.15-.64-1.54-.88-2.11-.23-.55-.47-.47-.64-.47-.17 0-.37-.02-.56-.02s-.52.07-.79.37c-.26.29-1.01.98-1.01 2.4 0 1.42 1.03 2.79 1.18 2.98.15.19 2.03 3.1 4.9 4.35.69.3 1.24.48 1.66.62.7.22 1.34.19 1.84.12.56-.08 1.68-.69 1.91-1.36.24-.67.24-1.24.17-1.36-.06-.12-.23-.19-.52-.33z" />
          <path d="M26.62 5.36A12.57 12.57 0 0 0 16.07 1C8.7 1 2.7 6.98 2.7 14.36c0 2.35.62 4.66 1.8 6.69L2 31l10.19-2.67c1.96 1.07 4.17 1.63 6.44 1.63 7.37 0 13.37-5.98 13.37-13.36 0-3.57-1.39-6.93-3.79-9.24zM18.63 27.1c-1.99 0-3.93-.53-5.63-1.53l-.4-.24-6.04 1.58 1.62-5.88-.26-.41a11.58 11.58 0 0 1-1.78-6.27c0-6.43 5.24-11.66 11.67-11.66 3.12 0 6.05 1.22 8.26 3.43a11.6 11.6 0 0 1 3.42 8.24c0 6.43-5.24 11.66-11.66 11.66z" />
        </svg>

        {/* Notification dot for added attraction */}
        {!disabled && (
          <div className="absolute -top-1 -right-1 h-3 w-3 md:h-4 md:w-4 bg-cyan-400 rounded-full border-2 border-slate-800 animate-bounce shadow-lg shadow-cyan-400/50">
            <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
          </div>
        )}
      </a>
    </div>
  )
}