import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-400 to-blue-500">
            {/* Main Content */}
            <div className="flex-grow flex flex-col items-center justify-center p-8">
                {/* Heading */}
                <h1 className="text-5xl font-extrabold text-white text-center mb-8 drop-shadow-lg">
                    Welcome to Our Innovative Platform
                </h1>

                {/* Description */}
                <p className="text-lg text-white text-center mb-12 max-w-lg">
                    Explore a seamless experience with our admin and user portals. We 
                    provide easy access to your needs with just one click.
                </p>

                {/* Cards Section */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Admin Portal Card */}
                    <Card className="shadow-lg hover:shadow-xl transition-shadow bg-blue-200 bg-opacity-90 transform hover:-translate-y-2 duration-300">
                        <CardHeader>
                            <CardTitle className="text-2xl text-blue-800">Admin Portal</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col space-y-3">
                                <a href="/admin/login" className="w-full">
                                    <Button variant="outline" className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
                                        Admin Login
                                    </Button>
                                </a>
                                <a href="/admin/register" className="w-full">
                                    <Button variant="outline" className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
                                        Admin Register
                                    </Button>
                                </a>
                                <a href="/admin/dashboard" className="w-full">
                                    <Button variant="outline" className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
                                        Admin Dashboard
                                    </Button>
                                </a>
                            </div>
                        </CardContent>
                    </Card>

                    {/* User Portal Card */}
                    <Card className="shadow-lg hover:shadow-xl transition-shadow bg-green-200 bg-opacity-90 transform hover:-translate-y-2 duration-300">
                        <CardHeader>
                            <CardTitle className="text-2xl text-green-800">User Portal</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col space-y-3">
                                <a href="/user/login" className="w-full">
                                    <Button variant="outline" className="w-full bg-green-600 text-white hover:bg-green-700 transition-colors duration-200">
                                        User Login
                                    </Button>
                                </a>
                                <a href="/user/register" className="w-full">
                                    <Button variant="outline" className="w-full bg-green-600 text-white hover:bg-green-700 transition-colors duration-200">
                                        User Register
                                    </Button>
                                </a>
                                <a href="/user/dashboard" className="w-full">
                                    <Button variant="outline" className="w-full bg-green-600 text-white hover:bg-green-700 transition-colors duration-200">
                                        User Dashboard
                                    </Button>
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Social Media Icons Section */}
                <div className="flex space-x-5 mt-12">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} className="text-white text-2xl hover:text-blue-600 transition-colors duration-200" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} className="text-white text-2xl hover:text-pink-600 transition-colors duration-200" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} className="text-white text-2xl hover:text-blue-400 transition-colors duration-200" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} className="text-white text-2xl hover:text-blue-700 transition-colors duration-200" />
                    </a>
                </div>

                {/* Footer */}
                <div className="mt-12 text-center text-white text-sm">
                    © 2024 Your Company Name. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
