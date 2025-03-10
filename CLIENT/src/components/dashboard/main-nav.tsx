import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Briefcase, FileText, Bell } from "lucide-react"

export function MainNav() {
  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <Button variant="ghost" asChild className="text-sm font-medium transition-colors hover:text-primary">
        <Link href="/">
          <Home className="h-4 w-4 mr-2" />
          Home
        </Link>
      </Button>
     
      <Button variant="ghost" asChild className="text-sm font-medium transition-colors hover:text-primary">
        <Link href="/notifications">
          <Bell className="h-4 w-4 mr-2" />
          Notifications
        </Link>
      </Button>
    </div>
  )
}
