
import React from 'react';
import { Award, Clock, Utensils, Wine } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
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
    <div className="py-10 bg-zinc-900">
      <div className="container-padding mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Highlights</h2>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {highlights.map(highlight => (
              <CarouselItem key={highlight.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card 
                  className="border-none shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden bg-zinc-950"
                >
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center mb-4">
                      <highlight.icon className="w-7 h-7 text-amber-500" />
                    </div>
                    <h3 className="font-medium text-base text-gray-200">{highlight.title}</h3>
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

export default Highlights;
