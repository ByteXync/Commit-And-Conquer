import { BlogCard } from "./blog-card"

interface Blog {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
}

interface BlogGridProps {
  blogs: Blog[]
}

export function BlogGrid({ blogs }: BlogGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

