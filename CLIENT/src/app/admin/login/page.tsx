import Link from "next/link"
import Image from "next/image"
import { AuthForm } from "@/components/forms/login-form"
import { ThemeToggle } from "@/components/theme-toggle"
import { ThemeToggleButton } from "@/components/theme-toggle-button"

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Form */}
      <div className="flex flex-col justify-center p-4 sm:p-6 lg:p-8 xl:p-12 bg-background">
        <div className="mx-auto w-full max-w-md">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
                A
              </div>
              <span className="font-bold">Admin Portal</span>
            </Link>
            <ThemeToggle />
          </div>
          <div className="space-y-2 mb-8 text-center">
            <h1 className="text-3xl font-bold">Admin Access</h1>
            <p className="text-muted-foreground">Sign in to access the admin dashboard</p>
          </div>
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <AuthForm isAdmin />
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block relative bg-muted">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
        <Image src="/vercel.svg?height=1080&width=1920" alt="Admin Login" fill className="object-cover" priority />
        <div className="relative z-10 flex flex-col justify-end h-full p-8 xl:p-12">
          <div className="max-w-md bg-background/80 backdrop-blur-sm p-6 rounded-xl border shadow-lg">
            <blockquote className="space-y-2">
              <p className="text-lg">
                "The admin dashboard provides powerful tools for managing our entire platform efficiently."
              </p>
              <footer className="text-sm font-medium">Michael Johnson, System Administrator</footer>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Floating Theme Toggle Button */}
      <ThemeToggleButton />
    </div>
  )
}

