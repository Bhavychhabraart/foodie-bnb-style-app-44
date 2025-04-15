import React from 'react';
import { Sparkles, ChevronRight, Calendar, Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
const spotlightItems = [{
  id: 1,
  title: "Chef's Table Experience",
  description: "Exclusive dining at our kitchen counter with the head chef",
  date: "May 28, 2025",
  price: "₹4,500 per person",
  rating: 4.97,
  reviews: 124,
  imageUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
}, {
  id: 2,
  title: "Summer Tasting Menu",
  description: "Our seasonal multi-course journey through local ingredients",
  date: "June 15, 2025",
  price: "₹3,200 per person",
  rating: 4.89,
  reviews: 78,
  imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
}, {
  id: 3,
  title: "Artisan Cocktail Night",
  description: "Join us for an evening of craft cocktails and appetizers",
  date: "May 30, 2025",
  price: "₹2,800 per person",
  rating: 4.92,
  reviews: 53,
  imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1257&q=80"
}];
const Spotlight: React.FC = () => {
  return <div className="section-padding">
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
            {spotlightItems.map(item => <CarouselItem key={item.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="airbnb-card border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="relative mb-2">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-60 object-cover rounded-t-xl" />
                      <div className="absolute top-3 right-3 bg-airbnb-red text-white text-xs font-medium px-2 py-1 rounded-full">
                        Featured
                      </div>
                      
                      <div className="image-dots">
                        <div className="image-dot active"></div>
                        <div className="image-dot"></div>
                        <div className="image-dot"></div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-zinc-900">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-medium">{item.title}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-current text-airbnb-dark" />
                          <span className="ml-1 text-sm">{item.rating.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <p className="text-airbnb-light text-sm mb-2">{item.description}</p>
                      
                      <div className="flex items-center text-airbnb-light text-sm mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{item.date}</span>
                      </div>
                      
                      <p className="font-medium mb-3">{item.price}</p>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 border-airbnb-red text-airbnb-red hover:bg-airbnb-red hover:text-white transition-colors">
                          View Details
                        </Button>
                        
                        <Button className="flex-1 bg-airbnb-red hover:bg-airbnb-red/90 text-white">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>)}
          </CarouselContent>
          <CarouselDots className="mt-4" />
        </Carousel>
      </div>
    </div>;
};
export default Spotlight;