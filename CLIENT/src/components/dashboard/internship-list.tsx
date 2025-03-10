"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Building2, Clock, MapPin, Bookmark, BookmarkCheck, Filter, Search, AlertCircle } from "lucide-react"

interface Internship {
  id: number
  title: string
  company: string
  location: string
  type: string
  duration: string
  description: string
  postedDate: string
  salary?: string
  skills: string[]
}

export default function InternshipList() {
  const [internships, setInternships] = useState<Internship[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [savedInternships, setSavedInternships] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterLocation, setFilterLocation] = useState("all")

  useEffect(() => {
    async function fetchInternships() {
      setLoading(true)
      try {
        const response = await fetch("http://localhost:8000/api/fetchinternships");
        
        if (response.ok) {
          const data = await response.json();
          setInternships(data);
          setError(null);
        } else {
          throw new Error('API returned an error');
        }
      } catch (err) {
        console.error("Failed to fetch internships:", err);
        // For demo purposes, we'll use mock data
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const mockData: Internship[] = [
          {
            id: 1,
            title: "Frontend Developer Intern",
            company: "TechCorp",
            location: "San Francisco, CA",
            type: "Remote",
            duration: "3 months",
            description: "Join our team to build modern web applications using React, Next.js and TypeScript.",
            postedDate: "2023-03-01",
            salary: "$25/hour",
            skills: ["React", "TypeScript", "CSS"],
          },
          {
            id: 2,
            title: "Backend Developer Intern",
            company: "DataSystems",
            location: "New York, NY",
            type: "On-site",
            duration: "6 months",
            description: "Work on our backend services using Node.js, Express, and MongoDB.",
            postedDate: "2023-03-05",
            salary: "$28/hour",
            skills: ["Node.js", "Express", "MongoDB"],
          },
          {
            id: 3,
            title: "UI/UX Design Intern",
            company: "CreativeMinds",
            location: "Chicago, IL",
            type: "Hybrid",
            duration: "4 months",
            description: "Help design user interfaces for our products using Figma and Adobe XD.",
            postedDate: "2023-03-10",
            skills: ["Figma", "UI Design", "Prototyping"],
          },
          {
            id: 4,
            title: "Data Science Intern",
            company: "AnalyticsPro",
            location: "Boston, MA",
            type: "Remote",
            duration: "3 months",
            description: "Analyze data and build machine learning models to solve business problems.",
            postedDate: "2023-03-12",
            salary: "$30/hour",
            skills: ["Python", "Machine Learning", "SQL"],
          },
          {
            id: 5,
            title: "Mobile Developer Intern",
            company: "AppWorks",
            location: "Seattle, WA",
            type: "On-site",
            duration: "6 months",
            description: "Develop mobile applications for iOS and Android using React Native.",
            postedDate: "2023-03-15",
            salary: "$26/hour",
            skills: ["React Native", "JavaScript", "Mobile Development"],
          },
          {
            id: 6,
            title: "DevOps Intern",
            company: "CloudTech",
            location: "Austin, TX",
            type: "Hybrid",
            duration: "4 months",
            description: "Learn and implement CI/CD pipelines and cloud infrastructure.",
            postedDate: "2023-03-18",
            skills: ["AWS", "Docker", "CI/CD"],
          },
        ];

        setInternships(mockData);
        setError(null);
      } finally {
        setLoading(false);
      }
    }

    fetchInternships();
  }, []);

  const toggleSaveInternship = (id: number) => {
    setSavedInternships((prev) =>
      prev.includes(id) ? prev.filter((internshipId) => internshipId !== id) : [...prev, id],
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 30) return `${diffDays} days ago`

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || internship.type === filterType
    const matchesLocation = filterLocation === "all" || internship.location.includes(filterLocation)

    return matchesSearch && matchesType && matchesLocation
  })

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-destructive mb-4">
          <AlertCircle className="h-10 w-10 mx-auto" />
        </div>
        <h3 className="text-xl font-bold mb-2">Error Loading Internships</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search internships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
              <SelectItem value="On-site">On-site</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterLocation} onValueChange={setFilterLocation}>
            <SelectTrigger className="w-[160px]">
              <MapPin className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="San Francisco">San Francisco</SelectItem>
              <SelectItem value="New York">New York</SelectItem>
              <SelectItem value="Chicago">Chicago</SelectItem>
              <SelectItem value="Boston">Boston</SelectItem>
              <SelectItem value="Seattle">Seattle</SelectItem>
              <SelectItem value="Austin">Austin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-col space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-6 w-1/4 mt-2" />
                  <div className="mt-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full mt-1" />
                    <Skeleton className="h-4 w-2/3 mt-1" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredInternships.length} of {internships.length} internships
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredInternships.map((internship) => (
              <Card key={internship.id} className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{internship.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Building2 className="h-4 w-4" />
                        {internship.company}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleSaveInternship(internship.id)}
                      className={savedInternships.includes(internship.id) ? "text-primary" : "text-muted-foreground"}
                    >
                      {savedInternships.includes(internship.id) ? (
                        <BookmarkCheck className="h-5 w-5" />
                      ) : (
                        <Bookmark className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 shrink-0" />
                      <span>{internship.duration}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                        {internship.type}
                      </Badge>
                      {internship.salary && <Badge variant="outline">{internship.salary}</Badge>}
                    </div>
                    <p className="mt-2 text-sm line-clamp-3">{internship.description}</p>

                    {internship.skills && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {internship.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 border-t pt-4">
                  <div className="text-xs text-muted-foreground w-full text-right">
                    Posted {formatDate(internship.postedDate)}
                  </div>
                  <Button className="w-full">Apply Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredInternships.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2">No internships found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setFilterType("all")
                  setFilterLocation("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
