import Link from "next/link"
import { cn } from "@/lib/utils"

interface MainNavProps {
  isAdmin?: boolean
  className?: string
}

export function MainNav({ isAdmin = false, className }: MainNavProps) {
  const adminLinks = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/content", label: "Content" },
    { href: "/admin/analytics", label: "Analytics" },
  ]

  const userLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/internships", label: "Internships" },
    { href: "/blogs", label: "Blogs" },
    { href: "/resources", label: "Resources" },
  ]

  const links = isAdmin ? adminLinks : userLinks

  return (
    <div className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="text-sm font-medium transition-colors hover:text-primary">
          {link.label}
        </Link>
      ))}
    </div>
  )
}

