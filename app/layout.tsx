import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "../src/app/globals.css"
import { ThemeProvider } from "../src/components/theme-provider"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Bhavishy | Web Developer & UI/UX Designer",
  description: "Portfolio website of Bhavishy Rajak, a web developer and UI/UX designer",
  icons: {
    icon: "/favicon.png", // 
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
