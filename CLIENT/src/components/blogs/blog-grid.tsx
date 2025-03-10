import { useEffect, useState } from "react";
import { BlogCard } from "@/components/blogs/blog-card";
import { BlogPost } from "@/types/blog-post"; // Import the BlogPost interface

interface Blog extends BlogPost {
  id: number;
  // Add other properties of the blog object here
}

export function BlogGrid() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("http://localhost:3000/api/fetchblogs");
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}