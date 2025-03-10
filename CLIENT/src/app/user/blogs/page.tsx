'use client'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  upvote: number;
}

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/fetchblogs");
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const data: Blog[] = await response.json();
      setBlogs(data);
    } catch (err) {
      setError("Error fetching blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/blogupvote/${id}`, { method: "PATCH" });
      if (!response.ok) throw new Error("Error upvoting blog");
      fetchBlogs(); // Refresh blogs after upvoting
    } catch (err) {
      setError("Error upvoting blog");
    }
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: "your-token", ...formData }),
      });
      if (!response.ok) throw new Error("Error creating blog");
      setModalOpen(false);
      fetchBlogs();
    } catch (err) {
      setError("Error creating blog");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => setModalOpen(true)}>New Blog</Button>
      </div>
      {error && <Alert>{error}</Alert>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <Card key={blog.id} className="border border-gray-300 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-700">{blog.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600"><strong>Author:</strong> {blog.author}</p>
                <p className="text-gray-500"><strong>Date:</strong> {new Date(blog.date).toLocaleDateString()}</p>
                <p className="mt-2">{blog.content}</p>
                <div className="flex justify-between items-center mt-4">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => handleUpvote(blog.id)}>Upvote ({blog.upvote})</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Create New Blog</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateBlog} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} required />
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white" type="submit">Create</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogPage;