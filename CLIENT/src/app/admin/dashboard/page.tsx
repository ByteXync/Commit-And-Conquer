import { Suspense, useState } from "react";
import Dashboard from "@/components/dashboard/dashboard"; // Ensure that Dashboard is correctly handling the searchQuery prop
import { Input } from "@/components/ui/input"; // Assuming Input component is from your UI kit
import { Card, CardContent } from "@/components/ui/card"; // Assuming Card and CardContent are from your UI kit
import { Skeleton } from "@/components/ui/skeleton"; // Skeleton for loading states
import { Button } from "@/components/ui/button"; // Button for refresh functionality

function Page() {
  const [search, setSearch] = useState("");

  return (
    <div className="p-6 space-y-4">
      {/* Search Bar for Quick Access */}
      <Input
        placeholder="Search dashboard..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/3"
      />

      {/* Dashboard with Suspense (Lazy Loading) */}
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <Dashboard searchQuery={search} /> {/* Pass searchQuery to the Dashboard */}
      </Suspense>

      {/* Example of Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-bold">Users</h3>
            <p className="text-lg text-gray-600">1,245 Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-bold">Sales</h3>
            <p className="text-lg text-gray-600">$23,500</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-xl font-bold">Tickets</h3>
            <p className="text-lg text-gray-600">78 Pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Refresh Button for Real-Time Updates */}
      <Button onClick={() => window.location.reload()}>Refresh</Button>
    </div>
  );
}

export default Page;
