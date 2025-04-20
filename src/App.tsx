
import { useState, Suspense, useCallback, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import SplashScreen from "./components/SplashScreen";
import LoadingWrapper from "./components/LoadingWrapper";
// import AdminRoute from "./components/AdminRoute";
import { AuthProvider } from "@/providers/AuthProvider";

// Lazy load pages for better performance
const Hacha = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const EditPanel = lazy(() => import("./pages/EditPanel"));
const AdminSiteEditor = lazy(() => import("./pages/AdminSiteEditor"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CloneInstructions = lazy(() => import("./pages/CloneInstructions"));
const Support = lazy(() => import("./pages/Support"));

// Multi-tenant new pages
const TenantSetup = lazy(() => import("./pages/TenantSetup"));
const VenueSetupWizard = lazy(() => import("./pages/VenueSetupWizard"));
const VenueAdminDashboard = lazy(() => import("./pages/VenueAdminDashboard"));
const VenueFrontend = lazy(() => import("./pages/VenueFrontend"));
const SuperAdminDashboard = lazy(() => import("./pages/SuperAdminDashboard"));
const VenueEditPanel = lazy(() => import("./pages/VenueEditPanel"));

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
                  <Suspense fallback={<LoadingWrapper isLoading={true}>Loading...</LoadingWrapper>}>
                    <Routes>
                      {/* Original Routes */}
                      <Route path="/" element={<Hacha />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/support" element={<Support />} />
                      <Route path="/admin" element={<AdminDashboard />} />
                      <Route path="/edit-panel" element={<EditPanel />} />
                      <Route path="/admin/site-editor" element={<AdminSiteEditor />} />
                      <Route path="/clone-instructions" element={<CloneInstructions />} />
                      
                      {/* Multi-tenant Routes */}
                      <Route path="/tenant-setup" element={<TenantSetup />} />
                      <Route path="/venues/:slug/setup" element={<VenueSetupWizard />} />
                      <Route path="/venues/:slug/admin" element={<VenueAdminDashboard />} />
                      <Route path="/venues/:slug/edit/:section" element={<VenueEditPanel />} />
                      <Route path="/venues/:slug" element={<VenueFrontend />} />
                      <Route path="/super-admin" element={<SuperAdminDashboard />} />
                      
                      {/* Fallback Route */}
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
