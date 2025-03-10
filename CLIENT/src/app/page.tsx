"use client"

import React from "react"
import { DarkModeToggle } from "../components/dashboard/DarkModeToggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"
import Link from "next/link"

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-white flex flex-col items-center justify-center p-4">
      <DarkModeToggle />
      <br />
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Our <u>Platform</u> 👋🏻
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Admin Section */}
          <Card className="shadow-lg dark:shadow-gray-700 hover:shadow-xl transition-shadow bg-gray-100 dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">Admin Portal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-3">
                <Link href="/admin/login" className="w-full">
                  <InteractiveHoverButton className="w-full">Admin Login</InteractiveHoverButton>
                </Link>
                <Link href="/admin/register" className="w-full">
                  <InteractiveHoverButton className="w-full">Admin Register</InteractiveHoverButton>
                </Link>
                <Link href="/admin/dashboard" className="w-full">
                  <InteractiveHoverButton className="w-full">Admin Dashboard</InteractiveHoverButton>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* User Section */}
          <Card className="shadow-lg dark:shadow-gray-700 hover:shadow-xl transition-shadow bg-gray-100 dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="text-2xl text-green-600 dark:text-green-400">User Portal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-3">
                <Link href="/user/login" className="w-full">
                  <InteractiveHoverButton className="w-full">User Login</InteractiveHoverButton>
                </Link>
                <Link href="/user/register" className="w-full">
                  <InteractiveHoverButton className="w-full">User Register</InteractiveHoverButton>
                </Link>
                <Link href="/user/dashboard" className="w-full">
                  <InteractiveHoverButton className="w-full">User Dashboard</InteractiveHoverButton>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
          © 2024 Your Company. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default LandingPage
