
import { useState, Suspense, useCallback, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import SplashScreen from "./components/SplashScreen";
import LoadingWrapper from "./components/LoadingWrapper";
import AdminRoute from "./components/AdminRoute";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const EditPanel = lazy(() => import("./pages/EditPanel"));
const AdminSiteEditor = lazy(() => import("./pages/AdminSiteEditor"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Configure QueryClient with better defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
      refetchOnWindowFocus: false
    }
  }
});

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Toaster />
            <Sonner />
            {showSplash ? (
              <SplashScreen onFinish={handleSplashFinish} />
            ) : (
              <BrowserRouter>
                <TooltipProvider>
                  <Suspense fallback={<LoadingWrapper isLoading={true} skeletonHeight="h-screen">Loading...</LoadingWrapper>}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route 
                        path="/admin" 
                        element={
                          <ErrorBoundary>
                            <AdminRoute>
                              <AdminDashboard />
                            </AdminRoute>
                          </ErrorBoundary>
                        } 
                      />
                      <Route path="/edit-panel" element={<EditPanel />} />
                      <Route 
                        path="/admin/site-editor" 
                        element={
                          <ErrorBoundary>
                            <AdminRoute>
                              <AdminSiteEditor />
                            </AdminRoute>
                          </ErrorBoundary>
                        } 
                      />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </TooltipProvider>
              </BrowserRouter>
            )}
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
