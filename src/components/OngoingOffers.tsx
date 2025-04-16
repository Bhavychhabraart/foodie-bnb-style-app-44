
import React, { useState } from 'react';
import { ChevronRight, Tag, Sparkles, Clock } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import CouponDrawer from './CouponDrawer';

const offers = [{
  id: 1,
  title: "Weekend Special",
  description: "25% off on all desserts every weekend",
  validUntil: "May 31, 2025",
  imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80",
  couponCode: "WEEKEND25"
}, {
  id: 2,
  title: "Seasonal Menu",
  description: "Try our limited spring specialties",
  validUntil: "June 15, 2025",
  imageUrl: "https://images.unsplash.com/photo-1559046375-d0593977ebed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80",
  couponCode: "SPRING2025"
}, {
  id: 3,
  title: "Family Package",
  description: "Special menu for 4 with complimentary dessert",
  validUntil: "Ongoing",
  imageUrl: "https://images.unsplash.com/photo-1611599538835-b52a8c2f9da1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80",
  couponCode: "FAMILY4"
}, {
  id: 4,
  title: "Chef's Recommendation",
  description: "10% off on chef's special dishes",
  validUntil: "April 30, 2025",
  imageUrl: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  couponCode: "CHEF10"
}];

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
          <div className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-airbnb-gold" />
            <h2 className="text-2xl font-semibold">Exclusive Offers</h2>
          </div>
          <button className="flex items-center text-airbnb-gold hover:underline">
            <span className="mr-1">View all</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {offers.map(offer => (
              <CarouselItem key={offer.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="border-none rounded-xl overflow-hidden transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="p-0 relative">
                    {/* Voucher Top Part with Image */}
                    <div className="relative h-[180px] overflow-hidden">
                      <img 
                        src={offer.imageUrl} 
                        alt={offer.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      
                      {/* Decorative Elements */}
                      <div className="absolute top-3 left-3 bg-airbnb-gold/90 text-black text-xs font-bold px-3 py-1 rounded-full">
                        EXCLUSIVE
                      </div>
                      
                      {/* Perforated Line Effect */}
                      <div className="absolute -bottom-2 left-0 right-0 flex justify-between px-6">
                        <div className="h-4 w-4 bg-zinc-900 rounded-full"></div>
                        <div className="border-t-2 border-dashed border-zinc-900 flex-grow my-auto mx-1"></div>
                        <div className="h-4 w-4 bg-zinc-900 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Voucher Content */}
                    <div className="p-5 bg-zinc-900 border border-airbnb-gold/20 border-t-0 rounded-b-xl">
                      <div className="text-center mb-4">
                        <h3 className="font-semibold text-xl text-airbnb-gold">{offer.title}</h3>
                        <p className="text-airbnb-light/80 mt-1 text-sm">{offer.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-airbnb-light/70 mb-4">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>Valid until: {offer.validUntil}</span>
                        </div>
                        <div className="flex items-center">
                          <Tag className="w-3 h-3 mr-1" />
                          <span>Code: {offer.couponCode}</span>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => handleAvailNow(offer)} 
                        className="w-full bg-airbnb-gold hover:bg-airbnb-gold/90 text-black"
                      >
                        Redeem Offer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="mt-4" />
        </Carousel>
      </div>

      {selectedOffer && <CouponDrawer open={drawerOpen} onOpenChange={setDrawerOpen} offer={selectedOffer} />}
    </div>
  );
};

export default OngoingOffers;
