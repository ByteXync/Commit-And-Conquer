"use client"

import { BlogForm } from "@/components/blog/blog-form"
import { BasicSidebar } from "@/components/dashboard/dashboard-sidebar"

export default function AdminBlogPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <BasicSidebar />
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-5 py-8">
          <h1 className="text-2xl font-bold mb-6">Create New Blog Post</h1>
          <BlogForm />
        </div>
      </div>
    </div>
  )
}
