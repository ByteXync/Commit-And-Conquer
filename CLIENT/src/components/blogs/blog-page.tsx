"use client"

import { BlogHeader } from "@/components/blogs/blog-header"
import { BlogGrid } from "@/components/blogs/blog-grid"
import { BasicSidebar } from "@/components/dashboard/dashboard-sidebar"

export function BlogPage() {
  return (
    <div className="flex min-h-screen bg-background">
     
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-5 py-8">
          <div className="space-y-8">
            <BlogHeader />
            <BlogGrid />
          </div>
        </div>
      </div>
    </div>
  )
}
