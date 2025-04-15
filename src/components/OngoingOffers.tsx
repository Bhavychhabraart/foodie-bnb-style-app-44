
import React, { useState } from 'react';
import { ChevronRight, Tag } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import CouponDrawer from './CouponDrawer';

const offers = [
  {
    id: 1,
    title: "Weekend Special",
    description: "25% off on all desserts every weekend",
    validUntil: "May 31, 2025",
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80",
    couponCode: "WEEKEND25"
  },
  {
    id: 2,
    title: "Seasonal Menu",
    description: "Try our limited spring specialties",
    validUntil: "June 15, 2025",
    imageUrl: "https://images.unsplash.com/photo-1559046375-d0593977ebed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80",
    couponCode: "SPRING2025"
  },
  {
    id: 3,
    title: "Family Package",
    description: "Special menu for 4 with complimentary dessert",
    validUntil: "Ongoing",
    imageUrl: "https://images.unsplash.com/photo-1611599538835-b52a8c2f9da1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80",
    couponCode: "FAMILY4"
  },
  {
    id: 4,
    title: "Chef's Recommendation",
    description: "10% off on chef's special dishes",
    validUntil: "April 30, 2025",
    imageUrl: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    couponCode: "CHEF10"
  }
];

const OngoingOffers: React.FC = () => {
  const [selectedOffer, setSelectedOffer] = useState<(typeof offers)[0] | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleAvailNow = (offer: (typeof offers)[0]) => {
    setSelectedOffer(offer);
    setDrawerOpen(true);
  };

  return (
    <div className="section-padding">
      <div className="container-padding mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Ongoing Offers</h2>
          <button className="flex items-center text-airbnb-red hover:underline">
            <span className="mr-1">View all</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {offers.map((offer) => (
              <CarouselItem key={offer.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="airbnb-card border-none">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={offer.imageUrl} 
                        alt={offer.title} 
                        className="w-full h-[200px] object-cover rounded-t-xl"
                      />
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center">
                        <Tag className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">Valid until: {offer.validUntil}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg">{offer.title}</h3>
                      <p className="text-airbnb-light mt-1 mb-3">{offer.description}</p>
                      <Button 
                        onClick={() => handleAvailNow(offer)}
                        className="w-full bg-airbnb-red hover:bg-airbnb-red/90 text-white"
                      >
                        Avail Now
                      </Button>
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

      {selectedOffer && (
        <CouponDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          offer={selectedOffer}
        />
      )}
    </div>
  );
};

export default OngoingOffers;
