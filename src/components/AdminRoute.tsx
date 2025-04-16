
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface AdminRouteProps {
  children: React.ReactNode;
}

// Simple Admin Route that checks if user is admin
const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isLoading, isAdmin } = useAuth();
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Checking credentials...</p>
      </div>
    );
  }

  if (!user) {
    toast({
      title: "Access Denied",
      description: "Please sign in to access this page",
      variant: "destructive"
    });
    return <Navigate to="/auth" />;
  }

  if (!isAdmin) {
    toast({
      title: "Admin Access Required",
      description: "You need admin privileges to access this page",
      variant: "destructive"
    });
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AdminRoute;
