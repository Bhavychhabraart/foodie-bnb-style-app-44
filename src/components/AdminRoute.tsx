
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldAlert } from 'lucide-react';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isLoading, isAdmin } = useAuth();
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-airbnb-red mb-4" />
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
    
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md">
          <ShieldAlert className="h-12 w-12 text-airbnb-red mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Admin Access Required</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You need admin privileges to access this page. Please sign in with an admin account.
          </p>
          <div className="space-y-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              To become an admin, use the admin code <strong>FINEDINE2025</strong> when registering.
            </p>
            <button 
              onClick={() => window.location.href = '/auth'}
              className="w-full px-4 py-2 bg-airbnb-red text-white rounded-md hover:bg-airbnb-red/90 transition-colors"
            >
              Go to Login Page
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
