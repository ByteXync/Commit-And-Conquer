"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileText, Upload, AlertCircle, CheckCircle2, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File) => {
    // Check if file is PDF
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith('.pdf')) {
      setUploadError("Only PDF files are allowed")
      return false
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size should be less than 5MB")
      return false
    }

    setUploadError(null)
    return true
  }

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Handle rejected files (files that don't match the accept criteria)
    if (rejectedFiles.length > 0) {
      const error = rejectedFiles[0].errors[0];
      if (error.code === "file-too-large") {
        setUploadError("File size should be less than 5MB");
      } else if (error.code === "file-invalid-type") {
        setUploadError("Only PDF files are allowed");
      } else {
        setUploadError("Invalid file. Please upload a PDF file under 5MB.");
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
    noClick: false, // Allow clicking on the dropzone to open file dialog
    noKeyboard: false // Allow keyboard navigation
  });

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    try {
      // Simulate API call - replace with actual upload logic
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Simulate successful upload
      setUploadSuccess(true);
      clearInterval(interval);
      setUploadProgress(100);
    } catch (error) {
      setUploadError("Failed to upload resume. Please try again.");
      clearInterval(interval);
    } finally {
      setUploading(false);
    }
  };

  const resetUpload = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    
    setFile(null);
    setUploadSuccess(false);
    setUploadProgress(0);
    setUploadError(null);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Clear any error messages when component unmounts or when file changes
  useEffect(() => {
    return () => {
      if (uploadError) setUploadError(null);
    };
  }, [file]);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Upload Your Resume</CardTitle>
        <CardDescription>
          Upload your resume in PDF format. This will be used for your internship applications.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {uploadSuccess ? (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800">Upload Successful</AlertTitle>
            <AlertDescription className="text-green-700">
              Your resume has been uploaded successfully. You can now apply for internships.
            </AlertDescription>
          </Alert>
        ) : uploadError ? (
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Upload Failed</AlertTitle>
            <AlertDescription>{uploadError}</AlertDescription>
          </Alert>
        ) : null}

        {!uploadSuccess && (
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"
            }`}
          >
            <input {...getInputProps({ ref: fileInputRef })} />
            <div className="flex flex-col items-center justify-center space-y-2">
              <Upload className={`h-10 w-10 ${isDragActive ? "text-blue-500" : "text-gray-400"}`} />
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  {isDragActive ? "Drop your resume here" : "Drag and drop your resume here"}
                </p>
                <p className="text-xs text-muted-foreground">PDF only, max 5MB</p>
              </div>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                disabled={uploading}
                onClick={(e) => {
                  e.stopPropagation();
                  open(); // Use dropzone's open method instead of manually clicking
                }}
              >
                Browse Files
              </Button>
            </div>
          </div>
        )}

        {file && !uploadSuccess && (
          <div className="border rounded-md p-4 bg-muted/50">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={resetUpload} 
                disabled={uploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {uploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {uploadSuccess ? (
          <Button onClick={resetUpload} className="w-full">
            Upload Another Resume
          </Button>
        ) : (
          <Button onClick={handleUpload} disabled={!file || uploading} className="w-full">
            {uploading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                Uploading...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Resume
              </span>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}