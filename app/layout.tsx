import type React from "react"
import { Suspense } from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { getAllCategories } from "@/lib/db"
import { Analytics } from "@vercel/analytics/react"
import { SkipToContent } from "@/components/skip-to-content"
import { SidebarProvider } from "@/components/sidebar-context"
import Image from "next/image"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lingyi Zhou Portfolio",
  description: "My personal portfolio showcasing my projects",
  generator: "v0.dev",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const categories = await getAllCategories()

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body suppressHydrationWarning className={`${inter.className} antialiased min-h-screen bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          <SidebarProvider>
            <SkipToContent />
            {/* Background image wrapper */}
            <div className="background-wrapper">
              <Image
                src="https://github.com/reatured/public-assets/blob/main/background-image/upscalemedia-transformed.jpg?raw=true"
                alt="Dark room with teal light"
                fill
                priority
                className="background-image"
              />
            </div>
            <div className="flex min-h-screen flex-col md:flex-row">
              <Suspense
                fallback={
                  <div className="w-full md:w-72 border-r border-border bg-card bg-opacity-80 backdrop-blur-md flex-shrink-0 h-screen"></div>
                }
              >
                <Sidebar categories={categories} />
              </Suspense>
              <main id="main-content" className="flex-1 overflow-auto">
                {children}
              </main>
            </div>
          </SidebarProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

import "./globals.css"
