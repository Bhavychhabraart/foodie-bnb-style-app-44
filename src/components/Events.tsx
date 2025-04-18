
import React, { useMemo } from 'react';
import EventCard from './EventCard';
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import LoadingWrapper from './LoadingWrapper';
import ErrorBoundary from './ErrorBoundary';

interface EventsProps {
  tableName?: string;
  category?: string;
}

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
  tableName = 'events',
  category = 'home'
}) => {
  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['events', tableName, category],
    queryFn: async () => {
      console.log(`Fetching events for category: ${category} from table: ${tableName}`);
      
      const today = new Date();
      console.log("Today's date:", today.toISOString());
      
      let query = supabase
        .from(tableName)
        .select('*');
        
      if (category !== 'home') {
        query = query.eq('category', category);
      }
        
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching events:', error);
        throw new Error(error.message);
      }
      
      return data as Event[];
    }
  });

  const filteredEvents = useMemo(() => {
    if (!events.length) return [];
    
    const today = new Date();
    return category === 'experiences' 
      ? events.filter(event => {
          try {
            const dateStr = event.date.replace(/(st|nd|rd|th)/, '');
            const eventDate = new Date(dateStr);
            return !isNaN(eventDate.getTime()) && eventDate >= today;
          } catch (e) {
            console.error(`Error parsing date for event ${event.title}:`, e);
            return false;
          }
        })
      : events;
  }, [events, category]);

  return (
    <ErrorBoundary>
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
          
          <LoadingWrapper isLoading={isLoading}>
            {error ? (
              <p className="text-red-500">Failed to load events: {error.message}</p>
            ) : filteredEvents.length === 0 ? (
              <p className="text-airbnb-light/70">No events found for this category.</p>
            ) : (
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {filteredEvents.map(event => (
                    <CarouselItem 
                      key={event.id} 
                      className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4"
                    >
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
          </LoadingWrapper>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default React.memo(Events);
