
// BasicSidebar.js
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase, FileText, LogOut, Newspaper, User } from "lucide-react"

export function BasicSidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white shadow-lg">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 bg-gray-800 border-b border-gray-700">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <div className="flex items-center p-4 border-b border-gray-700">
          <User className="h-8 w-8 mr-2" />
          <span className="font-semibold">User Name</span>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/internships" className={`flex items-center gap-2 p-2 rounded-md transition-all duration-200 ease-in-out ${pathname === "/internships" ? "bg-gray-700 text-blue-300" : "hover:bg-gray-700 hover:scale-105"}`}>
                <Briefcase className="h-5 w-5" />
                <span>Internships</span>
              </Link>
            </li>
            <li>
              <Link href="/blogs" className={`flex items-center gap-2 p-2 rounded-md transition-all duration-200 ease-in-out ${pathname === "/blogs" ? "bg-gray-700 text-blue-300" : "hover:bg-gray-700 hover:scale-105"}`}>
                <Newspaper className="h-5 w-5" />
                <span>Blogs</span>
              </Link>
            </li>
            <li>
              <Link href="/resume" className={`flex items-center gap-2 p-2 rounded-md transition-all duration-200 ease-in-out ${pathname === "/resume" ? "bg-gray-700 text-blue-300" : "hover:bg-gray-700 hover:scale-105"}`}>
                <FileText className="h-5 w-5" />
                <span>Resume</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <button className="flex items-center gap-2 w-full p-2 rounded-md bg-red-600 text-white hover:bg-red-500 transition-all duration-200 ease-in-out transform hover:scale-105">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}

