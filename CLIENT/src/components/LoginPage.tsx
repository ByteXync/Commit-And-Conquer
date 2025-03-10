"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg border-0 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <CardHeader className="space-y-2 pb-6 pt-8">
          <CardTitle className="text-3xl font-bold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Welcome Back</CardTitle>
          <CardDescription className="text-center text-gray-500 text-base">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5 px-8">
            {error && (
              <Alert variant="destructive" className="border-red-400 bg-red-50 text-red-600 rounded-lg">
                <AlertDescription className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-12 h-12 rounded-lg transition-all duration-200 ring-offset-2 focus:ring-2 focus:ring-blue-500 border-gray-200"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <a href="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-12 h-12 rounded-lg transition-all duration-200 ring-offset-2 focus:ring-2 focus:ring-blue-500 border-gray-200"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-5 pt-2 pb-6 px-8">
            <Button 
              type="submit" 
              className="w-full h-12 rounded-lg font-medium transition-all hover:shadow-md text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
            <div className="text-center text-gray-500 text-sm">
              Don't have an account?{" "}
              <a href="/user/register" className="font-medium text-blue-600 hover:text-blue-800 transition-colors">
                Create an account
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default LoginPage