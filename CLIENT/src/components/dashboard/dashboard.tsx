"use client"

import { useState } from "react"
import { UserNav } from "@/components/dashboard/user-nav"
import { MainNav } from "@/components/dashboard/main-nav"
import { InternshipList } from "@/components/dashboard/internship-list"
import { BasicSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Search } from "@/components/dashboard/search"
import { Button } from "@/components/ui/button"
import { Filter, Menu, X } from "lucide-react"

export default function Dashboard() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen w-full bg-gray-100 text-gray-800 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transition-transform transform md:relative md:translate-x-0 bg-gray-800 border-r shadow-lg ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <BasicSidebar />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5 text-gray-800" /> : <Menu className="h-5 w-5 text-gray-800" />}
            </Button>
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <Search />
            <UserNav />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 bg-gray-50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Internships</h1>
            <Button
              variant="outline"
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-200 text-gray-800"
            >
              <Filter className="h-4 w-4 text-gray-800" />
              <span className="text-sm font-medium">Filter</span>
            </Button>
          </div>

          {/* Filter Panel */}
          {filterOpen && (
  <div className="mb-6 rounded-lg bg-gray-800 p-6 shadow-lg text-white">
    <h3 className="text-2xl font-semibold mb-4 text-primary-400">Refine Your Search</h3>
    <p className="text-sm mb-6 text-gray-300">
      Narrow down your options and discover the internships that suit you best. Apply the filters below and get closer to your dream role!
    </p>
    
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-lg font-medium text-gray-200">Where Do You Want to Work?</p>
        <input
          type="text"
          placeholder="Enter your preferred location"
          className="w-full p-3 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="space-y-2">
        <p className="text-lg font-medium text-gray-200">Which Industry Sparks Your Interest?</p>
        <select className="w-full p-3 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
          <option className="text-gray-900">Select an industry</option>
          <option className="text-gray-900">Tech</option>
          <option className="text-gray-900">Marketing</option>
          <option className="text-gray-900">Finance</option>
          <option className="text-gray-900">Design</option>
          <option className="text-gray-900">Human Resources</option>
        </select>
      </div>

      <div className="space-y-2">
        <p className="text-lg font-medium text-gray-200">How Long Do You Want to Stay?</p>
        <select className="w-full p-3 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
          <option className="text-gray-900">Select internship duration</option>
          <option className="text-gray-900">1 month</option>
          <option className="text-gray-900">3 months</option>
          <option className="text-gray-900">6 months</option>
          <option className="text-gray-900">12 months</option>
        </select>
      </div>

      <div className="space-y-2">
        <p className="text-lg font-medium text-gray-200">What’s Your Desired Stipend?</p>
        <input
          type="range"
          min="0"
          max="5000"
          step="100"
          className="w-full text-white"
        />
        <div className="flex justify-between text-sm text-gray-400">
          <span>$0</span>
          <span>$5000</span>
        </div>
      </div>
    </div>

    <p className="text-sm mt-6 text-gray-300">
      Once you’ve set your filters, click the "Apply Filters" button and find the perfect match for your internship journey!
    </p>

    <div className="mt-6 flex justify-end">
      <Button
        variant="outline"
        className="px-6 py-2 text-white bg-primary-600 hover:bg-primary-700 rounded-lg"
      >
        Apply Filters
      </Button>
    </div>
  </div>
)}




          <InternshipList />
        </main>
      </div>
    </div>
  )
}
