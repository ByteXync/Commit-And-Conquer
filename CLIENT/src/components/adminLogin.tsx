"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [adminKey, setAdminKey] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (!username || !password) {
      setError("Please enter both username and password")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Login submitted:", { username, password, adminKey })
      setIsLoading(false)
      setError("")
      // Handle successful login here
    } catch (err) {
      setIsLoading(false)
      setError("Invalid credentials")
      console.error("Login error:", err)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-2xl rounded-lg border border-gray-300 bg-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight text-gray-800 text-center">Admin Sign In</CardTitle>
          <CardDescription className="text-center text-gray-600">Enter your credentials to access the admin panel</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-red-100 border border-red-200 text-red-600">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="username" className="font-semibold text-gray-700">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                disabled={isLoading}
                required
                className="border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-semibold text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
                required
                className="border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-key" className="font-semibold text-gray-700">Admin Key</Label>
              <Input
                id="admin-key"
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter admin key"
                disabled={isLoading}
                className="border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className={`bg-green-600 hover:bg-green-700 text-white font-semibold w-full transition duration-150 ease-in-out ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
            <div className="flex justify-between w-full text-sm text-gray-500">
              <a href="/forgot-password" className="hover:underline hover:text-green-600 transition duration-200">Forgot password?</a>
              <a href="/register" className="hover:underline hover:text-green-600 transition duration-200">Request admin access</a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default AdminLoginPage;