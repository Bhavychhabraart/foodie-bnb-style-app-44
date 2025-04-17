
import React from 'react';
import ExperienceCard from './ExperienceCard';
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ExperiencesProps {
  category?: string;
}

// Define a consistent interface for all experience objects
interface Experience {
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

const Experiences: React.FC<ExperiencesProps> = ({
  category = 'home'
}) => {
  // Fetch experiences from Supabase based on category
  const { data: experiences = [], isLoading, error } = useQuery({
    queryKey: ['experiences', category],
    queryFn: async () => {
      let query = supabase
        .from('events')
        .select('*');
        
      if (category !== 'all') {
        query = query.eq('category', category);
      }
      
      // For menu category, we may want to show specific events
      if (category === 'menu') {
        query = query.eq('category', 'menu');
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching experiences:', error);
        throw new Error(error.message);
      }
      
      return data as Experience[];
    }
  });

  if (isLoading) {
    return (
      <div className="section-padding bg-zinc-900">
        <div className="container-padding mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-2xl">Loading Experiences...</h2>
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
      <div className="section-padding bg-zinc-900">
        <div className="container-padding mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-2xl">Error</h2>
          </div>
          <p className="text-red-500">Failed to load experiences: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding bg-zinc-900">
      <div className="container-padding mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-2xl">
            {category === 'experiences' ? 'Past Experiences' : 'Experiences'}
          </h2>
          <button className="flex items-center text-airbnb-red hover:underline text-xs text-left">
            <span className="mr-1">View all</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        {experiences.length === 0 ? (
          <p className="text-gray-400">No experiences found for this category.</p>
        ) : (
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {experiences.map(experience => (
                <CarouselItem key={experience.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <ExperienceCard
                    imageUrl={experience.image_url || '/placeholder.svg'}
                    title={experience.title}
                    host={experience.host}
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
        )}
      </div>
    </div>
  );
};

export default Experiences;
