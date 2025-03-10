"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase, FileText, LogOut, Newspaper } from "lucide-react"

export function BasicSidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/internships", label: "Internships", icon: <Briefcase className="h-5 w-5" /> },
    { href: "/blogs", label: "Blogs", icon: <Newspaper className="h-5 w-5" /> },
    { href: "/resume", label: "Resume", icon: <FileText className="h-5 w-5" /> },
  ]

  return (
    <div className="h-full w-64 bg-gray-900 text-white flex flex-col justify-between border-r px-6 py-8 shadow-lg">
      {/* Brand Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold tracking-wide text-white">Dashboard</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-4 p-3 rounded-lg text-lg font-medium transition-all hover:scale-105 transform ${
                  pathname === item.href
                    ? "bg-gray-700 text-teal-400 shadow-md"
                    : "text-gray-300 hover:bg-gray-800 hover:text-teal-400"
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="mb-6">
        <button className="flex items-center gap-4 w-full p-3 text-lg font-medium text-red-500 hover:bg-red-700 hover:text-white rounded-lg transition-all">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
