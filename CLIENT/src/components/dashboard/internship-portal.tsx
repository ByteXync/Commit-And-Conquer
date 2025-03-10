import { useState } from "react"
import InternshipList from "./internship-list"
import AdminDashboard from "./admin-dashboard"
import Navigation from "./navigation"

export default function InternshipPortal() {
  const [currentView, setCurrentView] = useState("public")
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation onViewChange={setCurrentView} currentView={currentView} />
      
      <main className="container mx-auto py-8 px-4 flex-1">
        {currentView === "public" ? (
          <>
            <h1 className="text-3xl font-bold mb-6">Available Internships</h1>
            <p className="text-muted-foreground mb-6">
              Explore our available internship opportunities and apply today!
            </p>
            <InternshipList />
          </>
        ) : (
          <AdminDashboard />
        )}
      </main>
      
      <footer className="bg-background border-t py-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Internship Portal. All rights reserved.
      </footer>
    </div>
  )
}