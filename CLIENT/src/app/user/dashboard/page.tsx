"use client"; // Ensures it's a client component

import Dashboard from "@/components/dashboard/dashboard";
import { Suspense, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sun, Moon } from "lucide-react"; // Icons for dark mode

function Page() {
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-black"
      } p-6 space-y-4 min-h-screen transition-all`}
    >
      {/* Top Bar with Search and Dark Mode Toggle */}
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search dashboard..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Fixed the onChange handler
          className="w-full md:w-1/3 border rounded-lg p-2"
        />
        <Button onClick={() => setDarkMode(!darkMode)} className="ml-4">
          {darkMode ? <Sun /> : <Moon />}
        </Button>
      </div>

      {/* Dashboard with Lazy Loading */}
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <Dashboard searchQuery={search} />
      </Suspense>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Users", value: "1,245 Active" },
          { title: "Sales", value: "$23,500" },
          { title: "Tickets", value: "78 Pending" },
        ].map((item, index) => (
          <Card key={index} className="p-4">
            <CardContent>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Refresh Button for Real-Time Updates */}
      <Button onClick={() => window.location.reload()} className="mt-4">
        Refresh
      </Button>
    </div>
  );
}

export default Page;

