"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { Bell, LogOut, Settings, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function UserNav() {
  const [notificationCount, setNotificationCount] = useState(3)

  const handleLogout = () => {
    toast.success("Logged out successfully", {
      description: "You have been logged out of your account.",
      action: {
        label: "Login",
        onClick: () => console.log("Login clicked"),
      },
    })
  }

  const clearNotifications = () => {
    setNotificationCount(0)
    toast.info("Notifications cleared")
  }

  return (
    <div className="flex items-center gap-2">
      {/* Notifications */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
                {notificationCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Notifications</span>
            {notificationCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearNotifications} className="h-8 text-xs">
                Clear all
              </Button>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notificationCount > 0 ? (
            <>
              <DropdownMenuItem className="flex flex-col items-start p-3 cursor-default">
                <div className="flex w-full justify-between">
                  <span className="font-medium">New message received</span>
                  <span className="text-xs text-muted-foreground">2m ago</span>
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  John Doe sent you a message about your recent project.
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start p-3 cursor-default">
                <div className="flex w-full justify-between">
                  <span className="font-medium">Task completed</span>
                  <span className="text-xs text-muted-foreground">1h ago</span>
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  Your task "Update documentation" has been marked as complete.
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start p-3 cursor-default">
                <div className="flex w-full justify-between">
                  <span className="font-medium">System update</span>
                  <span className="text-xs text-muted-foreground">1d ago</span>
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  The platform has been updated to version 2.0. Check out the new features!
                </span>
              </DropdownMenuItem>
            </>
          ) : (
            <div className="py-6 text-center text-muted-foreground">
              <p>No new notifications</p>
            </div>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="justify-center text-center cursor-pointer">
            <Link href="/notifications">View all notifications</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">John Doe</p>
              <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

