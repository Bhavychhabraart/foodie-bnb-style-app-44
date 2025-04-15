import React from 'react';
import { ChevronRight, ChefHat, Star } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const chefsSpecials = [
  {
    id: 1,
    title: "Truffle Risotto",
    chef: "Chef Marcus",
    imageUrl: "https://images.unsplash.com/photo-1634140801787-bfc0aedc2fe8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    price: "₹1,200",
    rating: 4.9
  },
  {
    id: 2,
    title: "Beef Wellington",
    chef: "Chef Alessandro",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    price: "₹2,400",
    rating: 4.8
  },
  {
    id: 3,
    title: "Seafood Paella",
    chef: "Chef Maria",
    imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
    price: "₹1,800",
    rating: 4.7
  }
];

const ChefsSpecials: React.FC = () => {
  return (
    <div className="section-padding bg-gray-50">
      <div className="container-padding mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Chef's Specials</h2>
          <button className="flex items-center text-airbnb-red hover:underline">
            <span className="mr-1">View menu</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {chefsSpecials.map((special) => (
              <CarouselItem key={special.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="airbnb-card border-none">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={special.imageUrl} 
                        alt={special.title} 
                        className="w-full h-[200px] object-cover rounded-t-xl"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                        <ChefHat className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">{special.chef}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-lg">{special.title}</h3>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-current text-airbnb-red" />
                          <span className="ml-1 text-sm">{special.rating}</span>
                        </div>
                      </div>
                      <p className="text-airbnb-light mt-1">{special.price}</p>
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
