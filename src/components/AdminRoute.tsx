
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { useToast } from '@/hooks/use-toast';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isLoading, isAdmin } = useAuth();
  const { toast } = useToast();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    toast({
      title: "Access Denied",
      description: "Please sign in to continue",
      variant: "destructive"
    });
    return <Navigate to="/auth" />;
  }

  if (!isAdmin) {
    toast({
      title: "Access Denied",
      description: "You don't have admin privileges",
      variant: "destructive"
    });
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AdminRoute;
