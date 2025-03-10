"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
// import { BasicSidebar } from "@/components/dashboard/dashboard-sidebar"
import { UserNav } from "@/components/dashboard/user-nav"
import { MainNav } from "@/components/dashboard/main-nav"
import InternshipList from "@/components/dashboard/internship-list"
import { Search } from "@/components/dashboard/search"
import { ResumeUpload } from "@/components/resume/resume-upload"
import { ResumeView } from "@/components/resume/resume-view"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  FileText,
  TrendingUp,
  Users,
  Briefcase,
  Calendar,
  ChevronRight,
  Bell,
  Menu,
  Building2,
  MapPin,
  Clock,
} from "lucide-react"

export default function Dashboard() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex flex-col bg-background">
      {/* <BasicSidebar /> */}
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-6">
          <Button variant="outline" size="icon" className="md:hidden mr-2">
            <Menu className="h-4 w-4" />
          </Button>
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive"></span>
            </Button>
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back! Here's an overview of your internship journey.</p>
              </div>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="internships">Internships</TabsTrigger>
                <TabsTrigger value="resume">Resume</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-6">
              {/* Statistics Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Internships</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">120</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Applications</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45</div>
                    <p className="text-xs text-muted-foreground">+5 applications this week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,200</div>
                    <p className="text-xs text-muted-foreground">+8% from last week</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activities Section */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>Your recent interactions on the platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Briefcase className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Applied for Software Engineer Internship</p>
                            <p className="text-xs text-muted-foreground">at TechCorp</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                      <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Updated your resume</p>
                            <p className="text-xs text-muted-foreground">John_Doe_Resume_2023.pdf</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">5 hours ago</p>
                      </div>
                      <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Calendar className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Scheduled an interview</p>
                            <p className="text-xs text-muted-foreground">with DataSystems</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <TrendingUp className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Completed skill assessment</p>
                            <p className="text-xs text-muted-foreground">React Developer Test</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Upcoming Deadlines</CardTitle>
                    <CardDescription>Application deadlines for saved internships</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Frontend Developer Intern</p>
                          <p className="text-xs text-muted-foreground">TechCorp</p>
                        </div>
                        <Badge variant="outline" className="text-destructive border-destructive">
                          2 days left
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">UI/UX Design Intern</p>
                          <p className="text-xs text-muted-foreground">CreativeMinds</p>
                        </div>
                        <Badge variant="outline">5 days left</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Data Science Intern</p>
                          <p className="text-xs text-muted-foreground">AnalyticsPro</p>
                        </div>
                        <Badge variant="outline">1 week left</Badge>
                      </div>
                      <Button variant="outline" className="w-full mt-4" size="sm">
                        <span>View All Deadlines</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Featured Internships */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Featured Internships</h2>
                  <Button variant="outline" size="sm">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Frontend Developer Intern</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        TechCorp
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          San Francisco, CA
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />3 months
                        </div>
                        <Badge className="w-fit mt-2">Remote</Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Apply Now</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Data Science Intern</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        AnalyticsPro
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          Boston, MA
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />3 months
                        </div>
                        <Badge className="w-fit mt-2">Remote</Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Apply Now</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>UI/UX Design Intern</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        CreativeMinds
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          Chicago, IL
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />4 months
                        </div>
                        <Badge className="w-fit mt-2">Hybrid</Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Apply Now</Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="internships">
              <InternshipList />
            </TabsContent>

            <TabsContent value="resume" className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
                  <ResumeUpload />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-4">Your Resumes</h2>
                  <ResumeView />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}