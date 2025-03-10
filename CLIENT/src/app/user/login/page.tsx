import React, { Suspense } from "react";
import LoginPage from "@/components/LoginPage";
import { Spinner } from "@/components/ui/spinner"; // Assume Spinner is a loading spinner component (you can use a pre-built one like from Tailwind UI)

// Page component with better UI/UX features
function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <Spinner /> {/* Loading spinner while LoginPage is being loaded */}
          </div>
        }
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <LoginPage />
        </div>
      </Suspense>
    </div>
  );
}

export default Page;
