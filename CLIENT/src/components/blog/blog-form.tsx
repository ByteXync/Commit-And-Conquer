"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ImagePlus } from "lucide-react"

export function BlogForm() {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image: null as File | null,
    imagePreview: "",
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement blog post submission
    console.log("Form submitted:", formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Blog Title</Label>
              <Input
                id="title"
                placeholder="Enter blog title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="interview">Interview Tips</SelectItem>
                  <SelectItem value="career">Career Development</SelectItem>
                  <SelectItem value="remote">Remote Work</SelectItem>
                  <SelectItem value="portfolio">Portfolio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="excerpt">Short Excerpt</Label>
              <Textarea
                id="excerpt"
                placeholder="Enter a brief description"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="mt-1 h-20"
              />
            </div>

            <div>
              <Label htmlFor="content">Blog Content</Label>
              <Textarea
                id="content"
                placeholder="Write your blog content here..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="mt-1 min-h-[300px]"
              />
            </div>

            <div>
              <Label htmlFor="image">Featured Image</Label>
              <div className="mt-1 flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("image")?.click()}
                  className="flex items-center gap-2"
                >
                  <ImagePlus className="h-4 w-4" />
                  Upload Image
                </Button>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {formData.imagePreview && (
                  <div className="relative w-20 h-20">
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Publish Blog
        </Button>
        <Button type="button" variant="outline">
          Save as Draft
        </Button>
      </div>
    </form>
  )
}
