"use client"

import { useState } from "react"
import { UserNav } from "@/components/dashboard/user-nav"
import { MainNav } from "@/components/dashboard/main-nav"
import { InternshipList } from "@/components/dashboard/internship-list"
import { BasicSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Search } from "@/components/dashboard/search"
import { Button } from "@/components/ui/button"
import { Filter, Menu } from "lucide-react"
import { DarkModeToggle } from "../dashboard/DarkModeToggle"

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
          </Button>
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
            <DarkModeToggle /> {/* ✅ Added Dark Mode Toggle */}
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Internships</h1>
            <Button variant="outline" onClick={() => setFilterOpen(!filterOpen)} className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
          {filterOpen && (
            <div className="mb-6 p-4 border rounded-lg bg-white shadow-sm">
              <p>Filter options will go here</p>
            </div>
          )}
          <InternshipList />
        </main>
      </div>
    </div>
  )
}
