"use client"

import { useEffect, useState } from "react"
import { BlogCard } from "@/components/blogs/blog-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'

// Mock data for demonstration
const mockBlogs = [
  {
    id: 1,
    title: "Getting Started with Next.js and Tailwind CSS",
    content: { 
      p1: "Learn how to set up a new project with Next.js and Tailwind CSS. This comprehensive guide covers everything from installation to deployment.",
      p2: "Next.js is a React framework that enables server-side rendering and static site generation. Tailwind CSS is a utility-first CSS framework that makes styling your applications a breeze."
    },
    author: "Jane Smith",
    date: "2025-03-08",
    category: "Development",
    tags: ["Next.js", "Tailwind", "React"],
    readTime: "8 min read",
    likes: 87,
    views: 1243,
    comments: 15,
    image: "/vercel.svg?height=200&width=400&text=Next.js+%26+Tailwind"
  },
  {
    id: 2,
    title: "Mastering TypeScript: Tips and Tricks",
    content: { 
      p1: "Discover advanced TypeScript techniques that will improve your code quality and developer experience.",
      p2: "TypeScript adds static typing to JavaScript, making your code more robust and easier to maintain. This article explores some lesser-known features of TypeScript."
    },
    author: "John Doe",
    date: "2025-03-05",
    category: "Development",
    tags: ["TypeScript", "JavaScript"],
    readTime: "6 min read",
    likes: 62,
    views: 876,
    comments: 9,
    image: "/vercel.svg?height=200&width=400&text=TypeScript"
  },
  {
    id: 3,
    title: "UI Design Principles for Developers",
    content: { 
      p1: "Learn the fundamental UI design principles that every developer should know to create better user interfaces.",
      p2: "Good UI design is essential for creating applications that users love. This article covers color theory, typography, layout, and more."
    },
    author: "Alex Johnson",
    date: "2025-03-02",
    category: "Design",
    tags: ["UI/UX", "Design", "CSS"],
    readTime: "10 min read",
    likes: 124,
    views: 2156,
    comments: 23,
    image: "/vercel.svg?height=200&width=400&text=UI+Design"
  },
  {
    id: 4,
    title: "Building Accessible Web Applications",
    content: { 
      p1: "Accessibility is not just a nice-to-have feature—it's essential. Learn how to make your web applications accessible to everyone.",
      p2: "This guide covers ARIA attributes, keyboard navigation, color contrast, and other important aspects of web accessibility."
    },
    author: "Sarah Miller",
    date: "2025-02-28",
    category: "Development",
    tags: ["Accessibility", "HTML", "JavaScript"],
    readTime: "7 min read",
    likes: 93,
    views: 1567,
    comments: 12,
    image: "/vercel.svg?height=200&width=400&text=Accessibility"
  },
  {
    id: 5,
    title: "State Management in React: Context API vs. Redux",
    content: { 
      p1: "Compare different state management approaches in React and learn when to use each one.",
      p2: "This article explores the pros and cons of using React's built-in Context API versus Redux for state management in your applications."
    },
    author: "Michael Brown",
    date: "2025-02-25",
    category: "Development",
    tags: ["React", "Redux", "JavaScript"],
    readTime: "9 min read",
    likes: 78,
    views: 1342,
    comments: 18,
    image: "/vercel.svg?height=200&width=400&text=React+State"
  },
  {
    id: 6,
    title: "Optimizing Website Performance",
    content: { 
      p1: "Learn techniques to improve your website's loading speed and overall performance.",
      p2: "This comprehensive guide covers image optimization, code splitting, lazy loading, and other performance optimization techniques."
    },
    author: "Emily Chen",
    date: "2025-02-20",
    category: "Development",
    tags: ["Performance", "JavaScript", "Web"],
    readTime: "11 min read",
    likes: 105,
    views: 1876,
    comments: 14,
    image: "/vercel.svg?height=200&width=400&text=Performance"
  },
  {
    id: 7,
    title: "Introduction to GraphQL",
    content: { 
      p1: "Learn how GraphQL can revolutionize your API development and data fetching strategies.",
      p2: "This introduction covers the basics of GraphQL, how it differs from REST, and how to implement it in your applications."
    },
    author: "David Wilson",
    date: "2025-02-15",
    category: "Development",
    tags: ["GraphQL", "API", "JavaScript"],
    readTime: "8 min read",
    likes: 89,
    views: 1432,
    comments: 16,
    image: "/vercel.svg?height=200&width=400&text=GraphQL"
  },
  {
    id: 8,
    title: "Responsive Design Best Practices",
    content: { 
      p1: "Create websites that look great on any device with these responsive design techniques.",
      p2: "From mobile-first approaches to advanced CSS grid layouts, this guide covers everything you need to know about responsive web design."
    },
    author: "Lisa Taylor",
    date: "2025-02-10",
    category: "Design",
    tags: ["CSS", "Responsive", "Design"],
    readTime: "7 min read",
    likes: 112,
    views: 1987,
    comments: 21,
    image: "/vercel.svg?height=200&width=400&text=Responsive"
  }
];

