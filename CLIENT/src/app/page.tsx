import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { ThemeToggleButton } from "@/components/theme-toggle-button"
import { ArrowRight, Building2, Users } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/placeholder.svg" alt="Logo" width={32} height={32} className="rounded" />
            <span className="text-lg font-bold">Your Brand</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button asChild variant="default">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Welcome to Our Platform
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                A modern, responsive platform with dedicated portals for both administrators and users.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button size="lg" className="gap-1">
                Get Started <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Cards */}
      <section className="py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
            {/* Admin Portal Card */}
            <Card className="overflow-hidden border-2 card-hover">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl text-primary">Admin Portal</CardTitle>
                <CardDescription>Manage your platform, users, and content with powerful admin tools.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    User management and permissions
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Content moderation tools
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Analytics and reporting
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    System configuration
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/admin/login">Access Admin Portal</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* User Portal Card */}
            <Card className="overflow-hidden border-2 card-hover">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-secondary/10 mb-4">
                  <Users className="w-6 h-6 text-brand-secondary" />
                </div>
                <CardTitle className="text-2xl text-brand-secondary">User Portal</CardTitle>
                <CardDescription>
                  Access your account, manage your profile, and explore available resources.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-brand-secondary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Personal profile management
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-brand-secondary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Resource browsing and access
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-brand-secondary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Communication tools
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-brand-secondary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Personalized dashboard
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/user/login">Access User Portal</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Trusted by Organizations</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                See what our users have to say about our platform.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={`/placeholder.svg?height=40&width=40`}
                        alt="Avatar"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div className="grid gap-1">
                      <h3 className="font-semibold">John Doe</h3>
                      <p className="text-sm text-muted-foreground">Company {i}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      "This platform has transformed how we manage our resources. The interface is intuitive and the
                      features are exactly what we needed."
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Image src="/placeholder.svg" alt="Logo" width={24} height={24} className="rounded" />
            <span className="text-lg font-bold">Your Brand</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating Theme Toggle Button */}
      <ThemeToggleButton />
    </div>
  )
}

