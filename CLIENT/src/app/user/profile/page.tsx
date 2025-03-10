"use client"
import MainNav from "@/components/ui/main-nav"
import type React from "react"
import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MoreVertical,
  Mail,
  Calendar,
  Settings,
  LogOut,
  MapPin,
  Link2,
  Github,
  Twitter,
  Linkedin,
  Edit,
  Camera,
  CheckCircle2,
  Briefcase,
  Award,
  Globe,
  Users,
  MessageSquare,
  Share2,
  Heart,
  Eye,
  Star,
  Clock,
  ExternalLink,
  Bookmark,
  Bell,
} from "lucide-react"

interface SocialLink {
  platform: string
  url: string
  icon: React.ElementType
}

interface ProfileProps {
  name?: string
  username?: string
  bio?: string
  avatarUrl?: string
  bannerUrl?: string
  email?: string
  joinDate?: string
  location?: string
  skills?: string[]
  status?: "online" | "offline" | "away"
  position?: string
  socialLinks?: SocialLink[]
}

const ProfilePage: React.FC<ProfileProps> = ({
  name = "Jane Smith",
  username = "janesmith",
  bio = "Product Designer with 8+ years of experience. Passionate about creating intuitive and delightful user experiences that solve real problems. Currently leading design initiatives at Design Co., focusing on enterprise solutions and design systems.",
  avatarUrl = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop",
  bannerUrl = "https://images.unsplash.com/photo-1579547944212-c4f4961a8dd8?q=80&w=1200&h=300&auto=format&fit=crop",
  email = "janesmith@example.com",
  joinDate = "March 2023",
  location = "San Francisco, CA",
  skills = [
    "UI/UX Design",
    "Design Systems",
    "User Research",
    "Prototyping",
    "Figma",
    "Adobe XD",
    "Sketch",
    "Design Thinking",
    "Wireframing",
    "Visual Design",
  ],
  status = "online",
  position = "Senior Product Designer at Design Co.",
  socialLinks = [
    { platform: "Twitter", url: "https://twitter.com/janesmith", icon: Twitter },
    { platform: "LinkedIn", url: "https://linkedin.com/in/janesmith", icon: Linkedin },
    { platform: "GitHub", url: "https://github.com/janesmith", icon: Github },
  ],
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name,
    username,
    bio,
    email,
    location,
    position,
    skills,
    socialLinks,
  })
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const bannerInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skillsArray = e.target.value.split(",").map((skill) => skill.trim())
    setProfileData((prev) => ({ ...prev, skills: skillsArray }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatarFile(file)

      // Create a preview URL
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarPreview(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setBannerFile(file)

      // Create a preview URL
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setBannerPreview(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadAvatar = () => {
    setIsUploading(true)

    // Simulate an upload process
    setTimeout(() => {
      // In a real app, you would upload the file to your server/storage here
      console.log("Uploading avatar:", avatarFile)

      // Update the avatar URL in the state
      if (avatarPreview) {
        // In a real app, this would be the URL returned from your server
        setIsUploading(false)

        // Close the dialog
        if (avatarInputRef.current) {
          avatarInputRef.current.value = ""
        }
      }
    }, 1500)
  }

  const uploadBanner = () => {
    setIsUploading(true)

    // Simulate an upload process
    setTimeout(() => {
      // In a real app, you would upload the file to your server/storage here
      console.log("Uploading banner:", bannerFile)

      // Update the banner URL in the state
      if (bannerPreview) {
        // In a real app, this would be the URL returned from your server
        setIsUploading(false)

        // Close the dialog
        if (bannerInputRef.current) {
          bannerInputRef.current.value = ""
        }
      }
    }, 1500)
  }

  const handleSave = () => {
    setIsEditing(false)
    console.log("Saving profile data:", profileData)
  }

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
  }

  const stats = [
    { label: "Following", value: "2.5k", icon: Users },
    { label: "Posts", value: "148", icon: MessageSquare },
    { label: "Projects", value: "32", icon: Briefcase },
  ]

  // Sample projects data
  const projects = [
    {
      id: 1,
      title: "Enterprise Design System",
      description: "A comprehensive design system for enterprise applications",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=500&h=300&auto=format&fit=crop",
      likes: 243,
      views: 1.8,
      date: "Oct 2023",
    },
    {
      id: 2,
      title: "Mobile Banking App",
      description: "Redesign of a mobile banking application focusing on accessibility",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&auto=format&fit=crop",
      likes: 187,
      views: 1.2,
      date: "Aug 2023",
    },
    {
      id: 3,
      title: "Healthcare Dashboard",
      description: "Patient management dashboard for healthcare professionals",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&auto=format&fit=crop",
      likes: 156,
      views: 0.9,
      date: "Jun 2023",
    },
  ]

  // Sample activity data
  const activities = [
    {
      id: 1,
      type: "project",
      action: "created a new project",
      title: "Enterprise Design System",
      date: "2 days ago",
      icon: Star,
    },
    {
      id: 2,
      type: "comment",
      action: "commented on",
      title: "Mobile Banking App",
      date: "1 week ago",
      icon: MessageSquare,
    },
    {
      id: 3,
      type: "like",
      action: "liked",
      title: "Healthcare Dashboard",
      date: "2 weeks ago",
      icon: Heart,
    },
    {
      id: 4,
      type: "follow",
      action: "started following",
      title: "Alex Johnson",
      date: "3 weeks ago",
      icon: Users,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <MainNav />

      <div className="py-8">
        <div className="w-full max-w-6xl mx-auto px-4">
          {/* Profile Header Card */}
          <Card className="w-full overflow-hidden bg-card/80 backdrop-blur-sm border-0 shadow-lg">
            {/* Banner Image */}
            <div className="relative h-72 w-full">
              <Image
                src={bannerPreview || "/banner.jpg"}
                alt="Profile banner"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="sm" className="flex items-center gap-1 backdrop-blur-sm">
                      <Camera className="h-4 w-4" />
                      <span>Update Banner</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Banner Image</DialogTitle>
                      <DialogDescription>Upload a new banner image for your profile.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="banner-upload">Upload Image</Label>
                        <Input
                          id="banner-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleBannerChange}
                          ref={bannerInputRef}
                        />
                      </div>
                      {bannerPreview && (
                        <div className="relative h-40 w-full overflow-hidden rounded-md">
                          <Image src={bannerPreview || "/placeholder.svg"} alt="Banner preview" fill className="object-cover" />
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setBannerPreview(null)
                          setBannerFile(null)
                          if (bannerInputRef.current) {
                            bannerInputRef.current.value = ""
                          }
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={uploadBanner} disabled={!bannerFile || isUploading}>
                        {isUploading ? "Uploading..." : "Upload"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <CardHeader className="relative flex flex-row items-start gap-8 pb-6 pt-0">
              <div className="relative -mt-24 ml-8">
                <div className="rounded-full p-1 bg-background/80 backdrop-blur-sm shadow-xl">
                  <Avatar className="h-36 w-36 border-4 border-background shadow-xl">
                    <AvatarImage src={avatarPreview || "/dp.jpg"} alt={name} />
                    <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
                <div
                  className={`absolute bottom-3 right-3 h-6 w-6 rounded-full ${statusColors[status]} border-2 border-background shadow-md`}
                />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-2 right-2 h-9 w-9 rounded-full bg-primary text-primary-foreground shadow-lg"
                    >
                      <Camera className="h-5 w-5" />
                      <span className="sr-only">Update profile picture</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Profile Picture</DialogTitle>
                      <DialogDescription>Upload a new profile picture.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="picture-upload">Upload Image</Label>
                        <Input
                          id="picture-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          ref={avatarInputRef}
                        />
                      </div>
                      {avatarPreview && (
                        <div className="flex justify-center">
                          <div className="relative h-40 w-40 overflow-hidden rounded-full">
                            <Image src={avatarPreview || "/placeholder.svg"} alt="Avatar preview" fill className="object-cover" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setAvatarPreview(null)
                          setAvatarFile(null)
                          if (avatarInputRef.current) {
                            avatarInputRef.current.value = ""
                          }
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={uploadAvatar} disabled={!avatarFile || isUploading}>
                        {isUploading ? "Uploading..." : "Upload"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex-1 pt-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-3xl font-bold flex items-center gap-2">
                      {profileData.name}
                      <CheckCircle2 className="h-6 w-6 text-blue-500" />
                    </CardTitle>
                    <CardDescription className="text-lg mt-1">@{profileData.username}</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Bell className="h-4 w-4" />
                      <span>Follow</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </Button>
                    <Dialog open={isEditing} onOpenChange={setIsEditing}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Edit className="h-4 w-4" />
                          <span>Edit Profile</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                          <DialogTitle>Edit Profile</DialogTitle>
                          <DialogDescription>Make changes to your profile information.</DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="max-h-[80vh]">
                          <div className="grid gap-4 py-4 pr-4">
                            <div className="grid gap-2">
                              <Label htmlFor="name">Name</Label>
                              <Input
                                id="name"
                                name="name"
                                value={profileData.name}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="username">Username</Label>
                              <Input
                                id="username"
                                name="username"
                                value={profileData.username}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="bio">Bio</Label>
                              <Textarea
                                id="bio"
                                name="bio"
                                value={profileData.bio}
                                onChange={handleInputChange}
                                rows={4}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="position">Position</Label>
                              <Input
                                id="position"
                                name="position"
                                value={profileData.position}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="location">Location</Label>
                              <Input
                                id="location"
                                name="location"
                                value={profileData.location}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                value={profileData.email}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="skills">Skills (comma separated)</Label>
                              <Input
                                id="skills"
                                name="skills"
                                value={profileData.skills.join(", ")}
                                onChange={handleSkillsChange}
                              />
                            </div>
                          </div>
                        </ScrollArea>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleSave}>Save Changes</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button>Connect</Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link href="./">View Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Logout</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{profileData.position}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Available for remote work</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-8 mt-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-primary/10">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardHeader>

            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full justify-start px-8 border-b rounded-none h-14 bg-transparent">
                <TabsTrigger value="about" className="text-base">
                  About
                </TabsTrigger>
                <TabsTrigger value="projects" className="text-base">
                  Projects
                </TabsTrigger>
                <TabsTrigger value="activity" className="text-base">
                  Activity
                </TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="p-0">
                <CardContent className="grid md:grid-cols-3 gap-8 p-8">
                  <div className="md:col-span-2 space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Bio</h3>
                      <p className="text-muted-foreground leading-relaxed">{profileData.bio}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="px-3 py-1.5 text-sm rounded-full hover:bg-primary/20 transition-colors cursor-pointer"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Achievements</h3>
                      <div className="grid gap-4">
                        <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border/50 hover:border-border transition-colors">
                          <div className="p-2 rounded-full bg-yellow-500/10">
                            <Award className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                          </div>
                          <div>
                            <h4 className="font-medium">Design Excellence Award 2023</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Recognized for outstanding contributions to product design and innovation in enterprise
                              solutions
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border/50 hover:border-border transition-colors">
                          <div className="p-2 rounded-full bg-blue-500/10">
                            <Award className="h-6 w-6 text-blue-500 flex-shrink-0" />
                          </div>
                          <div>
                            <h4 className="font-medium">5 Years of Service</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Dedicated team member since 2018, leading multiple successful product launches
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-border transition-colors">
                          <div className="p-1.5 rounded-full bg-primary/10">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <span>{profileData.email}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-border transition-colors">
                          <div className="p-1.5 rounded-full bg-primary/10">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <span>Joined {joinDate}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Social Links</h3>
                      <div className="space-y-3">
                        {socialLinks.map((link, index) => (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted hover:border-border transition-colors group"
                          >
                            <div className="p-1.5 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                              <link.icon className="h-5 w-5 text-primary" />
                            </div>
                            <span>{link.platform}</span>
                            <ExternalLink className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        ))}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full mt-2">
                              <Link2 className="h-4 w-4 mr-2" />
                              Add Social Link
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Social Link</DialogTitle>
                              <DialogDescription>
                                Add a new social media profile link to your profile.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="platform">Platform</Label>
                                <Input id="platform" placeholder="Twitter, LinkedIn, etc." />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="url">URL</Label>
                                <Input id="url" placeholder="https://..." />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline">Cancel</Button>
                              <Button>Add Link</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>

              <TabsContent value="projects">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Recent Projects</h3>
                    <Button variant="outline" size="sm">
                      View All Projects
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <Card
                        key={project.id}
                        className="overflow-hidden border border-border/50 hover:border-border transition-all hover:shadow-md group"
                      >
                        <div className="relative h-48 w-full">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute top-3 right-3">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                            >
                              <Bookmark className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-lg mb-1">{project.title}</h4>
                          <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{project.likes}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{project.views}k</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{project.date}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    <Card className="flex flex-col items-center justify-center p-8 border border-dashed border-border/70 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="p-3 rounded-full bg-primary/10 mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6 text-primary"
                        >
                          <path d="M12 5v14" />
                          <path d="M5 12h14" />
                        </svg>
                      </div>
                      <h4 className="font-medium mb-1">Create New Project</h4>
                      <p className="text-sm text-muted-foreground text-center">Share your work with the community</p>
                    </Card>
                  </div>
                </CardContent>
              </TabsContent>

              <TabsContent value="activity">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Recent Activity</h3>
                    <Button variant="outline" size="sm">
                      View All Activity
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-border/50"></div>
                    <div className="space-y-6">
                      {activities.map((activity) => (
                        <div key={activity.id} className="relative pl-10">
                          <div className="absolute left-0 p-2 rounded-full bg-primary/10 z-10">
                            <activity.icon className="h-4 w-4 text-primary" />
                          </div>
                          <Card className="p-4 border border-border/50 hover:border-border transition-colors">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm">
                                  <span className="font-medium">{profileData.name}</span> {activity.action}{" "}
                                  <span className="font-medium">{activity.title}</span>
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                              </div>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </div>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>

            <CardFooter className="flex justify-between border-t p-6">

              <div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</div>
              <Button variant="outline" size="sm">
                <Link href="/" className="flex items-center gap-1">
                  View Public Profile
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage