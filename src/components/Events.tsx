
import React from 'react';
import EventCard from './EventCard';
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface EventsProps {
  category?: string;
}

// Define a consistent interface for all event objects
interface Event {
  id: string;
  title: string;
  host: string;
  price: string;
  rating: number;
  reviews: number;
  is_sold_out: boolean;
  venue: string;
  time: string;
  image_url: string;
  date: string;
  category: string;
  description: string | null;
  featured: boolean;
  capacity: string | null;
}

const Events: React.FC<EventsProps> = ({
  category = 'home'
}) => {
  // Fetch events from Supabase based on category
  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['events', category],
    queryFn: async () => {
      console.log(`Fetching events for category: ${category}`);
      
      // Get current date
      const today = new Date();
      console.log("Today's date:", today.toISOString());
      
      let query = supabase
        .from('events')
        .select('*');
        
      if (category === 'home') {
        query = query.eq('category', 'home');
        
        const { data, error } = await query.order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching events:', error);
          throw new Error(error.message);
        }
        
        return data as Event[];
      }
      
      // For experiences/upcoming category, show all events with future dates across all categories
      if (category === 'experiences') {
        // Fetch all events first
        const { data, error } = await query.order('date', { ascending: true });
        
        if (error) {
          console.error('Error fetching upcoming events:', error);
          throw new Error(error.message);
        }
        
        console.log("Raw events data:", data);
        
        // Filter for upcoming events (today or later)
        const upcomingEvents = (data as Event[]).filter(event => {
          try {
            // Parse the date string - handle different formats
            const dateStr = event.date.replace(/(st|nd|rd|th)/, ''); // Remove ordinal suffixes
            const eventDate = new Date(dateStr);
            
            // Skip dates that can't be parsed properly
            if (isNaN(eventDate.getTime())) {
              console.log(`Could not parse date for event: ${event.title}, date: ${event.date}`);
              return false;
            }
            
            const isUpcoming = eventDate >= today;
            console.log(`Event: ${event.title}, Date: ${event.date}, Parsed Date: ${eventDate}, Is Upcoming: ${isUpcoming}`);
            return isUpcoming;
          } catch (e) {
            console.error(`Error parsing date for event ${event.title}:`, e);
            return false;
          }
        });
        
        console.log("Filtered upcoming events:", upcomingEvents);
        return upcomingEvents;
      }
      
      // Default case: just filter by the provided category
      const { data, error } = await query.eq('category', category).order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching events:', error);
        throw new Error(error.message);
      }
      
      return data as Event[];
    }
  });

  if (isLoading) {
    return (
      <div className="section-padding bg-airbnb-dark">
        <div className="container-padding mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-2xl text-airbnb-light">Loading Events...</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-gray-800 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-padding bg-airbnb-dark">
        <div className="container-padding mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-2xl text-airbnb-light">Error</h2>
          </div>
          <p className="text-red-500">Failed to load events: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding bg-airbnb-dark">
      <div className="container-padding mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-2xl text-airbnb-light">
            {category === 'experiences' ? 'Upcoming Events' : 'Events'}
          </h2>
          <button className="flex items-center text-airbnb-gold hover:underline text-xs text-left">
            <span className="mr-1">View all</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        {events.length === 0 ? (
          <p className="text-airbnb-light/70">No events found for this category.</p>
        ) : (
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {events.map(event => (
                <CarouselItem key={event.id} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
                  <EventCard 
                    imageUrl={event.image_url || '/placeholder.svg'} 
                    title={event.title} 
                    host={event.host} 
                    price={event.price} 
                    rating={event.rating} 
                    reviews={event.reviews} 
                    isSoldOut={event.is_sold_out} 
                    venue={event.venue} 
                    time={event.time} 
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots className="mt-4" />
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default Events;
