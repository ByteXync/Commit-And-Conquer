import LoginPage from "@/components/LoginPage"
import AuthNavbar from "@/components/AuthNavbar"

function page() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AuthNavbar />
      <div className="flex-1">
        <LoginPage/>
      </div>
    </div>
  )
}

export default page
