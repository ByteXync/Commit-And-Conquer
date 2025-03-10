"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2, Mail, User, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg border-0 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <CardHeader className="space-y-2 pb-6 pt-8">
          <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Join Us</CardTitle>
          <CardDescription className="text-center text-gray-500 text-base">Enter your details below to create your account</CardDescription>
        </CardHeader>
        <CardContent className="px-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Registration Successful!</h3>
              <p className="text-gray-500 mt-3 max-w-xs mx-auto">Your account has been created successfully. You can now log in with your credentials.</p>
              <Button 
                className="mt-8 w-full max-w-xs h-12 rounded-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300" 
                onClick={() => {router.push('/login')}}
              >
                Navigate to Login Page
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`pl-12 h-12 rounded-lg transition-all duration-200 ring-offset-2 focus:ring-2 focus:ring-blue-500 ${
                      errors.fullName ? "border-red-500 focus:ring-red-500" : "border-gray-200"
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <div className="flex items-center text-red-500 text-sm mt-1">
                    <span className="mr-1">•</span> {errors.fullName}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-12 h-12 rounded-lg transition-all duration-200 ring-offset-2 focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-200"
                    }`}
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center text-red-500 text-sm mt-1">
                    <span className="mr-1">•</span> {errors.email}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={`pl-12 h-12 rounded-lg transition-all duration-200 ring-offset-2 focus:ring-2 focus:ring-blue-500 ${
                      errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-200"
                    }`}
                  />
                </div>
                {errors.password && (
                  <div className="flex items-center text-red-500 text-sm mt-1">
                    <span className="mr-1">•</span> {errors.password}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
              </div>
              
              <CardFooter className="px-0 pb-0 pt-4">
                <Button 
                  className="w-full h-12 rounded-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-base" 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </CardFooter>
            </form>
          )}
        </CardContent>
        <div className="text-center text-gray-500 text-xs pb-6 px-8">
          Already have an account? <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">Sign in</a>
        </div>
      </Card>
    </div>
  )
}