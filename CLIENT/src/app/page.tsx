"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LandingPage = () => {
  // Text animation variants with faster speeds
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // Faster stagger
        delayChildren: 0.1 // Less initial delay
      }
    }
  };
  
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        damping: 10, 
        stiffness: 200 // Faster spring
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.6, // Reduced delay
        duration: 0.4, // Faster duration
        ease: "easeOut" 
      }
    }
  };

  const titleText = "Welcome to Our Platform";
  const subtitleText = "A seamless experience for both admins and users.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-blue-800 to-fuchsia-800 flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }} // Faster initial fade
        className="max-w-5xl w-full"
      >
        {/* Heading Section with Enhanced Text Shadow and Animation */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-4"
        >
          <motion.h1
            className="text-5xl font-extrabold text-center text-white inline-block"
            style={{ 
              textShadow: "0 0 6px rgba(0, 0, 0, 0.9), 0 0 12px rgba(76, 29, 149, 0.9), 0 0 18px rgba(91, 33, 182, 0.8), 0 0 24px rgba(124, 58, 237, 0.7)" 
            }}
          >
            {titleText.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>

        <motion.p 
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="text-center text-lg text-blue-100 mb-10"
          style={{ textShadow: "0 0 8px rgba(30, 58, 138, 0.8)" }}
        >
          {subtitleText}
        </motion.p>

        {/* Portal Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Admin Portal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }} // Faster animation
            whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(76, 29, 149, 0.25)" }}
          >
            <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-md bg-gradient-to-br from-purple-900/60 to-fuchsia-900/40 border border-purple-400/20 rounded-xl overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-3xl font-semibold text-fuchsia-300 text-center"
                  style={{ textShadow: "0 0 6px rgba(216, 180, 254, 0.6)" }}>
                  Admin Portal
                </CardTitle>
                <p className="text-sm text-purple-200 text-center">
                  Manage and control the platform efficiently.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-3">
                  {["Login", "Register", "Dashboard"].map((item, index) => (
                    <motion.a
                      key={item}
                      href={`/admin/${item.toLowerCase()}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + (index * 0.05), duration: 0.3 }} // Faster buttons
                      className="w-full"
                    >
                      <Button className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-700 hover:from-fuchsia-700 hover:to-purple-800 text-white rounded-lg py-3 text-lg shadow-lg transition-all border border-fuchsia-400/20">
                        Admin {item}
                      </Button>
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* User Portal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }} // Faster animation
            whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(56, 189, 248, 0.25)" }}
          >
            <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-md bg-gradient-to-br from-blue-900/60 to-cyan-900/40 border border-blue-400/20 rounded-xl overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-3xl font-semibold text-cyan-300 text-center"
                  style={{ textShadow: "0 0 6px rgba(125, 211, 252, 0.6)" }}>
                  User Portal
                </CardTitle>
                <p className="text-sm text-blue-200 text-center">
                  Explore and manage your activities easily.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-3">
                  {["Login", "Register", "Dashboard"].map((item, index) => (
                    <motion.a
                      key={item}
                      href={`/user/${item.toLowerCase()}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 + (index * 0.05), duration: 0.3 }} // Faster buttons
                      className="w-full"
                    >
                      <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white rounded-lg py-3 text-lg shadow-lg transition-all border border-cyan-400/20">
                        User {item}
                      </Button>
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.3 }} // Faster footer
          className="mt-12 text-center text-blue-200 text-sm"
        >
          <p>© 2024 Your Company Name. All rights reserved.</p>
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default LandingPage;