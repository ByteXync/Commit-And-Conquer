"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, KeyRound, CheckCircle2, User, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AdminSignUp() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    adminKey: "",
  })
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    adminKey: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
      valid = false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      valid = false
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
      valid = false
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
      valid = false
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      valid = false
    }

    if (!formData.adminKey.trim()) {
      newErrors.adminKey = "Admin key is required"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)
      try {
        const response = await fetch("http://localhost:8000/user/adminauth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            admin_code: formData.adminKey,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          console.log("Form submitted successfully:", data)
          setIsSuccess(true)
          setFormData({
            fullName: "",
            email: "",
            password: "",
            adminKey: "",
          })
        } else {
          const errorData = await response.json()
          console.error("Registration error:", errorData)
        }
      } catch (error) {
        console.error("Registration error:", error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Sign Up</h1>
          <p className="mt-2 text-gray-600">Create an admin account to access the dashboard</p>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center justify-center mb-2">
              <div className="rounded-full bg-blue-100 p-3">
                <User className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-xl font-semibold text-center text-gray-800">Create Admin Account</CardTitle>
            <CardDescription className="text-center text-gray-500">Enter your details to create an admin account</CardDescription>
          </CardHeader>

          {isSuccess ? (
            <CardContent className="flex flex-col items-center justify-center py-4 text-center">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold">Registration Successful!</h3>
              <p className="text-muted-foreground mt-2">Your admin account has been created successfully.</p>
              <Button className="mt-6" onClick={() => router.push("/admin/login")}>
                Navigate to Admin Login
              </Button>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {errors.email && (
                  <Alert variant="destructive" className="border border-red-200 bg-red-50">
                    <AlertDescription className="text-red-800">{errors.email}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-gray-700">Full Name</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="h-4 w-4 text-gray-500" />
                    </div>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`pl-10 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.fullName ? "border-red-500" : ""}`}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  {errors.fullName && (
                    <div className="flex items-center text-red-500 text-sm mt-1">
                      <span>{errors.fullName}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-500" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="admin@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`pl-10 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? "border-red-500" : ""}`}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center text-red-500 text-sm mt-1">
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-500" />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className={`pl-10 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? "border-red-500" : ""}`}
                      disabled={isSubmitting}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="flex items-center text-red-500 text-sm mt-1">
                      <span>{errors.password}</span>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">Password must be at least 8 characters long</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminKey" className="text-gray-700">Admin Key</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <KeyRound className="h-4 w-4 text-gray-500" />
                    </div>
                    <Input
                      id="adminKey"
                      name="adminKey"
                      type="password"
                      placeholder="Enter admin key"
                      value={formData.adminKey}
                      onChange={handleChange}
                      className={`pl-10 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.adminKey ? "border-red-500" : ""}`}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  {errors.adminKey && (
                    <div className="flex items-center text-red-500 text-sm mt-1">
                      <span>{errors.adminKey}</span>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
                <Button
                  type="submit"
                  className="w-full py-6 bg-blue-600 hover:bg-blue-700 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Admin Account..." : "Create Admin Account"}
                </Button>

                <div className="text-center text-sm mt-4 text-gray-600">
                  Already have an account?{" "}
                  <Link href="/admin/login" className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                    Log in
                  </Link>
                </div>
              </CardFooter>
            </form>
          )}
        </Card>

        <div className="mt-6 text-center text-xs text-gray-500">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
          {" "}and{" "}
          <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
        </div>
      </div>
    </div>
  )
}