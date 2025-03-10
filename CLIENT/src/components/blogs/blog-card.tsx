import Link from "next/link"
import { Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface BlogPost {
  id: number
  title: string
  content: { [key: string]: string }
  author: string
  authorImage: string
  date: string
  imageUrl: string
}

interface BlogCardProps {
  blog: BlogPost
}

export function BlogCard({ blog }: BlogCardProps) {
  const contentPreview = Object.values(blog.content).slice(0, 1).join(" ")

  return (
    <Link href={`/blogs/${blog.id}`}>
      <Card className="overflow-hidden transition-all transform hover:scale-105 hover:shadow-lg rounded-xl h-[550px]">
        <CardHeader className="p-4 pb-0 flex flex-col relative"> {/* make card header relative */}
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-48 object-cover mb-4 rounded-md object-top"
          />
          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-md"></div> {/* image overlay */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              <span className="text-sm font-OpenSans">{new Date(blog.date).toLocaleDateString()}</span> {/* Increase font-size */}
            </div>
          </div>
          <h3 className="line-clamp-2 mt-4 text-xl font-semibold font-Poppins">{blog.title}</h3>
        </CardHeader>
        <CardContent className="p-4 pt-2 flex-grow">
          <p className="line-clamp-3 text-sm text-muted-foreground">{contentPreview}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-4">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={blog.authorImage} alt={blog.author} />
              <AvatarFallback>{blog.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium font-OpenSans">{blog.author}</span> {/* Increase font-size */}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
