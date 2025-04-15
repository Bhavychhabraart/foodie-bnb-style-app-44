
import React from 'react';
import { Award, Clock, Utensils, Wine } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const highlights = [
  {
    id: 1,
    title: "Award-Winning Chefs",
    icon: Award
  }, 
  {
    id: 2,
    title: "Farm to Table",
    icon: Utensils
  }, 
  {
    id: 3,
    title: "Premium Wine Selection",
    icon: Wine
  }, 
  {
    id: 4,
    title: "Exclusive Dining Hours",
    icon: Clock
  }
];

const Highlights: React.FC = () => {
  return (
    <div className="py-10 bg-white">
      <div className="container-padding mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Highlights</h2>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {highlights.map(highlight => (
              <CarouselItem key={highlight.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card 
                  className="border-none shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                >
                  <CardContent className="p-4 flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-soft-orange flex items-center justify-center flex-shrink-0">
                      <highlight.icon className="w-6 h-6 text-airbnb-red" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-base">{highlight.title}</h3>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-x-1/2" />
          <CarouselNext className="right-0 translate-x-1/2" />
        </Carousel>
      </div>
    </div>
  );
};

export default Highlights;
