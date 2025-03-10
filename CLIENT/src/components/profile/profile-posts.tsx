import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Clock } from 'lucide-react'

const posts = [
  { 
    id: 1, 
    title: "Understanding React Hooks", 
    date: "March 8, 2025",
    category: "React",
    excerpt: "Learn how to use React hooks effectively in your applications."
  },
  { 
    id: 2, 
    title: "A Guide to Next.js 13", 
    date: "February 25, 2025",
    category: "Next.js",
    excerpt: "Explore the new features in Next.js 13 and how to use them."
  },
  { 
    id: 3, 
    title: "Styling with Tailwind CSS", 
    date: "January 15, 2025",
    category: "CSS",
    excerpt: "Master the art of styling with utility-first CSS framework."
  },
]

export function ProfilePosts() {
  return (
    <Card className="shadow-md border border-border/40 overflow-hidden">
      <CardHeader className="pb-2 border-b bg-muted/30">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-semibold text-primary">Recent Posts</CardTitle>
            <CardDescription>Your published articles</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="text-xs">View All</Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid gap-4">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="flex flex-col p-4 bg-card border border-border/30 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {post.category}
                </Badge>
                <div className="flex items-center text-muted-foreground text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {post.date}
                </div>
              </div>
              <h3 className="font-medium text-lg mb-1">{post.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="self-end group text-xs hover:bg-primary/10 hover:text-primary"
              >
                <Eye className="h-3.5 w-3.5 mr-1 group-hover:text-primary" />
                View Post
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
