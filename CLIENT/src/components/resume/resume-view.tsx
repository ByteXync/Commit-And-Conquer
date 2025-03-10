"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Trash2, Eye, PenLine, Share2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Resume {
  id: string
  name: string
  uploadDate: string
  size: string
  url: string
}

export function ResumeView() {
  const [activeResume, setActiveResume] = useState<Resume | null>(null)

  // Mock resume data
  const resumes: Resume[] = [
    {
      id: "1",
      name: "John_Doe_Resume_2023.pdf",
      uploadDate: "2023-10-15",
      size: "1.2 MB",
      url: "#",
    },
    {
      id: "2",
      name: "John_Doe_Resume_Technical.pdf",
      uploadDate: "2023-09-05",
      size: "0.9 MB",
      url: "#",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const handleViewResume = (resume: Resume) => {
    setActiveResume(resume)
    // In a real app, you would open the PDF in a viewer
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Your Resumes</CardTitle>
        <CardDescription>View and manage all your uploaded resumes</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Resumes</TabsTrigger>
            <TabsTrigger value="recent">Recently Used</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            {resumes.length > 0 ? (
              resumes.map((resume) => (
                <div
                  key={resume.id}
                  className={`border rounded-lg p-4 transition-colors ${
                    activeResume?.id === resume.id ? "bg-muted border-primary" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <FileText className="h-8 w-8 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-medium">{resume.name}</h3>
                        <div className="text-sm text-muted-foreground">
                          <p>Uploaded on {formatDate(resume.uploadDate)}</p>
                          <p>Size: {resume.size}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleViewResume(resume)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your resume.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive text-destructive-foreground">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No resumes found</h3>
                <p className="text-muted-foreground mb-4">You haven't uploaded any resumes yet.</p>
                <Button asChild>
                  <a href="/resume/upload">Upload Resume</a>
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="recent">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No recently used resumes</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      {activeResume && (
        <CardFooter className="flex justify-between border-t p-4">
          <div className="text-sm">
            <span className="font-medium">Selected: </span>
            {activeResume.name}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <PenLine className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View Full
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

