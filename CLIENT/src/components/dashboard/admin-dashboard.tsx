import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building2, Clock, MapPin, Plus, RefreshCw } from "lucide-react"

interface Internship {
  id: number
  title: string
  company: string
  location: string
  type: string
  duration: string
  description: string
  isActive: boolean
  stipend: number
}

export default function AdminDashboard() {
  const [activeInternships, setActiveInternships] = useState<Internship[]>([])
  const [inactiveInternships, setInactiveInternships] = useState<Internship[]>([])
  const [newInternship, setNewInternship] = useState({
    title: "",
    company: "",
    location: "",
    type: "Remote",
    duration: "",
    description: "",
    stipend: 0
  })
  const [isLoading, setIsLoading] = useState(false)

  const fetchInternships = async () => {
    try {
      // Fetch active internships
      const activeResponse = await fetch("http://localhost:8000/api/fetchinternships")
      const activeData = await activeResponse.json()
      setActiveInternships(activeData)

      // Fetch inactive internships
      const inactiveResponse = await fetch("http://localhost:8000/api/fetchdeletedinternships")
      const inactiveData = await inactiveResponse.json()
      setInactiveInternships(inactiveData)
    } catch (error) {
      console.error("Error fetching internships:", error)
    }
  }

  useEffect(() => {
    fetchInternships()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewInternship(prev => ({
      ...prev,
      [name]: name === "stipend" ? parseInt(value) || 0 : value
    }))
  }

  const handleAddInternship = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:8000/api/addinternships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInternship),
      })

      if (response.ok) {
        // Reset form and refresh data
        setNewInternship({
          title: "",
          company: "",
          location: "",
          type: "Remote",
          duration: "",
          description: "",
          stipend: 0
        })
        await fetchInternships()
      } else {
        console.error("Failed to add internship")
      }
    } catch (error) {
      console.error("Error adding internship:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleInternshipStatus = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/toggleinternship/${id}`, {
        method: "PUT"
      })

      if (response.ok) {
        // Refresh data after toggle
        await fetchInternships()
      } else {
        console.error("Failed to toggle internship status")
      }
    } catch (error) {
      console.error("Error toggling status:", error)
    }
  }

  const renderInternshipCard = (internship: Internship, isActive: boolean) => (
    <Card key={internship.id} className={`flex flex-col ${!isActive ? "border-gray-300 bg-gray-50" : ""}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{internship.title}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              {internship.company}
            </CardDescription>
          </div>
          {!isActive && (
            <Badge variant="outline" className="bg-gray-200">Inactive</Badge>
          )}
        </div>
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
            <p className="text-sm font-medium">Stipend: ₹{internship.stipend}/month</p>
          )}
        </div>
      </CardContent>
      <div className="p-4 mt-auto">
        <Button 
          onClick={() => toggleInternshipStatus(internship.id)} 
          variant={isActive ? "destructive" : "default"} 
          className="w-full"
        >
          {isActive ? "Deactivate" : "Activate"}
        </Button>
      </div>
    </Card>
  )

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Internship Management</h1>
      
      <Tabs defaultValue="active" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active Internships ({activeInternships.length})</TabsTrigger>
          <TabsTrigger value="inactive">Inactive Internships ({inactiveInternships.length})</TabsTrigger>
          <TabsTrigger value="add">Add New Internship</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <div className="flex justify-end mb-4">
            <Button variant="outline" onClick={fetchInternships} className="flex items-center gap-1">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeInternships.map((internship) => renderInternshipCard(internship, true))}
            {activeInternships.length === 0 && (
              <p className="col-span-3 text-center py-4">No active internships found.</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="inactive">
          <div className="flex justify-end mb-4">
            <Button variant="outline" onClick={fetchInternships} className="flex items-center gap-1">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {inactiveInternships.map((internship) => renderInternshipCard(internship, false))}
            {inactiveInternships.length === 0 && (
              <p className="col-span-3 text-center py-4">No inactive internships found.</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add New Internship</CardTitle>
              <CardDescription>Fill in the details to add a new internship position</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddInternship} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      value={newInternship.title} 
                      onChange={handleInputChange} 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      id="company" 
                      name="company" 
                      value={newInternship.company} 
                      onChange={handleInputChange} 
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      name="location" 
                      value={newInternship.location} 
                      onChange={handleInputChange} 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <select
                      id="type"
                      name="type"
                      className="w-full px-3 py-2 border rounded-md"
                      value={newInternship.type}
                      onChange={(e) => setNewInternship({...newInternship, type: e.target.value})}
                    >
                      <option value="Remote">Remote</option>
                      <option value="On-site">On-site</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (in months)</Label>
                    <Input 
                      id="duration" 
                      name="duration" 
                      value={newInternship.duration} 
                      onChange={handleInputChange} 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stipend">Stipend (per month)</Label>
                    <Input 
                      id="stipend" 
                      name="stipend" 
                      type="number" 
                      value={newInternship.stipend} 
                      onChange={handleInputChange} 
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    rows={4} 
                    value={newInternship.description} 
                    onChange={handleInputChange} 
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Adding..." : (
                    <span className="flex items-center gap-1">
                      <Plus className="h-4 w-4" /> Add Internship
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}