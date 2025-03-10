'use client';

import { useEffect, useState } from 'react';
import Dashboard from "@/components/dashboard/dashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth-context";

function UserDashboardPage() {
  const { token } = useAuth();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user-specific internships when component mounts
    const fetchInternships = async () => {
      try {
        const response = await fetch('/api/internships/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data = await response.json();
        setInternships(data);
      } catch (error) {
        console.error('Error fetching internships:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchInternships();
    }
  }, [token]);

  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}

export default UserDashboardPage;