"use client"

import { useEffect, useState } from "react"
import { BlogCard } from "@/components/blogs/blog-card"

const dummyBlogs = [
  {
    id: 1,
    title: "The Future of AI in Web Development",
    content: {
      paragraph1:
        "Artificial intelligence is rapidly transforming the landscape of web development. From automated code generation to intelligent testing, AI-powered tools are becoming indispensable for developers.",
      paragraph2:
        "Learn how to leverage AI to streamline your workflow, improve code quality, and create more engaging user experiences.",
    },
    author: "Alice Wonderland",
    authorImage: "https://i.pravatar.cc/150?img=1", // Dummy profile image
    date: "2025-03-05",
    imageUrl: "https://th.bing.com/th/id/OIP.VdYRn1q-BfNBic9m9ytbZwHaEi?rs=1&pid=ImgDetMain", // Dummy blog image
  },
  {
    id: 2,
    title: "Mastering React Hooks: A Practical Guide",
    content: {
      paragraph1:
        "React Hooks have revolutionized the way we write React components. This guide provides a comprehensive overview of the most essential hooks and how to use them effectively.",
      paragraph2:
        "Explore useState, useEffect, useContext, and more with real-world examples and best practices.",
    },
    author: "Bob The Builder",
    authorImage: "https://i.pravatar.cc/150?img=2", // Dummy profile image
    date: "2025-03-01",
    imageUrl: "https://th.bing.com/th/id/OIP.DAOY4JV1MATGoNO5Y0qs9AHaEK?rs=1&pid=ImgDetMain", // Dummy blog image
  },
  {
    id: 3,
    title: "The Ultimate Guide to Tailwind CSS",
    content: {
      paragraph1:
        "Tailwind CSS is a utility-first CSS framework that enables rapid UI development. This guide covers everything you need to know to get started with Tailwind CSS and build beautiful, responsive websites.",
      paragraph2:
        "Discover the power of utility classes, learn how to customize your theme, and explore advanced techniques for creating complex layouts.",
    },
    author: "Charlie Chaplin",
    authorImage: "https://i.pravatar.cc/150?img=3", // Dummy profile image
    date: "2025-02-25",
    imageUrl: "https://th.bing.com/th/id/OIP.rew---l6afRP0CgBYSaVBwHaDt?rs=1&pid=ImgDetMain", // Dummy blog image
  },
]

export function BlogGrid() {
  const [blogs, setBlogs] = useState(dummyBlogs) // Initialize with dummy data
  // Remove the useEffect and fetch

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-12">No blogs available at the moment.</p>
        )}
      </div>
    </div>
  )
}
