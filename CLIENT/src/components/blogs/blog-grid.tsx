"use client"

import { useEffect, useState } from "react"
import { BlogCard } from "@/components/blogs/blog-card"

export function BlogGrid() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("http://localhost:8000/api/fetchblogs")
        console.log(response)
        if (!response.ok) {
          throw new Error("Failed to fetch blogs")
        }
        const data = await response.json()
        setBlogs(data)
      } catch (error) {
        console.error("Error fetching blogs:", error)
      }
    }
    fetchBlogs()
  }, [])

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  )
}

