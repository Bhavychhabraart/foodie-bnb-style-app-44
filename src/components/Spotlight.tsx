
import React, { useState } from 'react';
import { Sparkles, ChevronRight, Calendar, Star, Clock, MapPin, Users, CirclePlus, CalendarCheck } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import BookingDrawer from "@/components/BookingDrawer";
import ExperienceDetailsDrawer from '@/components/ExperienceDetailsDrawer';

interface SpotlightProps {
  tableName?: 'spotlight' | 'makhna_spotlight';
}

const Spotlight: React.FC<SpotlightProps> = ({ tableName = 'spotlight' }) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isBookingDrawerOpen, setIsBookingDrawerOpen] = useState(false);
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  
  const { data: spotlightItems = [], isLoading, error } = useQuery({
    queryKey: ['spotlightItems', tableName],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data;
    }
  });

  const handleViewDetails = (item: any) => {
    setSelectedItem(item);
    setIsDetailsDrawerOpen(true);
  };

  const handleBookNow = (item: any, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click events
    setSelectedItem(item);
    setIsBookingDrawerOpen(true);
  };

  if (isLoading) return (
    <div className="section-padding bg-inherit flex justify-center items-center">
      <span>Loading spotlight items...</span>
    </div>
  );

  if (error) return (
    <div className="section-padding bg-inherit text-red-500">
      Error loading spotlight items: {error.message}
    </div>
  );

  return (
    <div className="section-padding bg-inherit">
      <div className="container-padding mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-2xl">Spotlight</h2>
            <Sparkles className="w-5 h-5 text-airbnb-gold" />
          </div>
          <button className="flex items-center text-airbnb-gold hover:underline group">
            <span className="mr-1 group-hover:mr-2 transition-all">View all</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {spotlightItems.map(item => (
              <CarouselItem key={item.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="border-none rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="relative overflow-hidden aspect-[4/6]">
                        <img 
                          src={item.image_url || '/placeholder.svg'} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                      </div>
                      
                      {item.featured && (
                        <div className="absolute top-3 right-3 bg-airbnb-gold text-black text-xs font-semibold px-3 py-1 rounded-full transform rotate-2 shadow-md">
                          Featured
                        </div>
                      )}
                      
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-sm px-2 py-1 rounded-lg flex items-center">
                        <Star className="h-3 w-3 fill-current text-airbnb-gold mr-1" />
                        <span>{item.rating.toFixed(1)}</span>
                        <span className="text-xs text-gray-300 ml-1">({item.reviews})</span>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-airbnb-gold transition-colors">{item.title}</h3>
                        <p className="text-gray-200 text-sm line-clamp-2 mb-3">{item.description}</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-zinc-900 border-t border-airbnb-gold/20">
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center text-gray-300 text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-airbnb-gold/80" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center text-gray-300 text-sm">
                          <Clock className="h-4 w-4 mr-2 text-airbnb-gold/80" />
                          <span>{item.time}</span>
                        </div>
                        <div className="flex items-center text-gray-300 text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-airbnb-gold/80" />
                          <span>Fine Dine</span>
                        </div>
                        <div className="flex items-center text-gray-300 text-sm">
                          <Users className="h-4 w-4 mr-2 text-airbnb-gold/80" />
                          <span>{item.capacity}</span>
                        </div>
                      </div>
                      
                      <p className="font-medium mb-4 text-airbnb-gold">{item.price}</p>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1 border-airbnb-gold/30 text-airbnb-gold hover:bg-airbnb-gold/10 transition-colors"
                          onClick={() => handleViewDetails(item)}
                        >
                          View Details
                        </Button>
                        
                        <Button 
                          className="flex-1 bg-airbnb-gold hover:bg-airbnb-gold/90 text-black font-medium 
                            animate-bounce-subtle group/reserve"
                          onClick={(e) => handleBookNow(item, e)}
                        >
                          <CalendarCheck className="mr-2 h-5 w-5 group-hover/reserve:scale-110 transition-transform" />
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="mt-6" />
        </Carousel>
      </div>
      
      {selectedItem && (
        <ExperienceDetailsDrawer 
          isOpen={isDetailsDrawerOpen}
          onClose={() => setIsDetailsDrawerOpen(false)}
          experience={{
            imageUrl: selectedItem.image_url || '/placeholder.svg',
            title: selectedItem.title,
            host: selectedItem.host || 'Event Host',
            price: selectedItem.price,
            rating: selectedItem.rating,
            reviews: selectedItem.reviews,
            isSoldOut: selectedItem.is_sold_out || false
          }}
        />
      )}

      <BookingDrawer 
        open={isBookingDrawerOpen} 
        onOpenChange={setIsBookingDrawerOpen} 
      />
    </div>
  );
};

export default Spotlight;
