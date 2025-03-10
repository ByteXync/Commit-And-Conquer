"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ImagePlus } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

// Simple blog form with local content checking and Mistral API integration
export function BlogForm() {
  // Form state
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }
  
  // Use both local and API-based content checking
  const checkContent = async (text: string): Promise<boolean> => {
    // First check locally for obvious issues
    const containsOffensiveContent = checkContentLocally(text);
    if (containsOffensiveContent) {
      return false;
    }
    
    // If local check passes and API key is available, try API check
    const apiKey = process.env.NEXT_PUBLIC_MISTRAL_API_KEY;
    if (apiKey) {
      try {
        return await checkContentWithMistral(text, apiKey);
      } catch (error) {
        console.error("Mistral API error:", error);
        // Fall back to local check result on API failure
        return true;
      }
    }
    
    // If no API key, just use local check result
    return true;
  }
  
  // Local content checking - robust profanity filter
  const checkContentLocally = (text: string): boolean => {
    const normalizedText = text.toLowerCase();
    
    // Comprehensive profanity list - add more words as needed
    const offensiveWords = [
      // Common profanity
      'fuck', 'shit', 'ass', 'bitch', 'bastard', 'damn', 'cunt', 'dick', 'cock', 'pussy', 'whore',
      // Offensive slurs
      'chut', 'bhadwe', 'madarchod', 'behenchod', 'randi',
      // Add other languages and variations
      'gand', 'lund', 'lauda', 'bc', 'mc', 'bsdk',
      // Generic offensive terms
      'hate', 'kill', 'violent', 'suicide', 'terrorist', 'abuse', 'explicit'
    ];
    
    // Check for offensive words
    return offensiveWords.some(word => normalizedText.includes(word));
  }
  
  // API-based content checking with Mistral
  const checkContentWithMistral = async (text: string, apiKey: string): Promise<boolean> => {
    try {
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "mistral-small",
          messages: [
            {
              role: "system",
              content: "You are a content moderation assistant. Analyze the text and respond ONLY with 'SAFE' if the content is appropriate or 'UNSAFE' if it contains inappropriate, offensive, explicit, or harmful material."
            },
            {
              role: "user",
              content: `Check if this text is appropriate: "${text}"`
            }
          ],
          max_tokens: 10,
          temperature: 0
        })
      });

      if (!response.ok) {
        throw new Error(`Mistral API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Mistral response:", data);
      
      const responseText = data?.choices?.[0]?.message?.content || '';
      console.log("Moderation result:", responseText);
      
      return responseText.toUpperCase().includes('SAFE') && !responseText.toUpperCase().includes('UNSAFE');
    } catch (error) {
      console.error("Mistral API check failed:", error);
      throw error;
    }
  }
  
  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!title || !content) {
      toast.error("Title and content are required")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Check combined content with both methods
      const combinedContent = `${title} ${excerpt} ${content}`;
      const isContentSafe = await checkContent(combinedContent);
      
      if (!isContentSafe) {
        toast.error("Content contains inappropriate language")
        return
      }
      
      // If we get here, content is safe
      toast.success("Blog post checked and approved!")
      console.log("Blog submitted:", { title, category, excerpt, content, image })
      
      // Reset form after successful submission
      setTitle("")
      setContent("")
      setCategory("")
      setExcerpt("")
      setImage(null)
      setImagePreview("")
      
    } catch (error) {
      toast.error("Error processing blog post")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Title input */}
            <div>
              <Label htmlFor="title">Blog Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                className="mt-1"
              />
            </div>
            
            {/* Category select */}
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
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
            
            {/* Excerpt textarea */}
            <div>
              <Label htmlFor="excerpt">Short Excerpt</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Enter a brief description"
                className="mt-1 h-20"
              />
            </div>
            
            {/* Main content textarea */}
            <div>
              <Label htmlFor="content">Blog Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog content here..."
                className="mt-1 min-h-[300px]"
              />
            </div>
            
            {/* Image upload */}
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
                {imagePreview && (
                  <div className="relative w-20 h-20">
                    <img
                      src={imagePreview}
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
      
      {/* Form buttons */}
      <div className="flex gap-4">
        <Button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Checking content..." : "Publish Blog"}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          disabled={isSubmitting}
        >
          Save as Draft
        </Button>
      </div>
    </form>
  )
}
