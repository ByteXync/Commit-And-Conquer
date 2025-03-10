"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import DarkModeToggle from "@/components/DarkModeToggle";

function AdminLoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [adminKey, setAdminKey] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");


    if (!username || !password) {
      setError("Please enter both username and password");
      return;

    // Reset error state
    setError("")

    // Validate form
    if (!email || !password) {
      setError("Please enter both username and password")
      return

    }

    setIsLoading(true);

    try {

      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login submitted:", { username, password, adminKey });
      setIsLoading(false);
      setError("");

      // This is where you would typically make an API call to authenticate
      // For example:
      const response = await fetch('http://localhost:8000/user/adminauth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email:email, 
          password:password, 
          admin_code:adminKey 
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Invalid credentials");
      }

      console.log("Login successful:", data);
      setIsLoading(false);

      // Store token (example: in localStorage)
      localStorage.setItem("token", data.token);

      // Redirect to dashboard
      window.location.href = "/admin/dashboard";

    } catch (err) {
      setIsLoading(false);
      setError("Invalid credentials");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Admin Sign In</CardTitle>
          <CardDescription>Enter your credentials to access the admin panel</CardDescription>
          <div className="flex justify-end">
            <DarkModeToggle />
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">Email</Label>
              <Input
                id="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your username"
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-key">Admin Key</Label>
              <Input
                id="admin-key"
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter admin key"
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
            <div className="flex justify-between w-full text-sm">
              <a href="/forgot-password" className="font-medium text-primary hover:underline">
                Forgot password?
              </a>
              <a href="/register" className="font-medium text-primary hover:underline">
                Request admin access
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default AdminLoginPage;
