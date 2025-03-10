import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

export function Search() {
  return (
    <div className="relative w-full max-w-sm">
      {/* Search Icon */}
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      
      {/* Search Input */}
      <Input
        type="search"
        placeholder="Search..."
        className="w-full pl-10 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-300 ease-in-out"
        aria-label="Search"
      />
    </div>
  )
}
