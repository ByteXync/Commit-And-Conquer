import Link from "next/link"
import DarkModeToggle from "./DarkModeToggle";


export function MainNav() {
  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        Dashboard
      </Link>
      <DarkModeToggle />
    </div>
  )
}

