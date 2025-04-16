
import React from 'react';
import { Award, Clock, Utensils, Wine } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";

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
    <div className="py-10 bg-airbnb-cream/10 dark:bg-airbnb-darkbrown">
      <div className="container-padding mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center text-airbnb-darkbrown dark:text-airbnb-cream">Highlights</h2>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {highlights.map(highlight => (
              <CarouselItem key={highlight.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="border-none shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden bg-airbnb-cream dark:bg-airbnb-darkbrown/80">
                  <CardContent className="p-6 flex flex-col items-center text-center bg-airbnb-cream/80 dark:bg-airbnb-darkbrown">
                    <div className="w-14 h-14 rounded-full bg-airbnb-gold/20 flex items-center justify-center mb-4">
                      <highlight.icon className="w-7 h-7 text-airbnb-gold" />
                    </div>
                    <h3 className="font-medium text-base text-airbnb-darkbrown dark:text-airbnb-beige">{highlight.title}</h3>
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
