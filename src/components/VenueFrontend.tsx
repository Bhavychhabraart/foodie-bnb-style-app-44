
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
      // In a production app, you would filter by venue_id
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

  // Function to scroll to booking section
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  return (
    <div className="min-h-screen">
      <Navbar />
      <VenueHero 
        venueName={venue.name}
        venueDescription={venue.description || "Experience the ultimate dining destination!"}
        scrollToBooking={scrollToBooking}
      />
      <VenueAbout 
        title={`About ${venue.name}`}
        description={venue.description || ""}
      />
      <VenueHighlights 
        highlights={highlights}
        loading={highlightsLoading}
      />
      <div id="booking" className="py-12 bg-primary/5">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Book Your Table</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Ready for an unforgettable experience? Reserve your table now and enjoy exceptional service and delicious cuisine.
          </p>
          <div className="flex justify-center">
            <Button size="lg">
              Book Now
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VenueFrontend;
