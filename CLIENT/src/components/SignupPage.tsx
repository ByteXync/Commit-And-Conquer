"use client";
import Image from 'next/image';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    server?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name as keyof typeof errors]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: { fullName?: string; email?: string; password?: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: "USER" }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ fullName: "", email: "", password: "" });
      } else {
        const data = await response.json();
        setErrors((prev) => ({ ...prev, server: data.error || "An error occurred" }));
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors((prev) => ({ ...prev, server: "An error occurred" }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-6 relative"
      style={{ backgroundImage: `url('/backgroundimage.jpg')` }}
    >
      <div className="absolute top-4 left-4">
        <Image src="/logo.png" alt="Logo" width={100} height={50} />
      </div>
      <Card className="w-full max-w-lg shadow-xl rounded-lg bg-white p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold">Sign Up</CardTitle>
          <CardDescription>Enter your details to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="flex flex-col items-center text-center space-y-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
              <h3 className="text-2xl font-semibold">Registration Successful!</h3>
              <p className="text-gray-600">Your account has been created successfully.</p>
              <Button className="w-full" onClick={() => router.push("/login")}>
                Go to Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.server && <p className="text-sm text-destructive">{errors.server}</p>}
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`border ${errors.fullName ? "border-red-500" : ""}`}
                />
                {errors.fullName && (
                  <div className="flex items-center text-red-500 text-sm mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>{errors.fullName}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`border ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <div className="flex items-center text-red-500 text-sm mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={`border ${errors.password ? "border-red-500" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center text-red-500 text-sm mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>{errors.password}</span>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
              </div>

              <Button className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}