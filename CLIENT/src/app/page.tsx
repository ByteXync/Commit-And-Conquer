"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ChevronRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/90 flex flex-col items-center justify-center p-4">
      {/* Header with theme toggle */}
      <header className="fixed top-0 w-full bg-background/90 backdrop-blur-sm z-10 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-gradient-to-tr from-blue-600 to-purple-600 mr-3"></div>
            <span className="font-bold text-lg text-foreground">Platform</span>
          </div>
          <ThemeToggle />
        </div>
      </header>
      
      <div className="max-w-5xl w-full pt-20 pb-12">
        {/* Main title section */}
        <div className="text-center mb-12 pb-6 border-b border-border/40">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Welcome to the Platform
          </h1>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Admin Section */}
          <Card className="shadow-lg border border-border/50 overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-center">Admin Portal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <div className="flex flex-col space-y-3">
                <a href="/admin/login" className="w-full">
                  <Button variant="outline" className="w-full justify-between group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors">
                    <span>Admin Login</span>
                    <ChevronRight className="h-4 w-4 opacity-70" />
                  </Button>
                </a>
                <a href="/admin/register" className="w-full">
                  <Button variant="outline" className="w-full justify-between group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors">
                    <span>Admin Register</span>
                    <ChevronRight className="h-4 w-4 opacity-70" />
                  </Button>
                </a>
                <a href="/admin/dashboard" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 border-0 text-white">
                    Go to Admin Dashboard
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* User Section */}
          <Card className="shadow-lg border border-border/50 overflow-hidden group hover:border-purple-500/30 transition-all duration-300">
            <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-600"></div>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-center">User Portal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <div className="flex flex-col space-y-3">
                <a href="/user/login" className="w-full">
                  <Button variant="outline" className="w-full justify-between group-hover:border-purple-200 dark:group-hover:border-purple-800 transition-colors">
                    <span>User Login</span>
                    <ChevronRight className="h-4 w-4 opacity-70" />
                  </Button>
                </a>
                <a href="/user/register" className="w-full">
                  <Button variant="outline" className="w-full justify-between group-hover:border-purple-200 dark:group-hover:border-purple-800 transition-colors">
                    <span>User Register</span>
                    <ChevronRight className="h-4 w-4 opacity-70" />
                  </Button>
                </a>
                <a href="/user/dashboard" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 border-0 text-white">
                    Go to User Dashboard
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border/40 text-center text-muted-foreground">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>© 2025 All rights reserved.</div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;