"use client"

import { useState } from "react"
import { UserNav } from "@/components/dashboard/user-nav"
import { MainNav } from "@/components/dashboard/main-nav"
import  InternshipList  from "../../components/dashboard/internship-list"
import { BasicSidebar } from "@/components/dashboard/dashboard-sidebar"
import { BlogHeader } from "@/components/dashboard/search"
import { Button } from "@/components/ui/button"
import { Filter, Menu, Activity, BarChart, FileText } from "lucide-react"

export default function Dashboard() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-background">
      <BasicSidebar/>
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-6">
          <Button variant="outline" onClick={() => setSidebarOpen(!sidebarOpen)} className="flex items-center gap-2">
            <Menu className="h-4 w-4" />
          </Button> */
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <BlogHeader />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Internships</h1>
            <Button variant="outline" onClick={() => setFilterOpen(!filterOpen)} className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div> */
          {filterOpen && (
            <div className="mb-6 p-4 border rounded-lg bg-white shadow-sm">
              {/* Add filter options here */}
              <p>Filter options will go here</p>
            </div>
          )}
          
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Total Internships</h2>
                <BarChart className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">120</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Applications</h2>
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">45</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Active Users</h2>
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">1,200</p>
            </div>
          </div>

          {/* Recent Activities Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <ul className="space-y-4">
                <li className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 font-semibold">John Doe</p>
                    <p className="text-gray-600 text-sm">Applied for Software Engineer Internship</p>
                  </div>
                  <p className="text-gray-500 text-sm">2 hours ago</p>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 font-semibold">Jane Smith</p>
                    <p className="text-gray-600 text-sm">Updated profile information</p>
                  </div>
                  <p className="text-gray-500 text-sm">5 hours ago</p>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 font-semibold">Michael Brown</p>
                    <p className="text-gray-600 text-sm">Posted a new blog</p>
                  </div>
                  <p className="text-gray-500 text-sm">1 day ago</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Internship List Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Internships</h2>
            <InternshipList />
          </div>

          {/* Quick Links Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Button variant="outline" className="w-full">View All Internships</Button>
              <Button variant="outline" className="w-full">Create New Internship</Button>
              <Button variant="outline" className="w-full">Manage Applications</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

