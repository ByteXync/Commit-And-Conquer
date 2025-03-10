"use client";

import { useEffect, useState } from "react";
import { BlogCard } from "@/components/blogs/blog-card";

const DUMMY_BLOGS = [
  {
    id: 1,
    title: "How to Ace Your Technical Internship Interview",
    excerpt: "Learn the best practices and tips for preparing for your technical internship interviews...",
    author: "John Smith",
    date: "2024-02-15",
    category: "Interview Tips",
    readTime: "5 min read",
    views: 1200,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "Top 10 Skills Every Software Engineering Intern Needs",
    excerpt: "Discover the essential skills that will make you stand out during your software engineering internship...",
    author: "Emily Johnson",
    date: "2024-02-14",
    category: "Career Development",
    readTime: "8 min read",
    views: 1500,
    image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "Remote Internships: Making the Most of Virtual Work",
    excerpt: "Tips and strategies for succeeding in a remote internship environment...",
    author: "Michael Brown",
    date: "2024-02-13",
    category: "Remote Work",
    readTime: "6 min read",
    views: 980,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    title: "Building Your Portfolio During Internship",
    excerpt: "Learn how to document and showcase your internship projects effectively...",
    author: "Sarah Wilson",
    date: "2024-02-12",
    category: "Portfolio",
    readTime: "7 min read",
    views: 850,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60"
  }
]

export function BlogGrid() {
  const [blogs] = useState(DUMMY_BLOGS);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <div key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-48 overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-md">
                {blog.category}
              </span>
              <span className="text-sm text-gray-500">{blog.readTime}</span>
            </div>
            <h3 className="text-xl font-semibold line-clamp-2 hover:text-blue-600 cursor-pointer">
              {blog.title}
            </h3>
            <p className="text-gray-600 line-clamp-3 mb-4">
              {blog.excerpt}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{new Date(blog.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{blog.views} views</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
