import { useEffect } from 'react';
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
  redirectTo = '/user/login',
}) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      const isAuthorized = isAuthenticated && (!adminOnly || isAdmin);
      
      if (!isAuthorized) {
        router.push(redirectTo);
      }
    }
  }, [isAuthenticated, isAdmin, isLoading, adminOnly, redirectTo, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // If admin route but user is not admin
  if (adminOnly && !isAdmin && isAuthenticated) {
    return <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p>You don't have permission to access this page.</p>
      </div>
    </div>;
  }

  // Return children only if user is authenticated and has required permissions
  return isAuthenticated && (!adminOnly || isAdmin) ? <>{children}</> : null;
};

export default ProtectedRoute;