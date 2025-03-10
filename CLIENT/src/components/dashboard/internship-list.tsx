import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Clock, MapPin } from "lucide-react"

interface Internship {
  id: number
  title: string
  company: string
  location: string
  type: string // Note: This field might need to be added to your database schema
  duration: string
  description: string
  stipend: number
  isActive: boolean
}

export default function InternshipList() {
  const [internships, setInternships] = useState<Internship[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchInternships() {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:8000/api/fetchinternships")
        const data = await response.json()
        
        // Format the data as needed
        const formattedData = data.map((item: any) => ({
          ...item,
          // Convert numeric duration to string with "months"
          duration: typeof item.duration === 'number' ? 
            `${item.duration} month${item.duration !== 1 ? 's' : ''}` : 
            item.duration,
          // Set a default type if not provided
          type: item.type || "Remote"
        }))
        
        setInternships(formattedData)
      } catch (error) {
        console.error("Error fetching internships:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInternships()
  }, [])

  if (loading) {
    return <div className="text-center py-10">Loading internships...</div>
  }

  if (internships.length === 0) {
    return <div className="text-center py-10">No active internships available at the moment.</div>
  }

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
              {internship.stipend > 0 && (
                <p className="text-sm font-medium mt-2">Stipend: ₹{internship.stipend}/month</p>
              )}
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