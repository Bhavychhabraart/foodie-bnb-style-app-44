import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { VenueHero, VenueAbout, VenueHighlights } from "@/components/venue/VenueSections";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

interface Highlight {
  id: string;
  title: string;
  description: string;
  icon_name: string;
}

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
  setup_completed: boolean;
}

const VenueFrontend: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [venue, setVenue] = useState<VenueData | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [highlightsLoading, setHighlightsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchVenue();
  }, [slug]);

  useEffect(() => {
    if (venue) {
      fetchHighlights();
    }
  }, [venue]);

  const fetchVenue = async () => {
    if (!slug) return;

    try {
      setIsLoading(true);
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

  const fetchHighlights = async () => {
    try {
      setHighlightsLoading(true);
      const { data, error } = await supabase
        .from("highlights")
        .select("*")
        .order("created_at");

      if (error) throw error;
      setHighlights(data || []);
    } catch (error) {
      console.error("Error fetching highlights:", error);
    } finally {
      setHighlightsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1F2C]">
        <p className="text-white">Loading venue...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <Navbar />
      <VenueHero 
        venueName="Slique"
        venueDescription="Experience modern luxury dining in the heart of the city. Where contemporary cuisine meets elegant ambiance."
        scrollToBooking={() => {
          const bookingSection = document.getElementById('booking');
          if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
      <VenueAbout />
      <VenueHighlights 
        highlights={highlights}
        loading={highlightsLoading}
      />
      <div id="booking" className="py-20 bg-[#1A1F2C]">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Reserve Your Experience</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join us for an unforgettable dining experience. Reserve your table now and immerse yourself in the world of contemporary cuisine.
          </p>
          <Button 
            size="lg"
            className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
          >
            Book Now
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VenueFrontend;
