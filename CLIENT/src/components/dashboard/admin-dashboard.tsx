import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building2, Clock, MapPin, Plus, RefreshCw } from "lucide-react"
import { toast } from "@/components/ui/use-toast" // Import toast if available, or remove if not

interface Internship {
  id: number
  title: string
  company: string
  location: string
  type: string
  duration: string | number
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
  const [isToggling, setIsToggling] = useState<number | null>(null)

  const fetchInternships = async () => {
    try {
      console.log("Fetching internships...")
      
      // Fetch active internships
      const activeResponse = await fetch("http://localhost:8000/api/fetchinternships")
      if (!activeResponse.ok) {
        throw new Error(`Failed to fetch active internships: ${activeResponse.status}`)
      }
      const activeData = await activeResponse.json()
      console.log("Active internships:", activeData)
      setActiveInternships(activeData)

      // Fetch inactive internships
      const inactiveResponse = await fetch("http://localhost:8000/api/fetchdeletedinternships")
      if (!inactiveResponse.ok) {
        throw new Error(`Failed to fetch inactive internships: ${inactiveResponse.status}`)
      }
      const inactiveData = await inactiveResponse.json()
      console.log("Inactive internships:", inactiveData)
      setInactiveInternships(inactiveData)
      
    } catch (error) {
      console.error("Error fetching internships:", error)
      // If toast is available
      try {
        toast({
          title: "Error fetching internships",
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        })
      } catch (e) {
        // If toast is not available, just log
        console.error("Toast error:", e)
      }
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
    console.log("Adding internship:", newInternship)

    try {
      const response = await fetch("http://localhost:8000/api/addinternships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInternship),
      })

      console.log("Add response status:", response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log("Add response data:", data)
        
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
        
        // Show success message if toast is available
        try {
          toast({
            title: "Success",
            description: "Internship added successfully",
          })
        } catch (e) {
          console.log("Internship added successfully")
        }
        
        await fetchInternships()
      } else {
        const errorText = await response.text()
        throw new Error(`Failed to add internship: ${response.status} - ${errorText}`)
      }
    } catch (error) {
      console.error("Error adding internship:", error)
      // If toast is available
      try {
        toast({
          title: "Error adding internship",
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        })
      } catch (e) {
        // If toast is not available, just log to console
        console.error("Toast error:", e)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const toggleInternshipStatus = async (id: number) => {
    setIsToggling(id)
    console.log("Toggling internship status, ID:", id)
    
    try {
      const response = await fetch(`http://localhost:8000/api/toggleinternship/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        }
      })

      console.log("Toggle response status:", response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log("Toggle response data:", data)
        
        // Show success message if toast is available
        try {
          toast({
            title: "Success",
            description: data.message || "Internship status updated",
          })
        } catch (e) {
          console.log("Internship status updated successfully")
        }
        
        // Refresh data after toggle
        await fetchInternships()
      } else {
        const errorText = await response.text()
        throw new Error(`Failed to toggle status: ${response.status} - ${errorText}`)
      }
    } catch (error) {
      console.error("Error toggling status:", error)
      // If toast is available
      try {
        toast({
          title: "Error updating status",
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        })
      } catch (e) {
        // If toast is not available, just log
        console.error("Toast error:", e)
      }
    } finally {
      setIsToggling(null)
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
            {typeof internship.duration === 'number' 
              ? `${internship.duration} month${internship.duration !== 1 ? 's' : ''}` 
              : internship.duration}
          </div>
          <Badge className="w-fit mt-2">{internship.type || 'Remote'}</Badge>
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
          disabled={isToggling === internship.id}
        >
          {isToggling === internship.id ? "Updating..." : (isActive ? "Deactivate" : "Activate")}
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
                      type="number"
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