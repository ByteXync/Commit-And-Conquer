"use client"; // This is required for using React hooks

import React, { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@/components/ui/button"; // Assuming you already have a button component
import "./globals.css"; // Import your global CSS

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check localStorage for theme preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle Dark Mode and store preference
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="fixed top-4 right-4 z-50">
          {/* Dark Mode Toggle Button */}
          <Button
            variant="outline"
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
          >
            {isDarkMode ? "🌙" : "☀️"}
          </Button>
        </div>

        {/* Main Content */}
        {children}
      </body>
    </html>
  );
}
