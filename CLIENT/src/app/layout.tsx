import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { SonnerProvider } from "@/components/sonner-provider"
import { ThemeToggleButton } from "@/components/theme-toggle-button"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Modern Web Platform",
  description: "A modern web platform with Admin and User portals",
  keywords: ["web platform", "admin portal", "user portal", "dashboard"],
  authors: [{ name: "Your Company" }],
  creator: "Your Company",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Modern Web Platform",
    description: "A modern web platform with Admin and User portals",
    siteName: "Modern Web Platform",
  },
  twitter: {
    card: "summary_large_image",
    title: "Modern Web Platform",
    description: "A modern web platform with Admin and User portals",
    creator: "@yourcompany",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <ThemeProvider defaultTheme="system" storageKey="theme-preference">
          {children}
          <SonnerProvider />
          <Analytics />
          <ThemeToggleButton />
        </ThemeProvider>
      </body>
    </html>
  )
}