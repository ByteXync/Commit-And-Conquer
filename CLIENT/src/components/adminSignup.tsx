"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, KeyRound, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    adminKey: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    adminKey: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    if (!formData.adminKey.trim()) {
      newErrors.adminKey = "Admin key is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch(
          "http://localhost:8000/user/adminauth/register",
          {
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
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Form submitted successfully:", data);
          setIsSuccess(true);
          setFormData({
            fullName: "",
            email: "",
            password: "",
            adminKey: "",
          });
        } else {
          const errorData = await response.json();
          console.error("Registration error:", errorData);
        }
      } catch (error) {
        console.error("Registration error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg border-0 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <CardHeader className="space-y-2 pb-6 pt-8">
          <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Admin Sign Up
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            Create an admin account to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Registration Successful!
              </h3>
              <p className="text-gray-500 mt-2 max-w-xs mx-auto">
                Your admin account has been created successfully.
              </p>
              <Button
                className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 py-6"
                onClick={() => router.push("/admin/login")}
              >
                Navigate to Admin Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`h-12 px-4 rounded-lg transition-all duration-200 ring-offset-2 focus:ring-2 focus:ring-blue-500 ${
                      errors.fullName ? "border-red-500 focus:ring-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500 mt-1 flex items-center">
                      <span className="mr-1">•</span> {errors.fullName}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`h-12 px-4 rounded-lg transition-all duration-200 ring-offset-2 focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-200"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1 flex items-center">
                      <span className="mr-1">•</span> {errors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className={`h-12 px-4 rounded-lg pr-12 transition-all duration-200 ring-offset-2 focus:ring-2 focus:ring-blue-500 ${
                        errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-200"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1 flex items-center">
                      <span className="mr-1">•</span> {errors.password}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 8 characters long
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminKey" className="text-gray-700 font-medium">Admin Key</Label>
                  <div className="relative">
                    <Input
                      id="adminKey"
                      name="adminKey"
                      type="password"
                      placeholder="Enter admin key"
                      value={formData.adminKey}
                      onChange={handleChange}
                      className={`h-12 pl-12 pr-4 rounded-lg transition-all duration-200 ring-offset-2 focus:ring-2 focus:ring-blue-500 ${
                        errors.adminKey ? "border-red-500 focus:ring-red-500" : "border-gray-200"
                      }`}
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <KeyRound className="h-5 w-5" />
                    </div>
                  </div>
                  {errors.adminKey && (
                    <p className="text-sm text-red-500 mt-1 flex items-center">
                      <span className="mr-1">•</span> {errors.adminKey}
                    </p>
                  )}
                </div>
              </div>
              <CardFooter className="px-0 pt-4">
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Admin Account...
                    </span>
                  ) : (
                    "Create Admin Account"
                  )}
                </Button>
              </CardFooter>
            </form>
          )}
        </CardContent>
        <div className="text-center text-gray-500 text-xs pb-6 px-8">
          Already have an account? <a href="/admin/login" className="text-blue-600 hover:text-blue-800 font-medium">Sign in</a>
        </div>
      </Card>
    </div>
  );
}