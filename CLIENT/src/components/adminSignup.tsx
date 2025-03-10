"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, CheckCircle2, ShieldCheck } from "lucide-react"

export default function AdminSignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showAdminKey, setShowAdminKey] = useState(false)
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
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsSuccess(true)
        setFormData({
          fullName: "",
          email: "",
          password: "",
          adminKey: "",
        })
      } catch (error) {
        console.error("Registration error:", error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
        </div>

        <Card className="border-0 shadow-lg dark:bg-gray-800">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold tracking-tight text-center">Admin Sign Up</CardTitle>
            <CardDescription className="text-center">Create an account to access the admin panel</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              {isSuccess && (
                <div className="alert alert-success">
                  <CheckCircle2 className="mr-2" />
                  Account created successfully! Please log in.
                </div>
              )}
              {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key} className="text-sm font-medium capitalize">{key}</Label>
                  <Input
                    id={key}
                    name={key}
                    type={key === "password" ? (showPassword ? "text" : "password") : "text"}
                    value={value}
                    onChange={handleChange}
                    placeholder={`Enter your ${key}`}
                    disabled={isSubmitting}
                    className="h-11 dark:bg-gray-700"
                  />
                  {key === "password" && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  )}
                  {key === "adminKey" && (
                    <button
                      type="button"
                      onClick={() => setShowAdminKey(!showAdminKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      {showAdminKey ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  )}
                  {errors[key as keyof typeof errors] && (
                    <div className="text-red-600 text-xs mt-1">
                      {errors[key as keyof typeof errors]}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-2 pb-6">
              <Button type="submit" className="w-full h-11 font-medium" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Sign Up"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © 2025 Company Name. All rights reserved.
        </p>
      </div>
    </div>
  )
}
