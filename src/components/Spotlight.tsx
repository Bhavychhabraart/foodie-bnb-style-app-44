
import React from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";

const spotlightItems = [
  {
    id: 1,
    title: "Chef's Table Experience",
    description: "Exclusive dining at our kitchen counter with the head chef",
    imageUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 2,
    title: "Summer Tasting Menu",
    description: "Our seasonal multi-course journey through local ingredients",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 3,
    title: "Artisan Cocktail Night",
    description: "Join us for an evening of craft cocktails and appetizers",
    imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1257&q=80"
  }
];

const Spotlight: React.FC = () => {
  return (
    <div className="section-padding">
      <div className="container-padding mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-2xl">Spotlight</h2>
            <Sparkles className="w-5 h-5 text-airbnb-red" />
          </div>
          <button className="flex items-center text-airbnb-red hover:underline text-xs text-left">
            <span className="mr-1">View all</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {spotlightItems.map(item => (
              <CarouselItem key={item.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-sm text-white/80 mt-1">{item.description}</p>
                      </div>
                      <div className="absolute top-3 right-3 bg-airbnb-red text-white text-xs font-medium px-2 py-1 rounded-full">
                        Featured
                      </div>
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

export default Spotlight;
