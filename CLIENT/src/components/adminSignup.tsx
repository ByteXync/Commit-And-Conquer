"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
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
import Image from "next/image";

export default function AdminSignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminKey, setShowAdminKey] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    adminKey: "",
  });
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    adminKey?: string;
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
    let valid = true;
    const newErrors: {
      fullName?: string;
      email?: string;
      password?: string;
      adminKey?: string;
    } = {};

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
        const response = await fetch("/api/admin/register", {
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
        });

        if (response.ok) {
          setIsSuccess(true);
          setFormData({
            fullName: "",
            email: "",
            password: "",
            adminKey: "",
          });
        } else {
          const data = await response.json();
          setErrors((prev) => ({ ...prev, server: data.message || "Registration failed" }));
        }
      } catch (error) {
        console.error("Registration error:", error);
        setErrors((prev) => ({ ...prev, server: "An unexpected error occurred" }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-6 relative"
      style={{ backgroundImage: `url('/backgroundimage.jpg')` }}
    >
      <div className="absolute top-4 left-4">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={50}
        />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Admin Sign Up</CardTitle>
          <CardDescription className="text-center">
            Create an admin account to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold">Registration Successful!</h3>
              <p className="text-muted-foreground mt-2">Your admin account has been created successfully.</p>
              <Button className="mt-6" onClick={() => router.push("/admin/login")}>
                Navigate to Admin Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.server && <p className="text-sm text-destructive">{errors.server}</p>}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminKey">Admin Key</Label>
                <div className="relative">
                  <Input
                    id="adminKey"
                    name="adminKey"
                    type={showAdminKey ? "text" : "password"}
                    value={formData.adminKey}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminKey(!showAdminKey)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    aria-label={showAdminKey ? "Hide admin key" : "Show admin key"}
                  >
                    {showAdminKey ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.adminKey && <p className="text-sm text-destructive">{errors.adminKey}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating Admin Account..." : "Create Admin Account"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}