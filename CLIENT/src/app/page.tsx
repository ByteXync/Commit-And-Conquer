import React from 'react'; 
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 hover:text-5xl">
          Welcome to Our Platform
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Admin Section */}
          <Card className="shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">Admin Portal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-3">
                <a href="/admin/login" className="w-full">
                  <Button variant="outline" className="w-full border-blue-600 text-black hover:text-blue-600 hover:border-blue-600">
                    Admin Login
                  </Button>
                </a>
                <a href="/admin/register" className="w-full">
                  <Button variant="outline" className="w-full border-blue-600 text-black hover:text-blue-600 hover:border-blue-600">
                    Admin Register
                  </Button>
                </a>
                <a href="/admin/dashboard" className="w-full">
                  <Button variant="outline" className="w-full border-blue-600 text-black hover:text-blue-600 hover:border-blue-600">
                    Admin Dashboard
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* User Section */}
          <Card className="shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-green-600">User Portal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-3">
                <a href="/user/login" className="w-full">
                  <Button variant="outline" className="w-full border-green-600 text-black hover:text-green-600 hover:border-green-600">
                    User Login
                  </Button>
                </a>
                <a href="/user/register" className="w-full">
                  <Button variant="outline" className="w-full border-green-600 text-black hover:text-green-600 hover:border-green-600">
                    User Register
                  </Button>
                </a>
                <a href="/user/dashboard" className="w-full">
                  <Button variant="outline" className="w-full border-green-600 text-black hover:text-green-600 hover:border-green-600">
                    User Dashboard
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500">
          © 2024 Your Company Name. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
