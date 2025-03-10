// app/page.tsx
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Theme Toggle Button (positioned in top right corner) */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-8 text-foreground relative bottom-20">
          Welcome to Our Platform
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Admin Section */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow h-80">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Admin Portal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-3">
                <a href="/admin/login" className="w-full">
                  <Button variant="outline" className="w-full">
                    Admin Login
                  </Button>
                </a>
                <a href="/admin/register" className="w-full">
                  <Button variant="outline" className="w-full">
                    Admin Register
                  </Button>
                </a>
                <a href="/admin/dashboard" className="w-full">
                  <Button variant="outline" className="w-full">
                    Admin Dashboard
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* User Section */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow h-80">
            <CardHeader>
              <CardTitle className="text-2xl text-center">User Portal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-3">
                <a href="/user/login" className="w-full">
                  <Button variant="outline" className="w-full">
                    User Login
                  </Button>
                </a>
                <a href="/user/register" className="w-full">
                  <Button variant="outline" className="w-full">
                    User Register
                  </Button>
                </a>
                <a href="/user/dashboard" className="w-full">
                  <Button variant="outline" className="w-full">
                    User Dashboard
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-muted-foreground">
          © 2025 Your Company Name. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LandingPage;