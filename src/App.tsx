
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./components/SplashScreen";
import Index from "./pages/Index";
import Detail from "./pages/Detail";
import BookingRequest from "./pages/BookingRequest"; 
import AdminDashboard from "./pages/AdminDashboard";
import EditPanel from "./pages/EditPanel";
import NotFound from "./pages/NotFound";
import PageTransition from "./components/PageTransition";

// Create QueryClient outside of the component
const queryClient = new QueryClient();

// AnimatedRoutes component to handle route transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Index />
          </PageTransition>
        } />
        <Route path="/detail" element={
          <PageTransition>
            <Detail />
          </PageTransition>
        } />
        <Route path="/booking" element={
          <PageTransition>
            <BookingRequest />
          </PageTransition>
        } />
        <Route path="/admin" element={
          <PageTransition>
            <AdminDashboard />
          </PageTransition>
        } />
        <Route path="/edit" element={
          <PageTransition>
            <EditPanel />
          </PageTransition>
        } />
        <Route path="*" element={
          <PageTransition>
            <NotFound />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
};

// Create the App component
const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  // Return the app's JSX
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <BrowserRouter>
          <TooltipProvider>
            <AnimatedRoutes />
          </TooltipProvider>
        </BrowserRouter>
      )}
    </QueryClientProvider>
  );
};

export default App;
