
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingWrapperProps {
  isLoading: boolean;
  children: React.ReactNode;
  skeletonHeight?: string;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ 
  isLoading, 
  children, 
  skeletonHeight = "h-[300px]" 
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className={`w-full ${skeletonHeight}`} />
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingWrapper;
