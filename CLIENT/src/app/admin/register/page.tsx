import AdminSignUp from "@/components/adminSignup"
import AuthNavbar from "@/components/AuthNavbar"

function page() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AuthNavbar />
      <div className="flex-1">
        <AdminSignUp/>
      </div>
    </div>
  )
}

export default page
