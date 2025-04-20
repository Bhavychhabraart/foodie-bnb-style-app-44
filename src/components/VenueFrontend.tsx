
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Highlights from "@/components/Highlights";
import ChefsSpecials from "@/components/ChefsSpecials";
import Events from "@/components/Events";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

// Venue type is now correct
interface VenueData {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  contact_email: string;
  contact_phone: string;
  website: string | null;
  owner_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const VenueFrontend: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [venue, setVenue] = useState<VenueData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenue = async () => {
      if (!slug) return;

      try {
        const { data: venueData, error } = await supabase
          .from("venues")
          .select("*")
          .eq("slug", slug)
          .eq("status", "active")
          .maybeSingle();

        if (error) throw error;
        if (!venueData) {
          throw new Error("Venue not found");
        }

        setVenue(venueData as VenueData);
      } catch (error: any) {
        console.error("Error fetching venue:", error);
        toast({
          title: "Not Found",
          description: "The venue you're looking for doesn't exist or is not active",
          variant: "destructive"
        });
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenue();
  }, [slug, toast, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading venue...</p>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Venue Not Found</h1>
          <p className="mb-4">The venue you're looking for doesn't exist or is not available.</p>
          <Button onClick={() => navigate("/")}>Return Home</Button>
        </div>
      </div>
    );
  }

  // Here we would normally pass the venue ID to all the components
  // to fetch venue-specific data, but for now we'll just render
  // the existing components
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Highlights />
      <ChefsSpecials />
      <Events />
      <Footer />
    </div>
  );
};

export default VenueFrontend;

