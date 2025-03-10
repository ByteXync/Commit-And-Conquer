"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase, FileText, LogOut, Newspaper } from "lucide-react"

export function BasicSidebar() {
  const pathname = usePathname()
  console.log("Current Path:", pathname) // Debugging

  return (
    <div className="fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/admin/internships" className={`flex items-center gap-2 p-2 rounded-md ${pathname === "/internships" ? "bg-gray-700" : "hover:bg-gray-700"}`}>
                <Briefcase className="h-5 w-5" />
                <span>Internships</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/blogs" className={`flex items-center gap-2 p-2 rounded-md ${pathname === "/blogs" ? "bg-gray-700" : "hover:bg-gray-700"}`}>
                <Newspaper className="h-5 w-5" />
                <span>Blogs</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/resume" className={`flex items-center gap-2 p-2 rounded-md ${pathname === "/resume" ? "bg-gray-700" : "hover:bg-gray-700"}`}>
                <FileText className="h-5 w-5" />
                <span>Resume</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <button className="flex items-center gap-2 w-full p-2 rounded-md text-red-500 hover:bg-gray-700">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}
