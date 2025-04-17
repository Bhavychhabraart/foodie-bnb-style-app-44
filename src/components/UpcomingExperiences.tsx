
import React from 'react';
import { ChevronRight } from 'lucide-react';
import ExperienceCard from './ExperienceCard';
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
}

const UpcomingExperiences: React.FC = () => {
  const { data: experiences = [], isLoading, error } = useQuery({
    queryKey: ['upcoming-experiences'],
    queryFn: async () => {
      // Get current date in YYYY-MM-DD format
      const today = new Date();
      
      // Fetch all events
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('category', 'experiences')
        .order('date', { ascending: true });
      
      if (error) {
        console.error('Error fetching upcoming experiences:', error);
        throw new Error(error.message);
      }
      
      // Filter for upcoming events (today or later)
      return (data as Experience[]).filter(event => {
        // Parse event date (assuming format like "25th April, 2025" or similar)
        const eventDate = new Date(event.date);
        return !isNaN(eventDate.getTime()) && eventDate >= today;
      }).slice(0, 3); // Limit to 3 experiences
    }
  });

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

  if (error || experiences.length === 0) {
    return null; // Don't show this section if there's an error or no upcoming experiences
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
                <ExperienceCard
                  imageUrl={experience.image_url || '/placeholder.svg'}
                  title={experience.title}
                  host={`Date: ${experience.date}`}
                  price={experience.price}
                  rating={experience.rating}
                  reviews={experience.reviews}
                  isSoldOut={experience.is_sold_out}
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
