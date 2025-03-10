"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, KeyRound, CheckCircle2, User, Mail, Shield, AlertCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

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
    <div className="flex justify-center items-center min-h-[calc(100vh-72px)] bg-gradient-to-br from-gray-100 to-blue-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#4199ff]/20 backdrop-blur-sm mb-4">
            <Shield className="h-8 w-8 text-[#4199ff]" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Admin Registration</h2>
          <p className="text-gray-600">Create an admin account with special privileges</p>
        </div>
        
        <Card className="w-full shadow-xl border border-gray-200/30 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-2 border-b border-gray-200/30">
            <CardTitle className="text-2xl font-bold text-center text-gray-900">Admin Sign Up</CardTitle>
            <CardDescription className="text-center text-gray-600">Create an admin account to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-10 w-10 text-[#4199ff]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Registration Successful!</h3>
                <p className="text-gray-600 mt-2 mb-6">Your admin account has been created successfully.</p>
                <Button 
                  className="bg-[#4199ff] hover:bg-blue-600 text-white font-medium transition-colors py-6 px-8" 
                  onClick={() => router.push('/admin/login')}
                >
                  Go to Admin Login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`pl-10 py-6 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#4199ff] focus:ring-[#4199ff] ${errors.fullName ? "border-red-500" : ""}`}
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
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="admin@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={`pl-10 py-6 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#4199ff] focus:ring-[#4199ff] ${errors.email ? "border-red-500" : ""}`}
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
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className={`pl-10 pr-10 py-6 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#4199ff] focus:ring-[#4199ff] ${errors.password ? "border-red-500" : ""}`}
                      />
                      <Eye className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 ${showPassword ? 'hidden' : 'block'}`} />
                      <EyeOff className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 ${showPassword ? 'block' : 'hidden'}`} />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#4199ff]"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && (
                      <div className="flex items-center text-red-500 text-sm mt-1">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span>{errors.password}</span>
                      </div>
                    )}
                    <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="adminKey" className="text-sm font-medium text-gray-700">Admin Key</Label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="adminKey"
                        name="adminKey"
                        type="password"
                        placeholder="Enter admin key"
                        value={formData.adminKey}
                        onChange={handleChange}
                        className={`pl-10 py-6 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#4199ff] focus:ring-[#4199ff] ${errors.adminKey ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.adminKey && (
                      <div className="flex items-center text-red-500 text-sm mt-1">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span>{errors.adminKey}</span>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-6 bg-[#4199ff] hover:bg-blue-600 text-white font-medium transition-colors py-6" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Admin Account..." : "Create Admin Account"}
                  </Button>
                  
                  <div className="text-center text-sm pt-2">
                    Already have an admin account?{" "}
                    <Link href="/admin/login" className="font-medium text-[#4199ff] hover:text-blue-700 hover:underline transition-colors">
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
