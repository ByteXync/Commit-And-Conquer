"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InternshipList } from "@/components/dashboard/internship-list"
import { ApplicationStats } from "@/components/dashboard/application-stats"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { UpcomingInterviews } from "@/components/dashboard/upcoming-interviews"
import { ResumeUpload } from "@/components/dashboard/resume-upload"

export default function DashboardPage() {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/user/login")
      return
    }

    try {
      setUser(JSON.parse(storedUser))

      // Check for tab parameter in URL
      const params = new URLSearchParams(window.location.search)
      const tabParam = params.get("tab")
      if (tabParam && ["overview", "applications", "resume", "interviews"].includes(tabParam)) {
        setActiveTab(tabParam)
      }
    } catch (error) {
      console.error("Failed to parse user data:", error)
      router.push("/user/login")
    }
  }, [router])

  if (!user) {
    return null // Or a loading spinner
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 md:gap-8 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Button>Find Jobs</Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <ApplicationStats />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent job application activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivity />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Interviews</CardTitle>
                  <CardDescription>Your scheduled interviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <UpcomingInterviews />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Applications</CardTitle>
                <CardDescription>Track and manage your job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <InternshipList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resume" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Resume Management</CardTitle>
                <CardDescription>Upload and manage your resumes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResumeUpload />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Interview Schedule</CardTitle>
                <CardDescription>Manage your upcoming interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingInterviews detailed />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

