"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Moon, Sun, LogIn, UserPlus, LayoutDashboard } from 'lucide-react';

const LandingPage = () => {
  // Always start with light mode
  const [theme, setTheme] = useState('light');

  // Apply theme to document
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ease-in-out ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-br from-blue-50 to-white text-gray-800'
    }`}>
      <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen">
        {/* Header with Improved Theme Toggle */}
        <header className="flex justify-end mb-8">
          <div className="relative bg-gray-200 dark:bg-gray-700 rounded-full p-1 shadow-md">
            <div 
              className={`absolute top-1 transition-transform duration-300 ease-in-out rounded-full bg-white dark:bg-gray-800 w-8 h-8 shadow-sm ${
                theme === 'dark' ? 'translate-x-full' : 'translate-x-0'
              }`}
            />
            <div className="flex">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setTheme('light')}
                className={`z-10 rounded-full p-2 transition-all duration-300 ${
                  theme === 'light' ? 'text-yellow-600' : 'text-gray-400'
                }`}
                aria-label="Switch to light mode"
              >
                <Sun className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setTheme('dark')}
                className={`z-10 rounded-full p-2 transition-all duration-300 ${
                  theme === 'dark' ? 'text-blue-300' : 'text-gray-400'
                }`}
                aria-label="Switch to dark mode"
              >
                <Moon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center">
          <h1 className={`text-5xl font-bold text-center mb-12 transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            Welcome to Our Platform
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
            {/* Admin Section */}
            <Card className={`shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
            }`}>
              <CardHeader className="pb-2">
                <CardTitle className={`text-2xl ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  Admin Portal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 pt-4">
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Access administrative tools and manage your organization's settings
                </p>
                <div className="flex flex-col space-y-3">
                  <a href="/admin/login" className="w-full">
                    <Button 
                      variant="outline" 
                      className={`w-full justify-start gap-2 transition-colors ${
                        theme === 'dark' 
                          ? 'hover:bg-blue-900 border-gray-600' 
                          : 'hover:bg-blue-50'
                      }`}
                    >
                      <LogIn size={18} />
                      Admin Login
                    </Button>
                  </a>
                  <a href="/admin/register" className="w-full">
                    <Button 
                      variant="outline" 
                      className={`w-full justify-start gap-2 transition-colors ${
                        theme === 'dark' 
                          ? 'hover:bg-blue-900 border-gray-600' 
                          : 'hover:bg-blue-50'
                      }`}
                    >
                      <UserPlus size={18} />
                      Admin Register
                    </Button>
                  </a>
                  <a href="/admin/dashboard" className="w-full">
                    <Button 
                      variant="outline" 
                      className={`w-full justify-start gap-2 transition-colors ${
                        theme === 'dark' 
                          ? 'hover:bg-blue-900 border-gray-600' 
                          : 'hover:bg-blue-50'
                      }`}
                    >
                      <LayoutDashboard size={18} />
                      Admin Dashboard
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* User Section */}
            <Card className={`shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
            }`}>
              <CardHeader className="pb-2">
                <CardTitle className={`text-2xl ${
                  theme === 'dark' ? 'text-green-400' : 'text-green-600'
                }`}>
                  User Portal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 pt-4">
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Manage your account, access your dashboard, and explore our features
                </p>
                <div className="flex flex-col space-y-3">
                  <a href="/user/login" className="w-full">
                    <Button 
                      variant="outline" 
                      className={`w-full justify-start gap-2 transition-colors ${
                        theme === 'dark' 
                          ? 'hover:bg-green-900 border-gray-600' 
                          : 'hover:bg-green-50'
                      }`}
                    >
                      <LogIn size={18} />
                      User Login
                    </Button>
                  </a>
                  <a href="/user/register" className="w-full">
                    <Button 
                      variant="outline" 
                      className={`w-full justify-start gap-2 transition-colors ${
                        theme === 'dark' 
                          ? 'hover:bg-green-900 border-gray-600' 
                          : 'hover:bg-green-50'
                      }`}
                    >
                      <UserPlus size={18} />
                      User Register
                    </Button>
                  </a>
                  <a href="/user/dashboard" className="w-full">
                    <Button 
                      variant="outline" 
                      className={`w-full justify-start gap-2 transition-colors ${
                        theme === 'dark' 
                          ? 'hover:bg-green-900 border-gray-600' 
                          : 'hover:bg-green-50'
                      }`}
                    >
                      <LayoutDashboard size={18} />
                      User Dashboard
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Footer */}
        <footer className={`mt-12 text-center transition-colors duration-300 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <p>© 2025 Your Company Name. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;