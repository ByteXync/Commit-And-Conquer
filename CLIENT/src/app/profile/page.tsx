"use client"

import { ProfileForm } from "@/components/profile/profile-form"
import { useState } from "react"
import { UserCircle, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"profile" | "posts">("profile")

  return (
    <div className="container mx-auto py-10 px-4 flex justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-2 text-primary">My Profile</h1>
        <p className="text-muted-foreground mb-6">Manage your profile information and content</p>

        {/* Desktop view */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 justify-center">
            <ProfileForm />
          </div>
        </div>

        {/* Mobile view with custom tabs */}
        <div className="md:hidden">
          <div className="flex mb-6 border rounded-lg overflow-hidden">
            <Button
              variant={activeTab === "profile" ? "default" : "ghost"}
              className={`flex-1 rounded-none flex items-center justify-center gap-2 ${
                activeTab === "profile" ? "bg-primary text-primary-foreground" : ""
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <UserCircle className="h-4 w-4" />
              Profile
            </Button>
            <Button
              variant={activeTab === "posts" ? "default" : "ghost"}
              className={`flex-1 rounded-none flex items-center justify-center gap-2 ${
                activeTab === "posts" ? "bg-primary text-primary-foreground" : ""
              }`}
              onClick={() => setActiveTab("posts")}
            >
              <FileText className="h-4 w-4" />
              Posts
            </Button>
          </div>

          {activeTab === "profile" &&  null}
        </div>
      </div>
    </div>
  )
}

