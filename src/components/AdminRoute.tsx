
import React from 'react';

interface AdminRouteProps {
  children: React.ReactNode;
}

// Temporarily disabled admin route check for development
const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  return <>{children}</>;
};

export default AdminRoute;
