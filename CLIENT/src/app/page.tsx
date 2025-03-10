import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 to-indigo-500 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating bubble elements */}
      <div className="absolute inset-0">
        <div className="absolute h-32 w-32 rounded-full bg-white opacity-10 blur-xl top-1/4 left-1/4"></div>
        <div className="absolute h-40 w-40 rounded-full bg-white opacity-10 blur-xl bottom-1/3 right-1/3"></div>
        <div className="absolute h-24 w-24 rounded-full bg-white opacity-10 blur-xl top-1/3 right-1/4"></div>
        <div className="absolute h-36 w-36 rounded-full bg-white opacity-10 blur-xl bottom-1/4 left-1/3"></div>
      </div>
      
      <div className="max-w-4xl w-full relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-white">
          Connect Platform
        </h1>
        
        <p className="text-center text-white/80 mb-8 max-w-xl mx-auto">
          A seamless experience designed for simple and effective collaboration.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Admin Section */}
          <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300 rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.88-11.71L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z" />
                </svg>
                Admin Portal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-3">
                <Link href="/admin/login" className="w-full">
                  <Button variant="outline" className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 transition-colors">
                    Admin Login
                  </Button>
                </Link>
                <Link href="/admin/register" className="w-full">
                  <Button variant="outline" className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 transition-colors">
                    Admin Register
                  </Button>
                </Link>
                <Link href="/admin/dashboard" className="w-full">
                  <Button variant="outline" className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 transition-colors">
                    Admin Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* User Section */}
          <Card className="bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300 rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                User Portal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-3">
                <Link href="/user/login" className="w-full">
                  <Button variant="outline" className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 transition-colors">
                    User Login
                  </Button>
                </Link>
                <Link href="/user/register" className="w-full">
                  <Button variant="outline" className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 transition-colors">
                    User Register
                  </Button>
                </Link>
                <Link href="/user/dashboard" className="w-full">
                  <Button variant="outline" className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 transition-colors">
                    User Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-white/70">
          <p>© 2025 Your Company Name. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link href="/privacy" className="text-white/80 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-white/80 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;