interface BlogGridProps {
  isLoading?: boolean;
  searchQuery?: string;
  selectedCategories?: number[];
  selectedTags?: number[];
  sortBy?: 'recent' | 'popular';
}

export function BlogGrid({ 
  isLoading = false, 
  searchQuery = "", 
  selectedCategories = [], 
  selectedTags = [],
  sortBy = 'recent'
}: BlogGridProps) {
  const [blogs, setBlogs] = useState<any[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(6)
  const [loadingMore, setLoadingMore] = useState(false)

  // Initial data loading
  useEffect(() => {
    // Simulate API call with a delay
    const fetchBlogs = async () => {
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch("http://localhost:8000/api/fetchblogs")
        // const data = await response.json()
        
        // Using mock data for demonstration
        setTimeout(() => {
          setBlogs(mockBlogs)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching blogs:", error)
        setLoading(false)
      }
    }
    
    if (isLoading) {
      setLoading(true)
    } else {
      fetchBlogs()
    }
  }, [isLoading])

  // Filter and sort blogs based on props
  useEffect(() => {
    if (blogs.length === 0) return;
    
    let result = [...blogs];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(blog => 
        blog.title.toLowerCase().includes(query) || 
        Object.values(blog.content).some((content: any) => 
          typeof content === 'string' && content.toLowerCase().includes(query)
        ) ||
        blog.category.toLowerCase().includes(query) ||
        (blog.tags && blog.tags.some((tag: string) => tag.toLowerCase().includes(query)))
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      // In a real app, you would match category IDs
      // Here we're just simulating with the category names
      const categoryNames = selectedCategories.map(id => {
        switch(id) {
          case 1: return "Development";
          case 2: return "Design";
          case 3: return "Business";
          case 4: return "Marketing";
          case 5: return "Productivity";
          case 6: return "Technology";
          case 7: return "Career";
          case 8: return "AI & ML";
          default: return "";
        }
      }).filter(Boolean);
      
      if (categoryNames.length > 0) {
        result = result.filter(blog => categoryNames.includes(blog.category));
      }
    }
    
    // Apply tag filter
    if (selectedTags.length > 0) {
      // In a real app, you would match tag IDs
      // Here we're just simulating with the tag names
      const tagNames = selectedTags.map(id => {
        switch(id) {
          case 1: return "JavaScript";
          case 2: return "React";
          case 3: return "Next.js";
          case 4: return "TypeScript";
          case 5: return "UI/UX";
          case 6: return "CSS";
          case 7: return "Tailwind";
          case 8: return "Node.js";
          case 9: return "GraphQL";
          case 10: return "API";
          case 11: return "Performance";
          case 12: return "Accessibility";
          default: return "";
        }
      }).filter(Boolean);
      
      if (tagNames.length > 0) {
        result = result.filter(blog => 
          blog.tags && blog.tags.some((tag:any) => tagNames.includes(tag as typeof tagNames[number]))
        );
      }
    }
    
    // Apply sorting
    if (sortBy === 'recent') {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'popular') {
      result.sort((a, b) => b.views - a.views);
    }
    
    setFilteredBlogs(result);
    setVisibleCount(Math.min(6, result.length));
  }, [blogs, searchQuery, selectedCategories, selectedTags, sortBy]);

  const loadMore = () => {
    setLoadingMore(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 3, filteredBlogs.length));
      setLoadingMore(false);
    }, 800);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    )
  }

  if (filteredBlogs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No matching articles found</h3>
        <p className="text-muted-foreground mb-6">Try adjusting your search or filters to find what you're looking for.</p>
        <Button variant="outline" onClick={() => {
          // Clear filters logic would go here
        }}>Clear all filters</Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.slice(0, visibleCount).map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      
      {visibleCount < filteredBlogs.length && (
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={loadMore}
            disabled={loadingMore}
          >
            {loadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              `Load More (${filteredBlogs.length - visibleCount} remaining)`
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
