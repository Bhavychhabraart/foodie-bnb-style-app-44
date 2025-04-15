
import React from 'react';
import { ChevronRight, Calendar } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const upcomingExperiences = [
  {
    id: 1,
    title: "Farm to Table Dinner",
    date: "May 25, 2025",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    price: "₹3,200 per person"
  },
  {
    id: 2,
    title: "Wine Tasting Evening",
    date: "June 3, 2025",
    imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    price: "₹1,800 per person"
  },
  {
    id: 3,
    title: "Pasta Making Class",
    date: "June 12, 2025",
    imageUrl: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80",
    price: "₹2,500 per person"
  }
];

const UpcomingExperiences: React.FC = () => {
  return (
    <div className="section-padding">
      <div className="container-padding mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Upcoming Experiences</h2>
          <button className="flex items-center text-airbnb-red hover:underline">
            <span className="mr-1">View all</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {upcomingExperiences.map((experience) => (
              <CarouselItem key={experience.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="airbnb-card border-none">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={experience.imageUrl} 
                        alt={experience.title} 
                        className="w-full h-[200px] object-cover rounded-t-xl"
                      />
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">{experience.date}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg">{experience.title}</h3>
                      <p className="text-airbnb-light mt-1">{experience.price}</p>
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

export default UpcomingExperiences;
