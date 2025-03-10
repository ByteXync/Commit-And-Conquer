"use client"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/dashboard/user-nav"
import { Search } from "@/components/dashboard/search"
import { MainNav } from "@/components/dashboard/main-nav"

interface HeaderProps {
  isAdmin?: boolean
  onOpenSidebar: () => void
}

export function Header({ isAdmin = false, onOpenSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Button variant="ghost" size="icon" onClick={onOpenSidebar} className="mr-2 lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="flex items-center gap-2 lg:hidden">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
            {isAdmin ? "A" : "U"}
          </div>
        </div>
        <MainNav isAdmin={isAdmin} className="hidden lg:flex" />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Search />
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}

