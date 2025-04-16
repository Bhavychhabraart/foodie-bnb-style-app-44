
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChefHat, Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface ChefSpecial {
  id: string;
  title: string;
  chef: string;
  imageUrl: string;
  price: string;
  rating: number;
  description?: string;
}

const ChefsSpecials: React.FC = () => {
  const [chefsSpecials, setChefsSpecials] = useState<ChefSpecial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChefSpecials() {
      try {
        const { data, error } = await supabase
          .from('chef_specials')
          .select('id, title, chef, image_url, price, rating, description')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }

        if (data) {
          const formattedData = data.map(item => ({
            id: item.id,
            title: item.title,
            chef: item.chef,
            imageUrl: item.image_url,
            price: item.price,
            rating: item.rating || 4.5,
            description: item.description
          }));
          setChefsSpecials(formattedData);
        }
      } catch (error) {
        console.error('Error fetching chef specials:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchChefSpecials();
  }, []);

  // Fallback data if no chef specials are found
  const fallbackSpecials = [
    {
      id: "2",
      title: "Beef Wellington",
      chef: "Chef Alessandro",
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      price: "₹2,400",
      rating: 4.8
    }, 
    {
      id: "3",
      title: "Seafood Paella",
      chef: "Chef Maria",
      imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
      price: "₹1,800",
      rating: 4.7
    }
  ];

  // If no specials found in database and finished loading, use fallback data
  const specialsToDisplay = chefsSpecials.length > 0 ? chefsSpecials : (loading ? [] : fallbackSpecials);

  if (loading) {
    return (
      <div className="section-padding bg-airbnb-cream/10 dark:bg-airbnb-darkbrown">
        <div className="container-padding mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-airbnb-darkbrown dark:text-airbnb-cream">Chef's Specials</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2].map((item) => (
              <Card key={item} className="airbnb-card border-none">
                <CardContent className="p-0">
                  <Skeleton className="w-full h-[200px] rounded-t-xl" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding bg-airbnb-cream/10 dark:bg-airbnb-darkbrown">
      <div className="container-padding mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-airbnb-darkbrown dark:text-airbnb-cream">Chef's Specials</h2>
          <button className="flex items-center text-airbnb-gold hover:underline">
            <span className="mr-1">View menu</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {specialsToDisplay.map(special => (
              <CarouselItem key={special.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="airbnb-card border-none">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={special.imageUrl} 
                        alt={special.title} 
                        className="w-full h-[200px] object-cover rounded-t-xl" 
                      />
                      <div className="absolute top-3 left-3 backdrop-blur-sm rounded-full px-3 py-1 flex items-center bg-airbnb-darkbrown/70">
                        <ChefHat className="w-4 h-4 mr-1 text-airbnb-cream" />
                        <span className="text-sm font-medium text-airbnb-cream">{special.chef}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-airbnb-cream dark:bg-airbnb-darkbrown">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-lg text-airbnb-darkbrown dark:text-airbnb-cream">{special.title}</h3>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-current text-airbnb-gold" />
                          <span className="ml-1 text-sm">{special.rating}</span>
                        </div>
                      </div>
                      <p className="text-airbnb-darkbrown/70 dark:text-airbnb-beige mt-1">{special.price}</p>
                    </div>
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

export default ChefsSpecials;
