
import React from 'react';
import { Sparkles, ChevronRight, Calendar, Star, Clock, MapPin, Users } from 'lucide-react';
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
  imageUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  capacity: "4-8 guests",
  time: "7:00 PM"
}, {
  id: 2,
  title: "Summer Tasting Menu",
  description: "Our seasonal multi-course journey through local ingredients",
  date: "June 15, 2025",
  price: "₹3,200 per person",
  rating: 4.89,
  reviews: 78,
  imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  capacity: "2-6 guests",
  time: "6:30 PM"
}, {
  id: 3,
  title: "Artisan Cocktail Night",
  description: "Join us for an evening of craft cocktails and appetizers",
  date: "May 30, 2025",
  price: "₹2,800 per person",
  rating: 4.92,
  reviews: 53,
  imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1257&q=80",
  capacity: "2-10 guests",
  time: "8:00 PM"
}];

const Spotlight: React.FC = () => {
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
                      {/* Image with gradient overlay */}
                      <div className="h-64 relative overflow-hidden">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                      </div>
                      
                      {/* Featured badge */}
                      <div className="absolute top-3 right-3 bg-airbnb-gold text-black text-xs font-semibold px-3 py-1 rounded-full transform rotate-2 shadow-md">
                        Featured
                      </div>
                      
                      {/* Rating */}
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-sm px-2 py-1 rounded-lg flex items-center">
                        <Star className="h-3 w-3 fill-current text-airbnb-gold mr-1" />
                        <span>{item.rating.toFixed(1)}</span>
                        <span className="text-xs text-gray-300 ml-1">({item.reviews})</span>
                      </div>
                      
                      {/* Main content positioned over the bottom of the image */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-airbnb-gold transition-colors">{item.title}</h3>
                        <p className="text-gray-200 text-sm line-clamp-2 mb-3">{item.description}</p>
                      </div>
                    </div>
                    
                    {/* Details section */}
                    <div className="p-4 bg-zinc-900 border-t border-airbnb-gold/20">
                      {/* Event details */}
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
                        >
                          View Details
                        </Button>
                        
                        <Button 
                          className="flex-1 bg-airbnb-gold hover:bg-airbnb-gold/90 text-black font-medium"
                        >
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
    </div>
  );
};

export default Spotlight;
