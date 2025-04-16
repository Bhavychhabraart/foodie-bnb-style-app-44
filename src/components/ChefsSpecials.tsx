
import React from 'react';
import { ChevronRight, ChefHat, Star, Sparkles } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

const chefsSpecials = [
  {
    id: 1,
    title: "Truffle Pasta",
    chef: "Chef Marcus",
    description: "Fresh homemade pasta with black truffle, parmesan cream sauce and wild mushrooms",
    imageUrl: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    price: "₹1,800",
    rating: 4.9,
    isNew: true
  },
  {
    id: 2,
    title: "Beef Wellington",
    chef: "Chef Alessandro",
    description: "Prime beef tenderloin wrapped in mushroom duxelles, prosciutto and golden puff pastry",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    price: "₹2,400",
    rating: 4.8,
    isNew: false
  }, 
  {
    id: 3,
    title: "Seafood Paella",
    chef: "Chef Maria",
    description: "Traditional Spanish dish with saffron rice, seafood, and aromatic herbs",
    imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
    price: "₹1,800",
    rating: 4.7,
    isNew: false
  }
];

const ChefsSpecials: React.FC = () => {
  return (
    <div className="section-padding bg-airbnb-cream/10 dark:bg-airbnb-darkbrown">
      <div className="container-padding mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-airbnb-darkbrown dark:text-airbnb-cream">Chef's Specials</h2>
            <ChefHat className="w-5 h-5 text-airbnb-gold" />
          </div>
          <button className="flex items-center text-airbnb-gold hover:underline group">
            <span className="mr-1 group-hover:mr-2 transition-all">View menu</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {chefsSpecials.map(special => (
              <CarouselItem key={special.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <motion.div 
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="border-none overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="h-64 relative overflow-hidden">
                          <img 
                            src={special.imageUrl} 
                            alt={special.title} 
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                        </div>
                        
                        {special.isNew && (
                          <div className="absolute top-3 right-3 bg-airbnb-gold text-black text-xs font-semibold px-3 py-1 rounded-full transform rotate-3 shadow-md flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            <span>New</span>
                          </div>
                        )}

                        {/* Rating */}
                        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-sm px-2 py-1 rounded-lg flex items-center">
                          <Star className="h-3 w-3 fill-current text-airbnb-gold mr-1" />
                          <span>{special.rating}</span>
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
                      <div className="p-4 bg-zinc-900">
                        <div className="flex justify-between items-center">
                          <div className="font-medium text-airbnb-gold">{special.price}</div>
                          <button className="text-sm text-white bg-airbnb-gold hover:bg-airbnb-gold/90 px-3 py-1 rounded-full transition-colors">
                            Order now
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="mt-6" />
        </Carousel>
      </div>
    </div>
  );
};

export default ChefsSpecials;
