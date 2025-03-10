import Link from "next/link"
import { Calendar, Eye, MessageSquare, Share2, ThumbsUp } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface BlogPost {
  id: number
  title: string
  content: { [key: string]: string }
  author: string
  date: string
  category?: string
  tags?: string[]
  readTime?: string
  likes?: number
  views?: number
  comments?: number
  image?: string
}

interface BlogCardProps {
  blog: BlogPost
}

export function BlogCard({ blog }: BlogCardProps) {
  const contentPreview = Object.values(blog.content).slice(0, 1).join(" ")
  const category = blog.category || "General"
  const readTime = blog.readTime || "5 min read"
  const likes = blog.likes || Math.floor(Math.random() * 100)
  const views = blog.views || Math.floor(Math.random() * 1000)
  const comments = blog.comments || Math.floor(Math.random() * 20)
  const image = blog.image || "/vercel.svg?height=200&width=400"
  
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // In a real app, you would use the Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: contentPreview,
        url: `/blogs/${blog.id}`,
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(`${window.location.origin}/blogs/${blog.id}`);
      toast.success("Link copied to clipboard", {
        description: "Share this article with your friends and colleagues."
      });
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image || "/vercel.svg"} 
          alt={blog.title} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm hover:bg-background/80">
          {category}
        </Badge>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share</span>
        </Button>
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            {new Date(blog.date).toLocaleDateString()}
          </div>
          <span>{readTime}</span>
        </div>
        <h3 className="line-clamp-2 mt-2 text-xl font-semibold group-hover:text-primary transition-colors">{blog.title}</h3>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-1">
        <p className="line-clamp-3 text-sm text-muted-foreground">{contentPreview}</p>
        
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {blog.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{blog.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src="/vercel.svg" alt={blog.author} />
            <AvatarFallback>{blog.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium">{blog.author}</span>
        </div>
        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
          <div className="flex items-center">
            <ThumbsUp className="mr-1 h-3 w-3" />
            {likes}
          </div>
          <div className="flex items-center">
            <Eye className="mr-1 h-3 w-3" />
            {views}
          </div>
          <div className="flex items-center">
            <MessageSquare className="mr-1 h-3 w-3" />
            {comments}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
