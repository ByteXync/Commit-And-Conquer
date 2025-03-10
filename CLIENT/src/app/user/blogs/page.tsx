import type { Metadata } from "next"
import { BlogPage } from "@/components/blogs/blog-page"

export const metadata: Metadata = {
  title: "Blog Posts | Internship Portal",
  description: "Browse our latest blog posts about internship tips and career advice",
}

export default function Page() {
  return <BlogPage />
}

