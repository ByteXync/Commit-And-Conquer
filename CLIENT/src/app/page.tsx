import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Grid overlay for cybernetic effect */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(to right, #0f0 1px, transparent 1px), linear-gradient(to bottom, #0f0 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="max-w-4xl w-full relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-cyan-400 tracking-wider">
          SYSTEM ACCESS PORTAL
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Admin Section */}
          <Card className="bg-gray-900 border border-cyan-500 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/50 transition-all">
            <CardHeader className="border-b border-cyan-800">
              <CardTitle className="text-2xl text-cyan-400 font-mono">ADMIN TERMINAL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex flex-col space-y-3">
                <a href="/admin/login" className="w-full">
                  <Button variant="outline" className="w-full bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-300 hover:text-cyan-300 transition-all">
                    AUTHENTICATE
                  </Button>
                </a>
                <a href="/admin/register" className="w-full">
                  <Button variant="outline" className="w-full bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-300 hover:text-cyan-300 transition-all">
                    NEW USER REGISTRATION
                  </Button>
                </a>
                <a href="/admin/dashboard" className="w-full">
                  <Button variant="outline" className="w-full bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-300 hover:text-cyan-300 transition-all">
                    ACCESS CONTROL PANEL
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* User Section */}
          <Card className="bg-gray-900 border border-green-500 shadow-lg shadow-green-500/20 hover:shadow-green-500/50 transition-all">
            <CardHeader className="border-b border-green-800">
              <CardTitle className="text-2xl text-green-400 font-mono">USER TERMINAL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex flex-col space-y-3">
                <a href="/user/login" className="w-full">
                  <Button variant="outline" className="w-full bg-transparent border border-green-400 text-green-400 hover:bg-green-400/10 hover:border-green-300 hover:text-green-300 transition-all">
                    AUTHENTICATE
                  </Button>
                </a>
                <a href="/user/register" className="w-full">
                  <Button variant="outline" className="w-full bg-transparent border border-green-400 text-green-400 hover:bg-green-400/10 hover:border-green-300 hover:text-green-300 transition-all">
                    NEW USER REGISTRATION
                  </Button>
                </a>
                <a href="/user/dashboard" className="w-full">
                  <Button variant="outline" className="w-full bg-transparent border border-green-400 text-green-400 hover:bg-green-400/10 hover:border-green-300 hover:text-green-300 transition-all">
                    ACCESS DATA CONSOLE
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 font-mono text-xs tracking-wider">
          <div className="mb-1">SYSTEM VERSION 2.0.25</div>
          <div>© 2025 YOUR_CORPORATION || ALL_RIGHTS_SECURED</div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;