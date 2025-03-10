import Link from "next/link"
import { Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface BlogPost {
  id: number
  title: string
  content: { [key: string]: string }
  author: string
  date: string
}

interface BlogCardProps {
  blog: BlogPost
}

export function BlogCard({ blog }: BlogCardProps) {
  const contentPreview = Object.values(blog.content).slice(0, 1).join(" ")

  return (
    <Link href={`/blogs/${blog.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              {new Date(blog.date).toLocaleDateString()}
            </div>
          </div>
          <h3 className="line-clamp-2 mt-2 text-xl font-semibold">{blog.title}</h3>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <p className="line-clamp-3 text-sm text-muted-foreground">{contentPreview}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-4">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder.svg" alt={blog.author} />
              <AvatarFallback>{blog.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium">{blog.author}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

