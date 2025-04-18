
import React from 'react';
import { useState, useEffect } from 'react';
import { ChevronRight, ChefHat, Star, Sparkles } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ChefSpecial {
  id: string;
  title: string;
  chef: string;
  description: string;
  image_url: string | null;
  price: string;
  rating: number;
  is_new: boolean;
  is_popular: boolean;
}

interface ChefsSpecialsProps {
  tableName?: string;
  setActiveCategory?: React.Dispatch<React.SetStateAction<string>>;
}

const ChefsSpecials: React.FC<ChefsSpecialsProps> = ({ 
  tableName = 'chefs_specials',
  setActiveCategory 
}) => {
  const [chefsSpecials, setChefsSpecials] = useState<ChefSpecial[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchChefsSpecials = async () => {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        if (data) {
          setChefsSpecials(data as ChefSpecial[]);
        }
      } catch (error) {
        console.error('Error fetching chef specials:', error);
        toast({
          title: "Error",
          description: "Failed to load chef's specials",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    fetchChefsSpecials();
  }, [tableName, toast]);

  return <div className="section-padding bg-airbnb-cream/10 dark:bg-airbnb-darkbrown">
      <div className="container-padding mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-airbnb-darkbrown dark:text-airbnb-cream">Chef's Specials</h2>
            <ChefHat className="w-5 h-5 text-airbnb-gold" />
          </div>
          <button 
            className="flex items-center text-airbnb-gold hover:underline group"
            onClick={() => setActiveCategory && setActiveCategory('menu')}
          >
            <span className="mr-1 group-hover:mr-2 transition-all">View menu</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        {loading ? <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-airbnb-gold"></div>
          </div> : chefsSpecials.length === 0 ? <div className="text-center py-12 text-gray-500">
            <ChefHat className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No chef's specials available at the moment.</p>
          </div> : <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {chefsSpecials.map(special => <CarouselItem key={special.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div whileHover={{
              y: -5
            }} transition={{
              type: "spring",
              stiffness: 300
            }}>
                    <Card className="border-none overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="relative">
                          <div className="h-64 relative overflow-hidden">
                            <img src={special.image_url || 'https://via.placeholder.com/400x300?text=No+Image'} alt={special.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                          </div>
                          
                          {special.is_new && <div className="absolute top-3 right-3 bg-airbnb-gold text-black text-xs font-semibold px-3 py-1 rounded-full transform rotate-3 shadow-md flex items-center gap-1">
                              <Sparkles className="h-3 w-3" />
                              <span>New</span>
                            </div>}

                          {special.is_popular && <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full transform -rotate-1 shadow-md">
                              Popular
                            </div>}

                          {/* Rating */}
                          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-sm px-2 py-1 rounded-lg flex items-center">
                            <Star className="h-3 w-3 fill-current text-airbnb-gold mr-1" />
                            <span>{special.rating.toFixed(1)}</span>
                          </div>
                          
                          {/* Chef label */}
                          <div className="absolute top-3 left-3 backdrop-blur-sm rounded-full px-3 py-1 flex items-center bg-black/60">
                            <ChefHat className="w-3 h-3 mr-1 text-airbnb-gold" />
                            <span className="text-xs font-medium text-white">{special.chef}</span>
                          </div>
                          
                          {/* Title position over the bottom of image */}
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="font-bold text-xl text-white mb-1">{special.title}</h3>
                            <p className="text-gray-200 text-sm line-clamp-2">{special.description}</p>
                          </div>
                        </div>
                        
                        {/* Price tag */}
                        
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>)}
            </CarouselContent>
            <CarouselDots className="mt-6" />
          </Carousel>}
      </div>
    </div>;
};

export default ChefsSpecials;
