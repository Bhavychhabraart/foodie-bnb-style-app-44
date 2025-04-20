
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import LoadingWrapper from './LoadingWrapper';

interface AdminRouteProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children, requireSuperAdmin = false }) => {
  const { isAdmin, isSuperAdmin, isLoading, user } = useAuth();

  if (isLoading) {
    return <LoadingWrapper isLoading={true}>Loading...</LoadingWrapper>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If super admin is required and user is not a super admin
  if (requireSuperAdmin && !isSuperAdmin) {
    return <Navigate to="/" replace />;
  }

  // For regular admin routes
  if (!isAdmin && !isSuperAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
