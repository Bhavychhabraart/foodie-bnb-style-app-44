
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Testimonial {
  id: number | string;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  text: string;
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('id, name, avatar_url, date, rating, text')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const formattedData = data.map(item => ({
          id: item.id,
          name: item.name,
          avatar: item.avatar_url,
          date: item.date,
          rating: item.rating,
          text: item.text
        }));
        setTestimonials(formattedData);
      } else {
        // Fallback to default testimonials if none found in database
        setTestimonials([
          {
            id: 1,
            name: "Sarah Johnson",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            date: "March 2025",
            rating: 5,
            text: "Absolutely incredible dining experience! The truffle risotto was divine, and the service was impeccable. The ambiance makes it perfect for special occasions."
          },
          {
            id: 2,
            name: "Michael Chen",
            avatar: "https://randomuser.me/api/portraits/men/22.jpg",
            date: "February 2025",
            rating: 4,
            text: "Great food and atmosphere. The beef tenderloin was cooked to perfection. Only giving 4 stars because we had to wait a bit for our table despite having a reservation."
          },
          {
            id: 3,
            name: "Emma Roberts",
            avatar: "https://randomuser.me/api/portraits/women/32.jpg",
            date: "January 2025",
            rating: 5,
            text: "Our anniversary dinner was spectacular! The tasting menu with wine pairings was worth every penny. The staff made us feel so special."
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      // Use default testimonials on error
      setTestimonials([
        {
          id: 1,
          name: "Sarah Johnson",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          date: "March 2025",
          rating: 5,
          text: "Absolutely incredible dining experience! The truffle risotto was divine, and the service was impeccable. The ambiance makes it perfect for special occasions."
        },
        {
          id: 2,
          name: "Michael Chen",
          avatar: "https://randomuser.me/api/portraits/men/22.jpg",
          date: "February 2025",
          rating: 4,
          text: "Great food and atmosphere. The beef tenderloin was cooked to perfection. Only giving 4 stars because we had to wait a bit for our table despite having a reservation."
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
          <h2 className="text-2xl font-semibold mb-6">What Our Guests Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-padding mx-auto">
        <h2 className="text-2xl font-semibold mb-6">What Our Guests Say</h2>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map(testimonial => (
              <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="airbnb-card h-full border-none shadow-sm">
                  <CardContent className="p-6 bg-zinc-900">
                    <div className="flex justify-between mb-4">
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{testimonial.name}</h3>
                          <p className="text-sm text-airbnb-light">{testimonial.date}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star 
                          key={star} 
                          className={`h-4 w-4 ${star <= testimonial.rating ? 'fill-current text-airbnb-red' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-zinc-100">{testimonial.text}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="mt-4" />
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonials;
