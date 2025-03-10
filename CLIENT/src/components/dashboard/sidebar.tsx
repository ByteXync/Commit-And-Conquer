"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Briefcase,
  Building2,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Newspaper,
  Settings,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarProps {
  isAdmin?: boolean
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isAdmin = false, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  const adminLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/content", label: "Content", icon: FileText },
    { href: "/admin/organizations", label: "Organizations", icon: Building2 },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  const userLinks = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/internships", label: "Internships", icon: Briefcase },
    { href: "/blogs", label: "Blogs", icon: Newspaper },
    { href: "/resume", label: "Resume", icon: FileText },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  const links = isAdmin ? adminLinks : userLinks

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transition-transform duration-300 ease-in-out transform lg:translate-x-0 lg:static lg:w-64",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link href={isAdmin ? "/admin/dashboard" : "/dashboard"} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
              {isAdmin ? "A" : "U"}
            </div>
            <span className="font-bold">{isAdmin ? "Admin Portal" : "User Portal"}</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="px-2 space-y-1">
            {links.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </nav>
        </ScrollArea>
        <div className="p-4 border-t">
          <Button
            variant="outline"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span>Log out</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

