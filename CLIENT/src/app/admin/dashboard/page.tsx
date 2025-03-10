import Dashboard from "@/components/dashboard/dashboard";
import DarkModeToggle from "@/components/ui/DarkModeToggle";

function page() {
  return (
    <div>
      <DarkModeToggle />
      <Dashboard />
    </div>
  );
}

export default page;
