import Link from "next/link"

export function MainNav() {
  return (
    <div className="flex items-center justify-between space-x-8 bg-gray-800 py-3 px-6 rounded-full shadow-md">
      <Link
        href="/"
        className="text-sm font-bold text-white hover:text-primary transition-all duration-300 ease-in-out transform hover:scale-105"
        aria-label="Go to homepage"
      >
        Home
      </Link>
    </div>
  )
}
