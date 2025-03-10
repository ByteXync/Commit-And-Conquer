"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-all ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <header className="w-full py-6 px-10 flex justify-between items-center shadow-md">
        <h1 className="text-3xl font-bold">
          Welcome to Our Platform
        </h1>
        <Button 
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </header>
        
      <div className="flex flex-col items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          <p className="text-lg text-center mb-6">
            Select your portal to proceed
          </p>

          {/* Grid Layout */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Admin Section */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600">Admin Portal</CardTitle>
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
                <CardTitle className="text-2xl text-green-600">User  Portal</CardTitle>
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
        </div>
      </div>

      {/* Footer */}
      <div className={`w-full py-4 text-center ${darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900"} mt-8`}>
        © 2024 Your Company Name. All rights reserved.
      </div>
    </div>
  );
};

export default LandingPage;