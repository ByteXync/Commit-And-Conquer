import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2b2f35] to-[#EEEEEE] flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#F6E9E9] relative bottom-20">
          Welcome to Our Platform
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Admin Section */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow bg-[#343638] h-80 gap-18 border-[#272121]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#F6E9E9] text-center">Admin Portal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 ]">
              <div className="flex flex-col space-y-3">
                <a href="/admin/login" className="w-full">
                <Button variant="outline" className="w-full bg-[#74d0d5] border-[#74d0d5]">                    Admin Login
                  </Button>
                </a>
                <a href="/admin/register" className="w-full">
                <Button variant="outline" className="w-full bg-[#74d0d5] border-[#74d0d5]">                    Admin Register
                  </Button>
                </a>
                <a href="/admin/dashboard" className="w-full">
                <Button variant="outline" className="w-full bg-[#74d0d5] border-[#74d0d5]">                    Admin Dashboard
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* User Section */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow bg-[#343638] h-80 gap-18 border-[#272121]">
            <CardHeader>
              <CardTitle className="text-2xl text-[#F6E9E9] text-center">User Portal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-3 ">
                <a href="/user/login" className="w-full">
                  <Button variant="outline" className="w-full bg-[#74d0d5] border-[#74d0d5]">
                    User Login
                  </Button>
                </a>
                <a href="/user/register" className="w-full">
                <Button variant="outline" className="w-full bg-[#74d0d5] border-[#74d0d5]">                    User Register
                  </Button>
                </a>
                <a href="/user/dashboard" className="w-full">
                <Button variant="outline" className="w-full bg-[#74d0d5] border-[#74d0d5]">                    User Dashboard
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