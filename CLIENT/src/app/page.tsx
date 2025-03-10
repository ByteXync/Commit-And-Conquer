import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DarkModeToggle from '@/components/DarkModeToggle'; // Ensure this import path is correct

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="flex justify-end w-full mb-4">
          <DarkModeToggle /> {/* Place the toggle button here */}
        </div>
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
          Welcome to Our Platform
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Admin Section */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">Admin Portal</CardTitle>
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
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl text-green-600 dark:text-green-400">User Portal</CardTitle>
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
        <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
          © 2024 Your Company Name. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
