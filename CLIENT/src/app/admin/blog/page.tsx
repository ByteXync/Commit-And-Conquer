"use client"

import { useState } from "react"
import { BlogForm } from "@/components/blog/blog-form"
import { BasicSidebar } from "@/components/dashboard/dashboard-sidebar"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { toast } from "sonner"

// Initialize Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyCLzWWQOLDUcUAAn4ZAxbwaSG5Srp5DsDU")

export default function AdminBlogPage() {
  const [isChecking, setIsChecking] = useState(false)

  const checkContent = async (content: { title: string; content: string }) => {
    setIsChecking(true)
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })
      
      const prompt = `
        Analyze the following blog content for any sensitive, inappropriate, or offensive material.
        Consider the following aspects:
        1. Professional tone
        2. Appropriate language
        3. Non-discriminatory content
        4. Educational value
        5. Relevance to internships and career development

        Title: ${content.title}
        Content: ${content.content}

        Respond with a JSON object containing:
        {
          "isSafe": boolean,
          "reason": string,
          "suggestions": string[]
        }
      `

      const result = await model.generateContent(prompt)
      const response = result.response.text()
      
      try {
        const parsedResponse = JSON.parse(response)
        if (!parsedResponse.isSafe) {
          toast.error(`Content check failed: ${parsedResponse.reason}`)
          parsedResponse.suggestions.forEach((suggestion: string) => {
            toast.info(`Suggestion: ${suggestion}`)
          })
          return false
        }
        toast.success("Content approved! Safe to publish.")
        return true
      } catch (e) {
        toast.error("Could not verify content safety")
        return false
      }
    } catch (error) {
      console.error("Error checking content:", error)
      toast.error("Failed to check content safety")
      return false
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <BasicSidebar />
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-5 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Create New Blog Post</h1>
            {isChecking && (
              <div className="text-sm text-blue-600">
                Checking content safety...
              </div>
            )}
          </div>
          <BlogForm onCheck={checkContent} />
        </div>
      </div>
    </div>
  )
}
