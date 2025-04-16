
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import ExperienceCard from './ExperienceCard';
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from "@/components/ui/skeleton";

interface Experience {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  price: string;
  host: string;
  rating: number;
  reviews: number;
}

const Experiences: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('id, title, date, image_url, price, host, rating, reviews')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        const formattedData = data.map(item => ({
          id: item.id,
          title: item.title,
          date: item.date,
          imageUrl: item.image_url,
          price: item.price,
          host: item.host || `Date: ${item.date}`,
          rating: item.rating || 4.9,
          reviews: item.reviews || 0
        }));
        setExperiences(formattedData);
      } else {
        // Fallback to default experiences if none found in database
        setExperiences([
          {
            id: '1',
            title: "Farm to Table Dinner",
            date: "May 25, 2025",
            imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            price: "₹3,200 per person",
            host: "Date: May 25, 2025",
            rating: 4.92,
            reviews: 48
          }, 
          {
            id: '2',
            title: "Wine Tasting Evening",
            date: "June 3, 2025",
            imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            price: "₹1,800 per person",
            host: "Date: June 3, 2025",
            rating: 4.8,
            reviews: 36
          }, 
          {
            id: '3',
            title: "Pasta Making Class",
            date: "June 12, 2025",
            imageUrl: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80",
            price: "₹2,500 per person",
            host: "Date: June 12, 2025",
            rating: 4.95,
            reviews: 42
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
      // Use default experiences on error
      setExperiences([
        {
          id: '1',
          title: "Farm to Table Dinner",
          date: "May 25, 2025",
          imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          price: "₹3,200 per person",
          host: "Date: May 25, 2025",
          rating: 4.92,
          reviews: 48
        }, 
        {
          id: '2',
          title: "Wine Tasting Evening",
          date: "June 3, 2025",
          imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          price: "₹1,800 per person",
          host: "Date: June 3, 2025",
          rating: 4.8,
          reviews: 36
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="section-padding">
        <div className="container-padding mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-20" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-padding mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-2xl">Experiences</h2>
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
                  imageUrl={experience.imageUrl}
                  title={experience.title}
                  host={experience.host}
                  price={experience.price}
                  rating={experience.rating}
                  reviews={experience.reviews}
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

export default Experiences;
