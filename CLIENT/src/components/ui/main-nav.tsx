"use client"

import type React from "react"
import Link from "next/link"
import { Home, User, Activity, Briefcase } from "lucide-react"

interface NavItem {
  href: string
  label: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/user/profile", label: "Profile", icon: User },
  { href: "/activity", label: "Activity", icon: Activity },
  { href: "/projects", label: "Projects", icon: Briefcase },
]

const MainNav: React.FC = () => {
  return (
    <nav className="bg-background/80 backdrop-blur-sm border-b p-4">
      <ul className="flex space-x-4">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MainNav

