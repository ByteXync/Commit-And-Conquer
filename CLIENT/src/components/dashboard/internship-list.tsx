import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Clock, MapPin, User } from "lucide-react"

interface Internship {
  id: number
  title: string
  company: string
  location: string
  type: string
  duration: string
  description: string
  adminName: string // Admin Name
  adminEmail: string // Admin Email
}

export function InternshipList() {
  const [internships, setInternships] = useState<Internship[]>([])

  useEffect(() => {
    async function fetchInternships() {
      const response = await fetch("http://localhost:8000/api/fetchinternships")
      const data = await response.json()
      setInternships(data)
    }

    fetchInternships()
  }, [])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {internships.map((internship) => (
        <Card key={internship.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{internship.title}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              {internship.company}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {internship.location}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {internship.duration}
              </div>
              <Badge className="w-fit mt-2">{internship.type}</Badge>
              <p className="mt-2 text-sm">{internship.description}</p>

              {/* Admin Information (only visible to users with admin role) */}
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <div>
                  <p>Admin: {internship.adminName}</p>
                  <p>Email: {internship.adminEmail}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Apply Now</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
