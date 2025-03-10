import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { SonnerProvider } from "@/components/sonner-provider"
import { ThemeToggleButton } from "@/components/theme-toggle-button"
import { AuthProvider } from "@/lib/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}