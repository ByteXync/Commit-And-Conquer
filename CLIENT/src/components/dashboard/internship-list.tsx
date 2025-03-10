//CLIENT/src/components/dashboard/internship-list.tsx
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Define the Internship interface
export interface Internship {
  id: string;
  title: string;
  company?: string;
  location?: string;
  duration?: string;
  type?: string;
  status?: string;
  description?: string;
  // Add any other properties your internships have
}

interface InternshipListProps {
  internships: Internship[];
}

export default function InternshipList({ internships = [] }: InternshipListProps) {
  // If no internships are provided, show a message
  if (internships.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-6">
            <p className="text-gray-500">No internships available at the moment.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {internships.map((internship) => (
        <Card key={internship.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{internship.title}</CardTitle>
                <CardDescription>{internship.company} • {internship.location}</CardDescription>
              </div>
              <Badge variant={
                internship.status === "Active" ? "default" :
                internship.status === "Closed" ? "destructive" :
                "outline"
              }>
                {internship.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline">{internship.type}</Badge>
              <Badge variant="outline">{internship.duration}</Badge>
            </div>
            <p className="text-sm text-gray-600">{internship.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">Save</Button>
            <Link href={`/internship/${internship.id}`}>
              <Button size="sm">View Details</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}