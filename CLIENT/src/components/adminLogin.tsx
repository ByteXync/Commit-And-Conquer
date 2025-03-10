"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, KeyRound, CheckCircle2, AlertCircle, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminSignUp() {
  const router = useRouter()
  const [theme, setTheme] = useState('light')
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

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

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
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters"
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
          setErrors((prev) => ({
            ...prev,
            email: errorData.error || "An error occurred during registration"
          }))
        }
      } catch (error) {
        console.error("Registration error:", error)
        setErrors((prev) => ({
          ...prev,
          email: "An error occurred while connecting to the server"
        }))
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ease-in-out ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-br from-blue-50 to-white text-gray-800'
    }`}>
      <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen">
        {/* Header with Navigation and Theme Toggle */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.push('/')}
              className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}
            >
              Home
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.push('/login')}
              className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}
            >
              User Login
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.push('/admin/login')}
              className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}
            >
              Admin Login
            </Button>
          </div>

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
              }`}>Admin Sign Up</CardTitle>
              <CardDescription className={`text-center ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>Create an admin account to access the dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-4 text-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                  <h3 className={`text-xl font-semibold ${
                    theme === 'dark' ? 'text-white' : ''
                  }`}>Registration Successful!</h3>
                  <p className={theme === 'dark' ? 'text-gray-300 mt-2' : 'text-muted-foreground mt-2'}>
                    Your admin account has been created successfully.
                  </p>
                  <Button 
                    className={`mt-6 ${
                      theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : ''
                    }`} 
                    onClick={() => router.push('/admin/login')}>
                    Navigate to Admin Login
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
                      placeholder="admin@example.com"
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
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className={`${errors.password ? "border-red-500" : ""} ${
                          theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''
                        } pr-10`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}
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
                    <p className={`text-xs mt-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'
                    }`}>
                      Password must be at least 8 characters long
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="adminKey" className={theme === 'dark' ? 'text-gray-200' : ''}>
                      Admin Key
                    </Label>
                    <div className="relative">
                      <Input
                        id="adminKey"
                        name="adminKey"
                        type={showAdminKey ? "text" : "password"}
                        placeholder="Enter admin key"
                        value={formData.adminKey}
                        onChange={handleChange}
                        className={`${errors.adminKey ? "border-red-500" : ""} ${
                          theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''
                        } pl-10 pr-10`}
                      />
                      <KeyRound className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <button
                        type="button"
                        onClick={() => setShowAdminKey(!showAdminKey)}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}
                        aria-label={showAdminKey ? "Hide admin key" : "Show admin key"}
                      >
                        {showAdminKey ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.adminKey && (
                      <div className="flex items-center text-red-500 text-sm mt-1">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span>{errors.adminKey}</span>
                      </div>
                    )}
                  </div>
                </form>
              )}
            </CardContent>
            {!isSuccess && (
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  className={`w-full ${
                    theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : ''
                  }`} 
                  type="submit" 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Admin Account..." : "Create Admin Account"}
                </Button>
                <p className={`text-center text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Already have an admin account?{" "}
                  <Link 
                    href="/admin/login" 
                    className={`underline font-medium ${
                      theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    Login
                  </Link>
                </p>
                <p className={`text-center text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  By signing up, you agree to our{" "}
                  <Link 
                    href="/terms" 
                    className={`underline ${
                      theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'
                    }`}
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link 
                    href="/privacy" 
                    className={`underline ${
                      theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'
                    }`}
                  >
                    Privacy Policy
                  </Link>
                </p>
              </CardFooter>
            )}
          </Card>
        </div>

        <footer className={`py-6 text-center text-sm ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </footer>
      </div>
    </div>
  )
}