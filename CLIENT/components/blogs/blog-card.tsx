import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User } from "lucide-react"

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

interface BlogCardProps {
  blog: Blog
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blogs/${blog.id}`}>
      <Card className="overflow-hidden h-full transition-all hover:shadow-md">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline">{blog.category}</Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              {blog.readTime}
            </div>
          </div>
          <h3 className="font-bold text-lg line-clamp-2 mt-2">{blog.title}</h3>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-muted-foreground text-sm line-clamp-3">{blog.excerpt}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="mr-1 h-3 w-3" />
            <span>{blog.author}</span>
            <span className="mx-2">•</span>
            <span>{blog.date}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

