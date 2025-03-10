"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2, Moon, Sun } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  // Always start with light mode
  const [theme, setTheme] = useState('light')
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
  
  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

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
    <div className={`min-h-screen transition-colors duration-300 ease-in-out ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-br from-blue-50 to-white text-gray-800'
    }`}>
      <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen">
        {/* Header with Improved Theme Toggle */}
        <header className="flex justify-end mb-8">
          <div className="relative bg-gray-200 dark:bg-gray-700 rounded-full p-1 shadow-md">
            <div 
              className={`absolute top-1 transition-transform duration-300 ease-in-out rounded-full bg-white dark:bg-gray-800 w-8 h-8 shadow-sm ${
                theme === 'dark' ? 'translate-x-full' : 'translate-x-0'
              }`}
            />
            <div className="flex">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setTheme('light')}
                className={`z-10 rounded-full p-2 transition-all duration-300 ${
                  theme === 'light' ? 'text-yellow-600' : 'text-gray-400'
                }`}
                aria-label="Switch to light mode"
              >
                <Sun className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setTheme('dark')}
                className={`z-10 rounded-full p-2 transition-all duration-300 ${
                  theme === 'dark' ? 'text-blue-300' : 'text-gray-400'
                }`}
                aria-label="Switch to dark mode"
              >
                <Moon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-grow flex items-center justify-center">
          <Card className={`w-full max-w-md shadow-lg transition-all duration-300 ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
          }`}>
            <CardHeader className="space-y-1">
              <CardTitle className={`text-2xl font-bold text-center ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>Create an account</CardTitle>
              <CardDescription className={`text-center ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>Enter your details below to create your account</CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-4 text-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                  <h3 className={`text-xl font-semibold ${
                    theme === 'dark' ? 'text-white' : ''
                  }`}>Registration Successful!</h3>
                  <p className={theme === 'dark' ? 'text-gray-300 mt-2' : 'text-muted-foreground mt-2'}>
                    Your account has been created successfully.
                  </p>
                  <Button 
                    className={`mt-6 ${
                      theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : ''
                    }`} 
                    onClick={() => {router.push('/login')}}>
                    Navigate to Login Page
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className={theme === 'dark' ? 'text-gray-200' : ''}>
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`${errors.fullName ? "border-red-500" : ""} ${
                        theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''
                      }`}
                    />
                    {errors.fullName && (
                      <div className="flex items-center text-red-500 text-sm mt-1">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span>{errors.fullName}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className={theme === 'dark' ? 'text-gray-200' : ''}>
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`${errors.email ? "border-red-500" : ""} ${
                        theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''
                      }`}
                    />
                    {errors.email && (
                      <div className="flex items-center text-red-500 text-sm mt-1">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className={theme === 'dark' ? 'text-gray-200' : ''}>
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className={`${errors.password ? "border-red-500" : ""} ${
                        theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''
                      }`}
                    />
                    {errors.password && (
                      <div className="flex items-center text-red-500 text-sm mt-1">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span>{errors.password}</span>
                      </div>
                    )}
                    <p className={`text-xs mt-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'
                    }`}>
                      Password must be at least 8 characters long
                    </p>
                  </div>
                </form>
              )}
            </CardContent>
            {!isSuccess && (
              <CardFooter>
                <Button 
                  className={`w-full ${
                    theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : ''
                  }`} 
                  type="submit" 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Sign Up"}
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}