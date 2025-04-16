
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import SplashScreen from "./components/SplashScreen";
import Index from "./pages/Index";
import Detail from "./pages/Detail";
import BookingRequest from "./pages/BookingRequest"; 
import AdminDashboard from "./pages/AdminDashboard";
import EditPanel from "./pages/EditPanel";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Create QueryClient outside of the component
const queryClient = new QueryClient();

// Create the App component
const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  // Return the app's JSX
  return (
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
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/detail" element={<Detail />} />
                  <Route path="/booking" element={<BookingRequest />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/edit" element={<EditPanel />} />
                  <Route path="/auth" element={<Auth />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </TooltipProvider>
            </BrowserRouter>
          )}
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
