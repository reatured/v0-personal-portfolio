import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar, ClientSidebar } from "@/components/sidebar"
import { getAllCategories } from "@/lib/db"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lingyi Zhou - Portfolio",
  description: "Personal portfolio showcasing my projects and skills",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const categories = await getAllCategories()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex min-h-screen">
            {/* Server-side rendered sidebar for SEO */}
            <Sidebar />

            {/* Client-side sidebar for interactivity */}
            <ClientSidebar categories={categories} />

            {/* Main content area with proper left margin to avoid overlap */}
            <main className="flex-1 md:ml-64 min-h-screen">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'