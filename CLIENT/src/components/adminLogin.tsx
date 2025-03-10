"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

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
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Handle successful login
      router.push('/dashboard')
    } catch (error) {
      console.error("Login error:", error)
      setErrors((prev) => ({
        ...prev,
        email: "Invalid email or password"
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
          <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Welcome Back</CardTitle>
          <CardDescription className="text-center text-gray-500 text-base">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="px-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
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
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-700">
                  Forgot password?
                </a>
              </div>
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
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
        <div className="text-center text-gray-500 text-xs pb-6 px-8 mt-4">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:text-blue-800 font-medium">Sign up</a>
        </div>
      </Card>
    </div>
  )
}