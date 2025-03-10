import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { BlogGrid } from "@/components/blogs/blog-grid"
import { BlogHeader } from "@/components/blogs/blog-header"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

// Mock data for blogs
const blogs = [
  {
    id: "1",
    title: "How to Ace Your Technical Interview",
    excerpt: "Learn the strategies and techniques to excel in your next technical interview.",
    author: "Jane Smith",
    date: "2023-05-15",
    readTime: "8 min read",
    category: "Interviews",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Building a Strong Developer Portfolio",
    excerpt: "Tips for creating a portfolio that will impress potential employers.",
    author: "John Doe",
    date: "2023-06-02",
    readTime: "6 min read",
    category: "Career Growth",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "The Future of Remote Work in Tech",
    excerpt: "How remote work is changing the tech industry and what it means for job seekers.",
    author: "Alex Johnson",
    date: "2023-06-10",
    readTime: "10 min read",
    category: "Industry Trends",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    title: "Mastering Data Structures and Algorithms",
    excerpt: "A comprehensive guide to understanding and implementing key data structures and algorithms.",
    author: "Michael Chen",
    date: "2023-06-18",
    readTime: "12 min read",
    category: "Technical Skills",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "5",
    title: "Negotiating Your Tech Salary",
    excerpt: "Strategies for negotiating the best compensation package for your skills and experience.",
    author: "Sarah Williams",
    date: "2023-06-25",
    readTime: "7 min read",
    category: "Career Growth",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "6",
    title: "From Bootcamp to Full-Time Developer",
    excerpt: "A success story and guide for transitioning from a coding bootcamp to a full-time role.",
    author: "David Lee",
    date: "2023-07-05",
    readTime: "9 min read",
    category: "Success Stories",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function BlogsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 md:gap-8 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Tech Career Blog</h1>
          <Link href="/user/blogs/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </Link>
        </div>

        <BlogHeader
          title="Latest Articles"
          description="Insights, tips, and strategies to help you succeed in your tech career"
        />

        <BlogGrid blogs={blogs} />

        <div className="flex justify-center mt-8">
          <Button variant="outline">Load More Articles</Button>
        </div>
      </div>
    </DashboardLayout>
  )
}

