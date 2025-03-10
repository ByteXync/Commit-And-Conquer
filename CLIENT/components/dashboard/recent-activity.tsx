import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data for recent activity
const activities = [
  {
    id: "1",
    type: "application",
    title: "Applied to Frontend Developer at TechCorp Inc.",
    time: "2 hours ago",
    icon: "TC",
  },
  {
    id: "2",
    type: "resume",
    title: "Updated your resume",
    time: "Yesterday",
    icon: "R",
  },
  {
    id: "3",
    type: "interview",
    title: "Scheduled interview with StartupXYZ",
    time: "2 days ago",
    icon: "SX",
  },
  {
    id: "4",
    type: "application",
    title: "Applied to Software Engineer at BigTech Co.",
    time: "3 days ago",
    icon: "BT",
  },
  {
    id: "5",
    type: "feedback",
    title: "Received feedback on your UI/UX Developer application",
    time: "5 days ago",
    icon: "DS",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src="" alt={activity.title} />
            <AvatarFallback>{activity.icon}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium leading-none">{activity.title}</p>
              <Badge variant="outline" className="ml-auto">
                {activity.type}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

