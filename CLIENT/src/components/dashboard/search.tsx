"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { SearchIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Search() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleClear = () => {
    setSearchQuery("")
  }

  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="w-full pl-8 pr-10 md:w-[300px] lg:w-[320px]"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-9 w-9" onClick={handleClear}>
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </div>
  )
}

