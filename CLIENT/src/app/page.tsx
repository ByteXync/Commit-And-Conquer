import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Shield, User } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white p-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full opacity-10 translate-x-1/3 translate-y-1/3" />
      
      <div className="max-w-5xl w-full relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Welcome to Our Platform
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The all-in-one solution for managing your business and user experiences
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Admin Section */}
          <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-4px] border-0 bg-gradient-to-br from-white to-blue-50">
            <CardHeader className="pb-0">
              <div className="flex items-center mb-1">
                <Shield className="h-6 w-6 text-blue-600 mr-2" />
                <CardTitle className="text-2xl font-bold text-blue-600">Admin Portal</CardTitle>
              </div>
              <p className="text-gray-500 text-sm">Complete control over your platform</p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <a href="/admin/login" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex justify-between items-center group">
                    <span>Admin Login</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
                <a href="/admin/register" className="block">
                  <Button variant="outline" className="w-full border-blue-200 hover:border-blue-600 hover:bg-blue-50 flex justify-between items-center group">
                    <span>Admin Register</span>
                    <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  </Button>
                </a>
                <a href="/admin/dashboard" className="block">
                  <Button variant="ghost" className="w-full text-blue-600 hover:bg-blue-50 flex justify-between items-center group">
                    <span>Admin Dashboard</span>
                    <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* User Section */}
          <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-4px] border-0 bg-gradient-to-br from-white to-green-50">
            <CardHeader className="pb-0">
              <div className="flex items-center mb-1">
                <User className="h-6 w-6 text-green-600 mr-2" />
                <CardTitle className="text-2xl font-bold text-green-600">User Portal</CardTitle>
              </div>
              <p className="text-gray-500 text-sm">Access your personalized experience</p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <a href="/user/login" className="block">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white flex justify-between items-center group">
                    <span>User Login</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
                <a href="/user/register" className="block">
                  <Button variant="outline" className="w-full border-green-200 hover:border-green-600 hover:bg-green-50 flex justify-between items-center group">
                    <span>User Register</span>
                    <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  </Button>
                </a>
                <a href="/user/dashboard" className="block">
                  <Button variant="ghost" className="w-full text-green-600 hover:bg-green-50 flex justify-between items-center group">
                    <span>User Dashboard</span>
                    <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <p>© 2025 Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;