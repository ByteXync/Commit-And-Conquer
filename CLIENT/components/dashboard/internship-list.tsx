import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building, MapPin, Calendar, ExternalLink } from "lucide-react"

// Mock data for internships/jobs
const internships = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA (Remote)",
    date: "Applied on June 15, 2023",
    status: "Interview",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "New York, NY (Hybrid)",
    date: "Applied on June 10, 2023",
    status: "In Progress",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    title: "React Developer",
    company: "WebSolutions",
    location: "Austin, TX (On-site)",
    date: "Applied on June 5, 2023",
    status: "Rejected",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    title: "Software Engineer",
    company: "BigTech Co.",
    location: "Seattle, WA (Remote)",
    date: "Applied on June 1, 2023",
    status: "In Progress",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    title: "UI/UX Developer",
    company: "DesignStudio",
    location: "Los Angeles, CA (Hybrid)",
    date: "Applied on May 28, 2023",
    status: "Interview",
    logo: "/placeholder.svg?height=40&width=40",
  },
]

export function InternshipList() {
  return (
    <div className="space-y-4">
      {internships.map((internship) => (
        <Card key={internship.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row md:items-center gap-4 p-6">
              <div className="flex-shrink-0">
                <img
                  src={internship.logo || "/placeholder.svg"}
                  alt={`${internship.company} logo`}
                  className="h-12 w-12 rounded-md"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h3 className="font-semibold text-lg">{internship.title}</h3>
                  <Badge
                    variant={
                      internship.status === "Interview"
                        ? "default"
                        : internship.status === "Rejected"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {internship.status}
                  </Badge>
                </div>
                <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    <span>{internship.company}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{internship.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{internship.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 md:flex-row">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ExternalLink className="h-4 w-4" />
                  View Details
                </Button>
                {internship.status === "Interview" && <Button size="sm">Prepare for Interview</Button>}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

