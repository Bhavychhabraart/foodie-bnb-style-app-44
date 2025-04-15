
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Index from "./pages/Index";
import Detail from "./pages/Detail";
import BookingRequest from "./pages/BookingRequest"; 
import AdminDashboard from "./pages/AdminDashboard";
import EditPanel from "./pages/EditPanel";
import NotFound from "./pages/NotFound";

// Import Montserrat font
import "./App.css";

// Create QueryClient outside of the component
const queryClient = new QueryClient();

// Create the App component
const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  // Add Montserrat font
  const montserratFontLink = document.createElement('link');
  montserratFontLink.rel = 'stylesheet';
  montserratFontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap';
  document.head.appendChild(montserratFontLink);

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
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/detail" element={<Detail />} />
              <Route path="/booking" element={<BookingRequest />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/edit" element={<EditPanel />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </BrowserRouter>
      )}
    </QueryClientProvider>
  );
};

export default App;
