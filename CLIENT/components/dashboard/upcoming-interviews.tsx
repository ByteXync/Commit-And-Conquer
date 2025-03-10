"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video, MapPin } from "lucide-react"

interface UpcomingInterviewsProps {
  detailed?: boolean
}

// Mock data for upcoming interviews
const interviews = [
  {
    id: "1",
    company: "TechCorp Inc.",
    position: "Frontend Developer",
    date: "June 20, 2023",
    time: "10:00 AM - 11:30 AM",
    type: "Video Call",
    interviewers: ["John Smith (Engineering Manager)", "Alice Johnson (Senior Developer)"],
    location: "Zoom Meeting",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    company: "StartupXYZ",
    position: "Full Stack Engineer",
    date: "June 22, 2023",
    time: "2:00 PM - 3:30 PM",
    type: "Technical Interview",
    interviewers: ["Michael Brown (CTO)", "Sarah Davis (Lead Engineer)"],
    location: "Google Meet",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    company: "DesignStudio",
    position: "UI/UX Developer",
    date: "June 25, 2023",
    time: "11:00 AM - 12:30 PM",
    type: "On-site",
    interviewers: ["Emily Wilson (Design Director)", "David Lee (Frontend Lead)"],
    location: "123 Design St, Los Angeles, CA",
    logo: "/placeholder.svg?height=40&width=40",
  },
]

export function UpcomingInterviews({ detailed = false }: UpcomingInterviewsProps) {
  const handleJoinCall = (interview: any) => {
    if (interview.type === "On-site") {
      window.open(`https://maps.google.com/?q=${interview.location}`, "_blank")
    } else {
      // In a real app, this would open the video call link
      window.open("https://zoom.us/j/example", "_blank")
    }
  }

  const handlePrepare = (interview: any) => {
    // In a real app, this would navigate to an interview preparation page
    window.open(`/interview-prep?id=${interview.id}`, "_blank")
  }

  return (
    <div className="space-y-4">
      {interviews.slice(0, detailed ? undefined : 2).map((interview) => (
        <div key={interview.id} className="flex flex-col space-y-3 rounded-lg border p-4">
          <div className="flex items-start gap-3">
            <img
              src={interview.logo || "/placeholder.svg"}
              alt={`${interview.company} logo`}
              className="h-10 w-10 rounded-md"
            />
            <div className="flex-1">
              <h4 className="font-semibold">{interview.position}</h4>
              <p className="text-sm text-muted-foreground">{interview.company}</p>
            </div>
          </div>

          <div className="grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{interview.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{interview.time}</span>
            </div>
            <div className="flex items-center gap-2">
              {interview.type === "On-site" ? (
                <MapPin className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Video className="h-4 w-4 text-muted-foreground" />
              )}
              <span>
                {interview.type}: {interview.location}
              </span>
            </div>
          </div>

          {detailed && (
            <div className="space-y-2">
              <h5 className="text-sm font-medium">Interviewers:</h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                {interview.interviewers.map((interviewer, index) => (
                  <li key={index}>{interviewer}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" className="flex-1" onClick={() => handlePrepare(interview)}>
              Prepare
            </Button>
            <Button size="sm" className="flex-1" onClick={() => handleJoinCall(interview)}>
              {interview.type === "On-site" ? "Get Directions" : "Join Call"}
            </Button>
          </div>
        </div>
      ))}

      {!detailed && interviews.length > 2 && (
        <Button variant="ghost" className="w-full text-sm">
          View all interviews
        </Button>
      )}
    </div>
  )
}

