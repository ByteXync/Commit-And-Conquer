"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { FileCode, Menu, Home, Briefcase, FileText, Calendar, Settings, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMobile } from "@/hooks/use-mobile"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null)

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse user data:", error)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/user/login"
  }

  const navItems = [
    { href: "/user/dashboard", label: "Dashboard", icon: Home },
    { href: "/user/jobs", label: "Find Jobs", icon: Briefcase },
    { href: "/user/blogs", label: "Career Blog", icon: FileText },
    { href: "/user/dashboard?tab=applications", label: "Applications", icon: Briefcase },
    { href: "/user/dashboard?tab=interviews", label: "Interviews", icon: Calendar },
    { href: "/user/settings", label: "Settings", icon: Settings },
  ]

  const NavLinks = () => (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
              isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        )
      })}
    </>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="flex h-full flex-col">
              <div className="flex h-14 items-center border-b px-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                  <FileCode className="h-5 w-5" />
                  <span>Commit & Conquer</span>
                </Link>
              </div>
              <nav className="grid gap-2 p-4">
                <NavLinks />
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </Button>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-2 md:gap-4">
          <Link href="/" className="hidden md:flex items-center gap-2 font-bold text-lg">
            <FileCode className="h-5 w-5" />
            <span>Commit & Conquer</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <Avatar>
              <AvatarImage src="" alt={user?.name || "User"} />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r md:flex md:flex-col">
          <nav className="grid gap-2 p-4">
            <NavLinks />
            <Button
              variant="ghost"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </nav>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

