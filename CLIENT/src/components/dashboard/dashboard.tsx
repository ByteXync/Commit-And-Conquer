"use client"

import { useState } from "react"
import { UserNav } from "@/components/dashboard/user-nav"
import { MainNav } from "@/components/dashboard/main-nav"
import { InternshipList } from "@/components/dashboard/internship-list"
import { BasicSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Search } from "@/components/dashboard/search"
import { Button } from "@/components/ui/button"
import { Filter, Menu, Plus, BriefcaseBusiness } from "lucide-react"

export default function Dashboard() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Sidebar with transition */}
      <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-0 -ml-6'} hidden md:block`}>
        <BasicSidebar />
      </div>
      
      <div className="flex-1 flex flex-col">
        {/* Enhanced header */}
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-6 shadow-sm">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="mr-4 md:flex hidden"
          >
            <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="mr-4 md:hidden flex"
          >
            <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </Button>
          
          <MainNav />
          
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center">
              <BriefcaseBusiness className="h-8 w-8 mr-3 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Internships</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => setFilterOpen(!filterOpen)} 
                className={`flex items-center gap-2 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 ${filterOpen ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              
              <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                <Plus className="h-4 w-4" />
                New Internship
              </Button>
            </div>
          </div>
          
          {/* Filter section with animation */}
          {filterOpen && (
            <div className="mb-6 p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Location</h3>
                  <select className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm">
                    <option>All Locations</option>
                    <option>Remote</option>
                    <option>New York</option>
                    <option>San Francisco</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Duration</h3>
                  <select className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm">
                    <option>Any Duration</option>
                    <option>1-3 months</option>
                    <option>3-6 months</option>
                    <option>6+ months</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Field</h3>
                  <select className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm">
                    <option>All Fields</option>
                    <option>Software Engineering</option>
                    <option>Design</option>
                    <option>Marketing</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {/* Main content area with subtle shadow and rounded corners */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-1">
            <InternshipList />
          </div>
        </main>
      </div>
    </div>
  )
}