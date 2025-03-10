"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase, FileText, LogOut, Newspaper, LayoutDashboard, Settings, Bell, Upload, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function BasicSidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-y-0 left-0 z-30 w-64 bg-background border-r shadow-sm">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">InternHub</h1>
          </Link>
        </div>
        <nav className="flex-1 p-4 overflow-auto">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase px-2">Main</h2>
              <div className="space-y-1">
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-2 p-2 rounded-md ${
                    pathname === "/dashboard" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                  }`}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/internships"
                  className={`flex items-center gap-2 p-2 rounded-md ${
                    pathname === "/internships" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                  }`}
                >
                  <Briefcase className="h-5 w-5" />
                  <span>Internships</span>
                </Link>
                <Link
                  href="/blogs"
                  className={`flex items-center gap-2 p-2 rounded-md ${
                    pathname === "/blogs" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                  }`}
                >
                  <Newspaper className="h-5 w-5" />
                  <span>Blogs</span>
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase px-2">Resume</h2>
              <div className="space-y-1">
                <Link
                  href="/resume/upload"
                  className={`flex items-center gap-2 p-2 rounded-md ${
                    pathname === "/resume/upload" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                  }`}
                >
                  <Upload className="h-5 w-5" />
                  <span>Upload Resume</span>
                </Link>
                <Link
                  href="/resume/view"
                  className={`flex items-center gap-2 p-2 rounded-md ${
                    pathname === "/resume/view" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                  }`}
                >
                  <FileText className="h-5 w-5" />
                  <span>View Resume</span>
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase px-2">Account</h2>
              <div className="space-y-1">
                <Link
                  href="/profile"
                  className={`flex items-center gap-2 p-2 rounded-md ${
                    pathname === "/profile" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/settings"
                  className={`flex items-center gap-2 p-2 rounded-md ${
                    pathname === "/settings" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
                <Link
                  href="/notifications"
                  className={`flex items-center gap-2 p-2 rounded-md ${
                    pathname === "/notifications" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                  }`}
                >
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Student</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
