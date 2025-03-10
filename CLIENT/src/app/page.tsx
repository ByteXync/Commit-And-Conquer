"use client"; // Required for Next.js client components

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Portal {
  title: string;
  color: string;
  links: { text: string; href: string }[];
}

const portals: Portal[] = [
  {
    title: "Admin Portal",
    color: "text-blue-600 dark:text-blue-400",
    links: [
      { text: "Admin Login", href: "/admin/login" },
      { text: "Admin Register", href: "/admin/register" },
      { text: "Admin Dashboard", href: "/admin/dashboard" },
    ],
  },
  {
    title: "User Portal",
    color: "text-green-600 dark:text-green-400",
    links: [
      { text: "User Login", href: "/user/login" },
      { text: "User Register", href: "/user/register" },
      { text: "User Dashboard", href: "/user/dashboard" },
    ],
  },
];

const PortalCard: React.FC<Portal> = ({ title, color, links }) => (
  <Card className="shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-gray-700">
    <CardHeader>
      <CardTitle className={`text-2xl ${color}`}>{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex flex-col space-y-3">
        {links.map(({ text, href }) => (
          <a key={href} href={href} className="w-full">
            <Button variant="outline" className="w-full dark:border-gray-600 dark:text-gray-300">
              {text}
            </Button>
          </a>
        ))}
      </div>
    </CardContent>
  </Card>
);

const LandingPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-black flex flex-col items-center justify-center p-4">
      {/* Theme Toggle Button */}
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          onClick={() => setDarkMode((prev) => !prev)}
          className="dark:border-gray-600 dark:text-gray-300"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </Button>
      </div>

      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
          Welcome to Our Platform
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {portals.map((portal) => (
            <PortalCard key={portal.title} {...portal} />
          ))}
        </div>

        <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
          © 2024 Your Company Name. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
