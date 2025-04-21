
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { VenueHero, VenueAbout, VenueHighlights } from "@/components/venue/VenueSections";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import LoadingWrapper from "@/components/LoadingWrapper";

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

// Dummy data for Slique venue
const dummyVenueData: VenueData = {
  id: "dummy-id",
  name: "Slique",
  slug: "slique",
  description: "Experience modern luxury dining in the heart of the city. Where contemporary cuisine meets elegant ambiance.",
  address: "123 Luxury Avenue, Downtown",
  contact_email: "info@slique.com",
  contact_phone: "+1 (555) 123-4567",
  website: "https://slique.com",
  owner_id: "dummy-owner",
  status: "active",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  setup_completed: true
};

// Dummy highlights data
const dummyHighlights: Highlight[] = [
  {
    id: '1',
    title: 'Michelin-Starred Chef',
    description: 'Experience culinary masterpieces crafted by our internationally acclaimed chef team.',
    icon_name: 'Award'
  },
  {
    id: '2',
    title: 'Farm to Table',
    description: 'We source only the finest seasonal ingredients from local artisanal producers.',
    icon_name: 'Utensils'
  },
  {
    id: '3',
    title: 'Private Dining',
    description: 'Exclusive dining spaces available for intimate gatherings and special occasions.',
    icon_name: 'Clock'
  }
];

const VenueFrontend: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [venue, setVenue] = useState<VenueData | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [highlightsLoading, setHighlightsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if slug is "slique" for our demo venue
    if (slug === "slique") {
      setVenue(dummyVenueData);
      setHighlights(dummyHighlights);
      setIsLoading(false);
      setHighlightsLoading(false);
    } else {
      fetchVenue();
    }
  }, [slug]);

  useEffect(() => {
    if (venue && slug !== "slique") {
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
        // If venue not found and not slique, show an error
        if (slug !== "slique") {
          toast({
            title: "Not Found",
            description: "The venue you're looking for doesn't exist or is not active",
            variant: "destructive"
          });
          navigate("/");
          return;
        }
      }

      setVenue(venueData as VenueData || dummyVenueData);
    } catch (error: any) {
      console.error("Error fetching venue:", error);
      
      // For any error, fall back to dummy data if this is the slique slug
      if (slug === "slique") {
        setVenue(dummyVenueData);
      } else {
        toast({
          title: "Error",
          description: "There was an error loading the venue data",
          variant: "destructive"
        });
        navigate("/");
      }
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
      // For slique, always ensure we have highlights even if the fetch fails
      if (slug === "slique") {
        setHighlights(dummyHighlights);
      }
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
        venueName={venue?.name || "Slique"}
        venueDescription={venue?.description || "Experience modern luxury dining in the heart of the city. Where contemporary cuisine meets elegant ambiance."}
        scrollToBooking={() => {
          const bookingSection = document.getElementById('booking');
          if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
      <VenueAbout />
      <VenueHighlights 
        highlights={highlights.length > 0 ? highlights : dummyHighlights}
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
