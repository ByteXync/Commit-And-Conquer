"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2, User, Mail, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
      isValid = false
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters"
      isValid = false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
      isValid = false
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("http://localhost:8000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: "USER",
        }),
      })

      if (response.ok) {
        // Handle successful signup
        setIsSuccess(true)

        // Reset form after successful submission
        setFormData({
          fullName: "",
          email: "",
          password: "",
        })
      } else {
        const data = await response.json()
        setErrors((prev) => ({
          ...prev,
          email: data.error || "An error occurred",
        }))
      }
    } catch (error) {
      console.error("Signup error:", error)
      setErrors((prev) => ({
        ...prev,
        email: "An error occurred",
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
          <p className="mt-2 text-gray-600">Join us and get started today</p>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center justify-center mb-2">
              <div className="rounded-full bg-blue-100 p-3">
                <User className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-xl font-semibold text-center text-gray-800">Sign up for an account</CardTitle>
            <CardDescription className="text-center text-gray-500">Enter your details to create your account</CardDescription>
          </CardHeader>

          {isSuccess ? (
            <CardContent className="flex flex-col items-center justify-center py-4 text-center">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold">Registration Successful!</h3>
              <p className="text-muted-foreground mt-2">Your account has been created successfully.</p>
              <Button className="mt-6" onClick={() => router.push("/login")}>
                Navigate to Login Page
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
                      <AlertCircle className="h-4 w-4 mr-1" />
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
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`pl-10 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? "border-red-500" : ""}`}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center text-red-500 text-sm mt-1">
                      <AlertCircle className="h-4 w-4 mr-1" />
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
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className={`pl-10 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? "border-red-500" : ""}`}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  {errors.password && (
                    <div className="flex items-center text-red-500 text-sm mt-1">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span>{errors.password}</span>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">Password must be at least 8 characters long</p>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
                <Button
                  type="submit"
                  className="w-full py-6 bg-blue-600 hover:bg-blue-700 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Sign Up"}
                </Button>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="bg-white" type="button">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="bg-white" type="button">
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
                <div className="text-center text-sm mt-4 text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors">
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