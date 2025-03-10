import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-primary-100 focus:ring-2 focus:ring-primary-500 transition-all">
          <Avatar className="h-10 w-10 border-2 border-transparent hover:border-primary-500">
            {/* Ensure the fallback is styled */}
            <AvatarImage src="/placeholder.svg" alt="User" className="rounded-full" />
            <AvatarFallback className="bg-gray-500 text-white text-xs font-bold">U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 bg-white shadow-lg rounded-lg p-2" align="end" forceMount>
        <DropdownMenuLabel className="font-semibold text-gray-800">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-600">john.doe@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-gray-800 hover:bg-primary-100 transition-colors">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="text-gray-800 hover:bg-primary-100 transition-colors">
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500 hover:bg-red-100 transition-colors">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
