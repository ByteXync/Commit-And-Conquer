"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Trash2, CheckCircle, AlertCircle } from "lucide-react"

// Mock data for resumes
const initialResumes = [
  {
    id: "1",
    name: "Software_Developer_Resume.pdf",
    uploadDate: "June 10, 2023",
    size: "420 KB",
    status: "Reviewed",
    score: 85,
  },
  {
    id: "2",
    name: "Frontend_Developer_Resume.pdf",
    uploadDate: "May 25, 2023",
    size: "380 KB",
    status: "Needs Improvement",
    score: 65,
  },
]

export function ResumeUpload() {
  const [resumes, setResumes] = useState(initialResumes)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  useEffect(() => {
    const storedResumes = JSON.parse(localStorage.getItem("userResumes") || "[]")
    if (storedResumes.length > 0) {
      setResumes(storedResumes)
    }
  }, [])

  const handleFileUpload = (files: FileList) => {
    const file = files[0]

    // Check file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ]
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF, DOCX, or TXT file")
      return
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB")
      return
    }

    // In a real app, you would upload the file to a server
    // For now, we'll just simulate adding a new resume
    const newResume = {
      id: `${resumes.length + 1}`,
      name: file.name,
      uploadDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      size: `${Math.round(file.size / 1024)} KB`,
      status: "Pending Review",
      score: null,
    }

    setResumes([newResume, ...resumes])

    // Save to localStorage for persistence
    const storedResumes = JSON.parse(localStorage.getItem("userResumes") || "[]")
    localStorage.setItem("userResumes", JSON.stringify([newResume, ...storedResumes]))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const handleDelete = (id: string) => {
    setResumes(resumes.filter((resume) => resume.id !== id))
  }

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <h3 className="font-medium text-lg">Drag and drop your resume</h3>
          <p className="text-sm text-muted-foreground">Supports PDF, DOCX, and TXT files up to 5MB</p>
          <Button className="mt-4" onClick={handleBrowseClick}>
            Browse Files
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFileUpload(e.target.files)
                // Reset the input value so the same file can be uploaded again if needed
                e.target.value = ""
              }
            }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-lg">Your Resumes</h3>
        {resumes.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No resumes uploaded yet</p>
        ) : (
          <div className="space-y-3">
            {resumes.map((resume) => (
              <Card key={resume.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-md bg-muted p-2">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-medium">{resume.name}</h4>
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-1">
                          <span>Uploaded: {resume.uploadDate}</span>
                          <span>•</span>
                          <span>{resume.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {resume.status && (
                        <Badge variant={resume.status === "Reviewed" ? "default" : "outline"}>
                          {resume.status === "Reviewed" ? (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          ) : (
                            <AlertCircle className="mr-1 h-3 w-3" />
                          )}
                          {resume.status}
                        </Badge>
                      )}
                      {resume.score !== null && (
                        <Badge variant="outline" className="ml-2">
                          Score: {resume.score}/100
                        </Badge>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(resume.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

