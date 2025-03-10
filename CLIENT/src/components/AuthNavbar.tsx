"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Shield } from "lucide-react"

export default function AuthNavbar() {
  const pathname = usePathname()
  
  // Determine if we're on an admin page
  const isAdmin = pathname.includes('/admin')
  
  // Determine if we're on a login or register page
  const isLogin = pathname.includes('/login')
  
  return (
    <nav className="w-full bg-white shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            href="/" 
            className="flex items-center text-gray-700 hover:text-[#4199ff] transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            <span className="font-medium">Home</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 border-r pr-6 border-gray-200">
            <Link 
              href="/user/login" 
              className={`flex items-center px-3 py-1.5 rounded-md transition-colors ${
                !isAdmin ? 'bg-[#4199ff]/10 text-[#4199ff]' : 'text-gray-600 hover:text-[#4199ff]'
              }`}
            >
              <User className="h-4 w-4 mr-1.5" />
              <span className="text-sm font-medium">User</span>
            </Link>
            
            <Link 
              href="/admin/login" 
              className={`flex items-center px-3 py-1.5 rounded-md transition-colors ${
                isAdmin ? 'bg-[#4199ff]/10 text-[#4199ff]' : 'text-gray-600 hover:text-[#4199ff]'
              }`}
            >
              <Shield className="h-4 w-4 mr-1.5" />
              <span className="text-sm font-medium">Admin</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <Link 
              href={isAdmin ? "/admin/login" : "/user/login"} 
              className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
                isLogin ? 'bg-[#4199ff]/10 text-[#4199ff]' : 'text-gray-600 hover:text-[#4199ff]'
              }`}
            >
              Login
            </Link>
            
            <Link 
              href={isAdmin ? "/admin/register" : "/user/register"} 
              className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
                !isLogin ? 'bg-[#4199ff]/10 text-[#4199ff]' : 'text-gray-600 hover:text-[#4199ff]'
              }`}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 