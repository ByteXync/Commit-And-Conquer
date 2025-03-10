import { BlogHeader } from "@/components/blogs/blog-header"
import { BlogGrid } from "@/components/blogs/blog-grid"
import { ThemeToggleButton } from "@/components/theme-toggle-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BlogsPage() {
  return (
    <div className="container py-6 space-y-8">
      <BlogHeader />

      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="space-y-8">
          {/* Featured Blog Post */}
          <Card className="overflow-hidden">
            <div className="md:grid md:grid-cols-2">
              <div className="relative h-60 md:h-auto bg-muted">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20 md:hidden" />
                <img
                  src="/placeholder.svg?height=600&width=800"
                  alt="Featured blog post"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      Featured
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight">
                      The Future of Web Development: Trends to Watch in 2025
                    </h2>
                  </div>
                  <p className="text-muted-foreground">
                    Explore the cutting-edge technologies and methodologies that will shape the web development
                    landscape in the coming year.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-muted overflow-hidden">
                    <img
                      src="/placeholder.svg?height=32&width=32"
                      alt="Author"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Alex Johnson</p>
                    <p className="text-muted-foreground">March 8, 2025 · 10 min read</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Blog Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Development", count: 24, icon: "💻" },
              { title: "Design", count: 18, icon: "🎨" },
              { title: "Business", count: 12, icon: "📊" },
            ].map((category) => (
              <Card key={category.title} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-bold">{category.title}</CardTitle>
                  <div className="text-2xl">{category.icon}</div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{category.count} articles</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Blog Grid */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
            <BlogGrid />
          </div>
        </TabsContent>

        <TabsContent value="featured">
          <div className="grid gap-6">
            <Card className="overflow-hidden">
              <div className="md:grid md:grid-cols-2">
                <div className="relative h-60 md:h-auto bg-muted">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20 md:hidden" />
                  <img
                    src="/placeholder.svg?height=600&width=800"
                    alt="Featured blog post"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        Featured
                      </span>
                      <h2 className="text-2xl font-bold tracking-tight">
                        The Future of Web Development: Trends to Watch in 2025
                      </h2>
                    </div>
                    <p className="text-muted-foreground">
                      Explore the cutting-edge technologies and methodologies that will shape the web development
                      landscape in the coming year.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-muted overflow-hidden">
                      <img
                        src="/placeholder.svg?height=32&width=32"
                        alt="Author"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Alex Johnson</p>
                      <p className="text-muted-foreground">March 8, 2025 · 10 min read</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="md:grid md:grid-cols-2">
                <div className="relative h-60 md:h-auto bg-muted">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20 md:hidden" />
                  <img
                    src="/placeholder.svg?height=600&width=800"
                    alt="Featured blog post"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        Featured
                      </span>
                      <h2 className="text-2xl font-bold tracking-tight">
                        Mastering UI/UX Design: Creating Intuitive User Experiences
                      </h2>
                    </div>
                    <p className="text-muted-foreground">
                      Learn the principles and practices that lead to exceptional user interfaces and experiences in
                      modern web applications.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-muted overflow-hidden">
                      <img
                        src="/placeholder.svg?height=32&width=32"
                        alt="Author"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Sarah Miller</p>
                      <p className="text-muted-foreground">March 5, 2025 · 8 min read</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="popular">
          <BlogGrid />
        </TabsContent>

        <TabsContent value="recent">
          <BlogGrid />
        </TabsContent>
      </Tabs>

      <ThemeToggleButton />
    </div>
  )
}

