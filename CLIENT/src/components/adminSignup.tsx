"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, KeyRound, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-500 to-blue-600 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-lg border border-gray-300 bg-white transition-transform hover:scale-105 duration-300">
        <CardHeader className="space-y-1 p-6">
          <CardTitle className="text-3xl font-bold text-center text-gray-800">Admin Sign Up</CardTitle>
          <CardDescription className="text-center text-gray-600">Create an admin account to access the dashboard</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold">Registration Successful!</h3>
              <p className="text-muted-foreground mt-2">Your admin account has been created successfully.</p>
              <Button className="mt-6 bg-teal-600 hover:bg-teal-700 text-white" onClick={() => router.push('/admin/login')}>
                Navigate to Admin Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="block text-gray-700">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`border ${errors.fullName ? "border-red-500" : "border-gray-300"} rounded-md p-2 transition duration-150 ease-in-out focus:ring-2 focus:ring-teal-500`}
                  />
                  {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="block text-gray-700">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md p-2 transition duration-150 ease-in-out focus:ring-2 focus:ring-teal-500`}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="block text-gray-700">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className={`border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md p-2 transition duration-150 ease-in-out focus:ring-2 focus:ring-teal-500`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                  <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminKey" className="block text-gray-700">Admin Key</Label>
                  <div className="relative">
                    <Input
                      id="adminKey"
                      name="adminKey"
                      type="password"
                      placeholder="Enter admin key"
                      value={formData.adminKey}
                      onChange={handleChange}
                      className={`border ${errors.adminKey ? "border-red-500" : "border-gray-300"} rounded-md p-2 transition duration-150 ease-in-out focus:ring-2 focus:ring-teal-500`}
                    />
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  {errors.adminKey && <p className="text-sm text-red-500">{errors.adminKey}</p>}
                </div>
              </div>
              <CardFooter className="flex justify-center">
                <Button type="submit" className={`w-full bg-teal-600 hover:bg-teal-700 text-white transition duration-300 ease-in-out ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isSubmitting}>
                  {isSubmitting ? "Creating Admin Account..." : "Create Admin Account"}
                </Button>
              </CardFooter>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
