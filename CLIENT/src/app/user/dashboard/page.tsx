//CLIENT/src/app/user/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Dashboard from "@/components/dashboard/dashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth-context";

// Define your internship type (adjust based on your actual data structure)
interface Internship {
  id: string;
  title: string;
  // Add other fields that your internship object has
}

function UserDashboardPage() {
  const { token, isAuthenticated } = useAuth();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch data when we have a token and proper authentication
    if (!token || !isAuthenticated) {
      return;
    }

    console.log("UserDashboard: Fetching internships with token");
    
    // Fetch user-specific internships when component mounts
    const fetchInternships = async () => {
      try {
        const response = await fetch('/api/internships/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        setInternships(data);
        console.log("UserDashboard: Internships fetched successfully", data.length);
      } catch (error) {
        console.error('Error fetching internships:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, [token, isAuthenticated]);

  return (
    <ProtectedRoute redirectTo="/user/login">
      <Dashboard internships={internships} loading={loading} />
    </ProtectedRoute>
  );
}

export default UserDashboardPage;