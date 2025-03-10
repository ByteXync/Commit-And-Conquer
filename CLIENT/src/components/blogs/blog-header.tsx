"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { UserNav } from "@/components/dashboard/user-nav"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function BlogHeader() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="bg-gray-100 py-6 px-8 shadow-md rounded-xl">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-Poppins">Blog Posts</h2>
          <p className="text-muted-foreground font-OpenSans">Browse our latest articles and insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="w-full pl-8 md:w-[200px] lg:w-[300px] border rounded-md focus:ring-2 focus:ring-primary focus:border-primary h-11 font-OpenSans" // Added h-11
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px] h-11 font-OpenSans">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="font-OpenSans">
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
          <UserNav />
        </div>
      </div>
    </div>
  )
}
