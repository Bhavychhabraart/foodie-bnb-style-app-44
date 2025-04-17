
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import EventCard from './EventCard';

interface Experience {
  id: string;
  title: string;
  host: string;
  price: string;
  rating: number;
  reviews: number;
  is_sold_out: boolean;
  image_url: string;
  date: string;
  venue: string;
  time: string;
}

const UpcomingExperiences: React.FC = () => {
  const { data: experiences = [], isLoading, error } = useQuery({
    queryKey: ['upcoming-experiences'],
    queryFn: async () => {
      console.log("Fetching upcoming experiences");
      
      // Get current date
      const today = new Date();
      console.log("Today's date:", today.toISOString());
      
      // Fetch events from the events table
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });
      
      if (error) {
        console.error('Error fetching upcoming experiences:', error);
        throw new Error(error.message);
      }
      
      console.log("Raw events data:", data);
      
      // Filter for upcoming events (today or later)
      const filteredEvents = (data as Experience[]).filter(event => {
        // Parse event date (assuming format like "25th April, 2025" or similar)
        try {
          const eventDate = new Date(event.date);
          const isUpcoming = !isNaN(eventDate.getTime()) && eventDate >= today;
          console.log(`Event: ${event.title}, Date: ${event.date}, Parsed Date: ${eventDate}, Is Upcoming: ${isUpcoming}`);
          return isUpcoming;
        } catch (e) {
          console.error(`Error parsing date for event ${event.title}:`, e);
          return false;
        }
      });
      
      console.log("Filtered upcoming events:", filteredEvents);
      return filteredEvents.slice(0, 3); // Limit to 3 experiences
    }
  });

  console.log("Rendered experiences:", experiences);

  if (isLoading) {
    return (
      <div className="section-padding">
        <div className="container-padding mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-2xl">Loading Experiences...</h2>
          </div>
          <div className="animate-pulse flex space-x-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-gray-800 rounded-lg flex-1"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Error in UpcomingExperiences:", error);
    return (
      <div className="section-padding">
        <div className="container-padding mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-2xl">Error Loading Experiences</h2>
          </div>
          <p className="text-red-500">{error.message}</p>
        </div>
      </div>
    );
  }

  if (experiences.length === 0) {
    return (
      <div className="section-padding">
        <div className="container-padding mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-2xl">Upcoming Experiences</h2>
          </div>
          <p className="text-gray-400">No upcoming experiences found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-padding mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-2xl">Upcoming Experiences</h2>
          <button className="flex items-center text-airbnb-red hover:underline text-xs text-left">
            <span className="mr-1">View all</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {experiences.map(experience => (
              <CarouselItem key={experience.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <EventCard
                  imageUrl={experience.image_url || '/placeholder.svg'}
                  title={experience.title}
                  host={`Date: ${experience.date}`}
                  price={experience.price}
                  rating={experience.rating}
                  reviews={experience.reviews}
                  isSoldOut={experience.is_sold_out}
                  venue={experience.venue}
                  time={experience.time}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="mt-4" />
        </Carousel>
      </div>
    </div>
  );
};

export default UpcomingExperiences;
