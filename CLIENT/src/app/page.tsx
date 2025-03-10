import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LandingPage = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden">
      
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        
        <div className="w-full py-20 px-4 bg-gradient-to-b from-transparent via-black/10 to-black/20 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white animate-fade-in-up">
              Welcome to Our Platform
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Your one-stop solution for seamless management and collaboration
            </p>
            <div className="flex justify-center space-x-4 animate-fade-in-up animation-delay-400">
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></div>
              <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>

        
        <div className="max-w-6xl mx-auto px-4 pb-16">
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            
            <Card className="group transform hover:scale-105 transition-all duration-500 bg-white/10 backdrop-blur-md border-0 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <CardHeader className="pb-4">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-200 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-500">
                  Admin Portal
                </CardTitle>
                <p className="text-gray-300 mt-2">Manage and oversee your organization</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-3">
                  <a href="/admin/login" className="w-full transform transition-transform duration-200 hover:scale-[1.02]">
                    <Button variant="default" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0">
                      Admin Login
                    </Button>
                  </a>
                  <a href="/admin/register" className="w-full transform transition-transform duration-200 hover:scale-[1.02]">
                    <Button variant="outline" className="w-full border-blue-400/30 text-blue-300 hover:bg-blue-900/20 hover:text-blue-200">
                      Admin Register
                    </Button>
                  </a>
                  <a href="/admin/dashboard" className="w-full transform transition-transform duration-200 hover:scale-[1.02]">
                    <Button variant="outline" className="w-full border-purple-400/30 text-purple-300 hover:bg-purple-900/20 hover:text-purple-200">
                      Admin Dashboard
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            
            <Card className="group transform hover:scale-105 transition-all duration-500 bg-white/10 backdrop-blur-md border-0 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <CardHeader className="pb-4">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent group-hover:from-pink-300 group-hover:to-indigo-300 transition-all duration-500">
                  User Portal
                </CardTitle>
                <p className="text-gray-300 mt-2">Access your personal dashboard</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-3">
                  <a href="/user/login" className="w-full transform transition-transform duration-200 hover:scale-[1.02]">
                    <Button variant="default" className="w-full bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white border-0">
                      User Login
                    </Button>
                  </a>
                  <a href="/user/register" className="w-full transform transition-transform duration-200 hover:scale-[1.02]">
                    <Button variant="outline" className="w-full border-pink-400/30 text-pink-300 hover:bg-pink-900/20 hover:text-pink-200">
                      User Register
                    </Button>
                  </a>
                  <a href="/user/dashboard" className="w-full transform transition-transform duration-200 hover:scale-[1.02]">
                    <Button variant="outline" className="w-full border-indigo-400/30 text-indigo-300 hover:bg-indigo-900/20 hover:text-indigo-200">
                      User Dashboard
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-white mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Why Choose Us?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  title: 'Secure', 
                  description: 'Enterprise-grade security for your data',
                  gradient: 'from-blue-500 to-blue-700'
                },
                { 
                  title: 'Scalable', 
                  description: 'Grows with your organization',
                  gradient: 'from-purple-500 to-purple-700'
                },
                { 
                  title: 'Support', 
                  description: '24/7 dedicated customer support',
                  gradient: 'from-pink-500 to-pink-700'
                },
              ].map((feature, index) => (
                <div 
                  key={feature.title} 
                  className="group p-6 rounded-xl bg-white/10 backdrop-blur-md transform hover:scale-105 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br ${feature.gradient} transform group-hover:rotate-12 transition-transform duration-500`}></div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          
          <footer className="mt-20 text-center text-gray-400 border-t border-white/10 pt-8">
            <p className="text-gray-300">© 2024 Your Company Name. All rights reserved.</p>
            <div className="mt-4 space-x-6">
              <a href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="/terms" className="text-gray-300 hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">Contact Us</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;