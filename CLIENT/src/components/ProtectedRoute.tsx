import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  adminOnly = false,
  redirectTo = '/login',
}) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Wait for auth state to load before making authorization decisions
    if (!isLoading) {
      // Logic for determining if user is authorized:
      // - Must be authenticated
      // - If adminOnly is true, must also be an admin
      const isAuthorized = isAuthenticated && (!adminOnly || isAdmin);
      setAuthorized(isAuthorized);
      
      if (!isAuthorized) {
        // If not authorized, redirect to login page or specified redirect path
        console.log("Not authorized, redirecting to:", redirectTo);
        router.push(redirectTo);
      }
    }
  }, [isAuthenticated, isAdmin, isLoading, adminOnly, redirectTo, router]);

  // Show loading state while checking authentication
  if (isLoading || authorized === null) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If admin route but user is not admin
  if (adminOnly && !isAdmin && isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="mb-4">You don't have permission to access this page.</p>
          <button 
            onClick={() => router.push('/user/dashboard')} 
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
          >
            Go to User Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Return children only if user is authenticated and has required permissions
  return authorized ? <>{children}</> : null;
};

export default ProtectedRoute;