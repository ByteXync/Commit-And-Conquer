"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Shield, User, Lock, Key, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [adminKey, setAdminKey] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()

    // Reset error state
    setError("")

    // Validate form
    if (!username || !password) {
      setError("Please enter both username and password")
      return
    }

    // Show loading state
    setIsLoading(true)

    try {
      // This is where you would typically make an API call to authenticate
      const response = await fetch('http://localhost:8000/user/adminauth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, admin_code: adminKey }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("admin-token", data.token);
        router.push('/admin/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Invalid credentials");
      }
    } catch (err) {
      // Handle login error
      setIsLoading(false)
      setError("Authentication failed. Please try again.")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#4199ff]/20 backdrop-blur-sm mb-4">
            <Shield className="h-8 w-8 text-[#4199ff]" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Admin Portal</h2>
          <p className="text-gray-600">Sign in to access the admin dashboard</p>
        </div>
        
        <Card className="w-full shadow-xl border border-gray-200/30 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-2 border-b border-gray-200/30">
            <CardTitle className="text-2xl font-bold tracking-tight text-center text-gray-900">Admin Sign In</CardTitle>
            <CardDescription className="text-center text-gray-600">Enter your credentials to access the admin panel</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-4">
              {error && (
                <Alert variant="destructive" className="border-red-300 bg-red-50">
                  <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    disabled={isLoading}
                    required
                    className="pl-10 py-6 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#4199ff] focus:ring-[#4199ff]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={isLoading}
                    required
                    className="pl-10 py-6 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#4199ff] focus:ring-[#4199ff]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-key" className="text-sm font-medium text-gray-700">Admin Key</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="admin-key"
                    type="password"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    placeholder="Enter admin key"
                    disabled={isLoading}
                    required
                    className="pl-10 py-6 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#4199ff] focus:ring-[#4199ff]"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-2">
              <Button 
                type="submit" 
                className="w-full py-6 bg-[#4199ff] hover:bg-blue-600 text-white font-medium transition-colors" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Sign in as Admin
                  </>
                )}
              </Button>
              <div className="flex justify-between w-full text-sm pt-2">
                <Link href="/admin/forgot-password" className="font-medium text-[#4199ff] hover:text-blue-700 hover:underline transition-colors">
                  Forgot password?
                </Link>
                <Link href="/admin/register" className="font-medium text-[#4199ff] hover:text-blue-700 hover:underline transition-colors">
                  Request admin access
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default AdminLoginPage

