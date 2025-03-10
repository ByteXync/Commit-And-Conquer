"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bookmark, Building, MapPin, Clock, Search, Filter, BriefcaseBusiness, Banknote } from "lucide-react"

// Mock data for jobs
const jobsData = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    remote: true,
    posted: "2 days ago",
    description:
      "We're looking for a Senior Frontend Developer to join our team. You'll be responsible for building user interfaces for our web applications using React, Next.js, and TypeScript.",
    requirements: [
      "5+ years of experience with React",
      "Experience with Next.js",
      "Strong TypeScript skills",
      "Experience with state management libraries",
    ],
    logo: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100,000 - $130,000",
    remote: true,
    posted: "1 week ago",
    description:
      "Join our growing team as a Full Stack Engineer. You'll work on both frontend and backend development for our SaaS platform.",
    requirements: [
      "3+ years of full stack development",
      "Experience with React and Node.js",
      "Knowledge of SQL and NoSQL databases",
      "Good understanding of RESTful APIs",
    ],
    logo: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "3",
    title: "Backend Developer",
    company: "Enterprise Solutions",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    remote: false,
    posted: "3 days ago",
    description:
      "We're seeking a Backend Developer to help build and maintain our core services. You'll work with Python, Django, and PostgreSQL.",
    requirements: [
      "4+ years of backend development",
      "Strong Python skills",
      "Experience with Django",
      "Knowledge of SQL databases",
    ],
    logo: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Austin, TX",
    type: "Contract",
    salary: "$90 - $110 per hour",
    remote: true,
    posted: "5 days ago",
    description:
      "Looking for a DevOps Engineer to help us improve our CI/CD pipelines and infrastructure. You'll work with AWS, Docker, and Kubernetes.",
    requirements: [
      "3+ years of DevOps experience",
      "Experience with AWS",
      "Knowledge of Docker and Kubernetes",
      "Experience with CI/CD tools",
    ],
    logo: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "5",
    title: "UI/UX Designer",
    company: "DesignStudio",
    location: "Los Angeles, CA",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    remote: true,
    posted: "1 day ago",
    description:
      "Join our design team to create beautiful and intuitive user interfaces for our clients. You'll work closely with developers to implement your designs.",
    requirements: [
      "3+ years of UI/UX design experience",
      "Proficiency in Figma or Adobe XD",
      "Understanding of design systems",
      "Experience working with developers",
    ],
    logo: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "6",
    title: "Data Scientist",
    company: "DataCorp",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$130,000 - $160,000",
    remote: false,
    posted: "2 weeks ago",
    description:
      "We're looking for a Data Scientist to help us analyze and interpret complex data. You'll work with machine learning models and big data technologies.",
    requirements: [
      "MS or PhD in Computer Science, Statistics, or related field",
      "Experience with Python and R",
      "Knowledge of machine learning algorithms",
      "Experience with big data technologies",
    ],
    logo: "/placeholder.svg?height=60&width=60",
  },
]

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [jobType, setJobType] = useState<string | undefined>(undefined)
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [salaryRange, setSalaryRange] = useState([50, 150])
  const [showFilters, setShowFilters] = useState(false)
  const [savedJobs, setSavedJobs] = useState<string[]>([])

  const toggleSaveJob = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId))
    } else {
      setSavedJobs([...savedJobs, jobId])
    }
  }

  const filteredJobs = jobsData.filter((job) => {
    // Search term filter
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())

    // Location filter
    const matchesLocation = location === "" || job.location.toLowerCase().includes(location.toLowerCase())

    // Job type filter
    const matchesJobType = !jobType || job.type === jobType

    // Remote filter
    const matchesRemote = !remoteOnly || job.remote

    // Salary filter (simplified for demo)
    const jobSalaryLower = Number.parseInt(job.salary.replace(/[^0-9]/g, "")) / 1000
    const matchesSalary = jobSalaryLower >= salaryRange[0] && jobSalaryLower <= salaryRange[1]

    return matchesSearch && matchesLocation && matchesJobType && matchesRemote && matchesSalary
  })

  const applyForJob = (jobId: string) => {
    // In a real app, this would open an application form or redirect to an application page
    alert(`Applied for job ID: ${jobId}`)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 md:gap-8 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Find Jobs</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search jobs, skills, or companies"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Location"
                className="pl-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="md:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        {showFilters && (
          <Card className="p-4">
            <CardContent className="p-0 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Job Type</Label>
                  <Select value={jobType} onValueChange={setJobType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Salary Range (in thousands)</Label>
                  <div className="pt-4">
                    <Slider
                      defaultValue={[50, 150]}
                      max={200}
                      step={5}
                      value={salaryRange}
                      onValueChange={setSalaryRange}
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>${salaryRange[0]}k</span>
                      <span>${salaryRange[1]}k+</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="remote-only" checked={remoteOnly} onCheckedChange={setRemoteOnly} />
                    <Label htmlFor="remote-only">Remote Only</Label>
                  </div>

                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setLocation("")
                      setJobType(undefined)
                      setRemoteOnly(false)
                      setSalaryRange([50, 150])
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Jobs</TabsTrigger>
            <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
            <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="text-sm text-muted-foreground">Showing {filteredJobs.length} jobs</div>

            {filteredJobs.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">No jobs found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={savedJobs.includes(job.id)}
                    onSave={() => toggleSaveJob(job.id)}
                    onApply={() => applyForJob(job.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            {savedJobs.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">No saved jobs</h3>
                <p className="text-muted-foreground mt-2">Save jobs to view them here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {jobsData
                  .filter((job) => savedJobs.includes(job.id))
                  .map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      isSaved={true}
                      onSave={() => toggleSaveJob(job.id)}
                      onApply={() => applyForJob(job.id)}
                    />
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="applied" className="space-y-4">
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">No applied jobs</h3>
              <p className="text-muted-foreground mt-2">Your applied jobs will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  remote: boolean
  posted: string
  description: string
  requirements: string[]
  logo: string
}

interface JobCardProps {
  job: Job
  isSaved: boolean
  onSave: () => void
  onApply: () => void
}

function JobCard({ job, isSaved, onSave, onApply }: JobCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="flex-shrink-0">
              <img
                src={job.logo || "/placeholder.svg"}
                alt={`${job.company} logo`}
                className="h-14 w-14 rounded-md object-contain bg-muted p-2"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant={job.remote ? "default" : "outline"}>{job.remote ? "Remote" : "On-site"}</Badge>
                  <Badge variant="outline">{job.type}</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Banknote className="h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Posted {job.posted}</span>
                </div>
              </div>
              <p className="text-sm line-clamp-2">{job.description}</p>

              {expanded && (
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Requirements:</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => setExpanded(!expanded)}>
              {expanded ? "Show Less" : "Show More"}
            </Button>
            <Button variant="outline" size="sm" className={`flex-1 ${isSaved ? "text-primary" : ""}`} onClick={onSave}>
              <Bookmark className={`mr-2 h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
              {isSaved ? "Saved" : "Save Job"}
            </Button>
            <Button size="sm" className="flex-1" onClick={onApply}>
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              Apply Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

