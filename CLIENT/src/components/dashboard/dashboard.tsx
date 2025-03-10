"use client"

import { useState } from "react"
import { UserNav } from "@/components/dashboard/user-nav"
import { MainNav } from "@/components/dashboard/main-nav"
import { InternshipList } from "@/components/dashboard/internship-list"
import { BasicSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Search } from "@/components/dashboard/search"
import { Button } from "@/components/ui/button"
import { Filter, Menu, BarChart, Bell, PieChart } from "lucide-react"

export default function Dashboard() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const userRole = "admin"; // This can be dynamically set based on the logged-in user

  return (
    <div className="flex min-h-screen bg-gray-100">
      {sidebarOpen && <BasicSidebar />}
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-white shadow-md px-6">
          <Button variant="ghost" onClick={() => setSidebarOpen(!sidebarOpen)} className="flex items-center gap-2">
            <Menu className="h-5 w-5" />
          </Button>
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <Bell className="h-5 w-5 text-gray-600" />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-6 space-y-6">
          {/* Dashboard Stats */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-white rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Total Internships</h2>
                <p className="text-3xl font-bold">120</p>
              </div>
              <BarChart className="h-8 w-8 text-indigo-600" />
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Active Users</h2>
                <p className="text-3xl font-bold">350</p>
              </div>
              <PieChart className="h-8 w-8 text-green-600" />
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Applications</h2>
                <p className="text-3xl font-bold">450</p>
              </div>
              <BarChart className="h-8 w-8 text-blue-600" />
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Pending Approvals</h2>
                <p className="text-3xl font-bold">30</p>
              </div>
              <PieChart className="h-8 w-8 text-red-600" />
            </div>
          </section>
          
          {/* Filter Section */}
          {userRole === "admin" && (
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Internships</h1>
              <Button variant="outline" onClick={() => setFilterOpen(!filterOpen)} className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          )}

          {filterOpen && (
            <div className="p-4 border rounded-lg bg-white shadow-md">
              <p className="text-sm text-gray-600">Filter options will go here</p>
            </div>
          )}

          <InternshipList />
        </main>
      </div>
    </div>
  )
}
