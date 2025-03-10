"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from 'lucide-react';
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProfileForm() {
  const [image, setImage] = useState<string | null>("/placeholder.svg?height=120&width=120");
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving data
    setTimeout(() => {
      router.push("/user/dashboard");
    }, 1000);
  };

  return (
    <Card className="max-w-2xl w-full mx-auto shadow-lg rounded-2xl border border-border/40 bg-white overflow-hidden">
      <CardHeader className="text-center pb-4 border-b bg-muted/30">
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <Avatar className="h-28 w-28 border-4 border-background shadow-lg">
              <AvatarImage src={image || "/placeholder.svg?height=120&width=120"} alt="Profile picture" />
              <AvatarFallback className="text-3xl">JD</AvatarFallback>
            </Avatar>
            <label htmlFor="image-upload" className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="h-6 w-6 text-white" />
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <CardTitle className="text-3xl font-semibold text-primary">Edit Profile</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form className="grid gap-6" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Bio Field */}
          <div className="grid gap-2">
            <Label htmlFor="bio" className="text-sm font-medium text-gray-700">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              rows={4}
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Email Field */}
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="johndoe@example.com"
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {/* Save Button */}
          <Button 
            type="submit" 
            className="w-full mt-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg py-3 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
