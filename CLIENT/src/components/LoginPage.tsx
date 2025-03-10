"use client";

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Moon, Sun } from "lucide-react"
import { useRouter } from "next/navigation"

function LoginPage() {
  // Always start with light mode
  const [theme, setTheme] = useState('light')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          role: "USER"
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Save the token and redirect to the dashboard or home page
        localStorage.setItem("token", data.token)
        router.push("/dashboard")
      } else {
        setError(data.error || "An error occurred")
      }
    } catch (err) {
      setError("An error occurred")
    } finally {
      setIsLoading(false)
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
              <CardTitle className={`text-2xl font-bold tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>Sign in to your account</CardTitle>
              <CardDescription className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Enter your email and password to access your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive" className={theme === 'dark' ? 'bg-red-900 border-red-800 text-white' : ''}>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email" className={theme === 'dark' ? 'text-gray-200' : ''}>Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={isLoading}
                    required
                    className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className={theme === 'dark' ? 'text-gray-200' : ''}>Password</Label>
                    <a href="/forgot-password" className={`text-sm font-medium hover:underline ${
                      theme === 'dark' ? 'text-blue-400' : 'text-primary'
                    }`}>
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={isLoading}
                    required
                    className={theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : ''}
                  />
                </div>
                
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className={`w-full transition-colors ${
                    theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : ''
                  }`} 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
                <div className={`text-center text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Don't have an account?{" "}
                  <a href="/register" className={`font-medium hover:underline ${
                    theme === 'dark' ? 'text-blue-400' : 'text-primary'
                  }`}>
                    Create an account
                  </a>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default LoginPage