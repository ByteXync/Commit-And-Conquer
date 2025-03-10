"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Mail, Edit, LogOut, ArrowLeft } from "lucide-react"

interface ProfilePageProps {
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>
}

export function ProfilePage({ setShowProfile }: ProfilePageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center justify-center min-h-screen bg-background p-6"
    >
      <Card className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <CardContent className="flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Avatar className="h-24 w-24 border-4 border-indigo-500 shadow-lg">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback className="text-2xl font-bold text-white bg-indigo-500">JD</AvatarFallback>
            </Avatar>
          </motion.div>
          
          <h2 className="mt-4 text-3xl font-bold text-gray-800">John Doe</h2>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Mail className="w-4 h-4 text-indigo-500" /> john.doe@example.com
          </p>

          <div className="flex flex-col w-full mt-6 space-y-3">
            <Button 
              className="w-full bg-indigo-500 hover:bg-indigo-600 transition-transform transform hover:scale-105 flex items-center gap-2"
            >
              <Edit className="w-4 h-4" /> Edit Profile
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-gray-300 hover:bg-gray-100 transition-transform transform hover:scale-105 flex items-center gap-2"
              onClick={() => setShowProfile(false)}
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Button>
            <Button 
              variant="destructive" 
              className="w-full flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}