
import React, { useState } from 'react';
import { ChevronRight, Tag, Sparkles, Clock } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
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
  const [hoveredOffer, setHoveredOffer] = useState<number | null>(null);
  
  const handleAvailNow = (offer: (typeof offers)[0]) => {
    setSelectedOffer(offer);
    setDrawerOpen(true);
  };

  return (
    <div className="section-padding py-12 bg-gradient-to-b from-zinc-900 to-zinc-900/50">
      <div className="container-padding mx-auto">
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center">
            <Sparkles className="w-6 h-6 mr-3 text-amber-400 animate-pulse" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Exclusive Offers</h2>
          </div>
          <button className="flex items-center text-amber-400 hover:text-amber-300 transition-colors">
            <span className="mr-1">View all</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {offers.map((offer, index) => (
              <CarouselItem key={offer.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  onHoverStart={() => setHoveredOffer(offer.id)}
                  onHoverEnd={() => setHoveredOffer(null)}
                >
                  <Card className="border-none rounded-xl overflow-hidden transform transition-all duration-500 shadow-lg hover:shadow-2xl relative">
                    <CardContent className="p-0 relative">
                      {/* Voucher Top Part with Image */}
                      <div className="relative h-[200px] overflow-hidden">
                        <motion.img 
                          src={offer.imageUrl} 
                          alt={offer.title} 
                          className="w-full h-full object-cover"
                          animate={{ 
                            scale: hoveredOffer === offer.id ? 1.05 : 1
                          }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        
                        {/* Decorative Elements */}
                        <motion.div 
                          className="absolute top-3 left-3 bg-amber-500/90 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center"
                          animate={{ 
                            x: hoveredOffer === offer.id ? [0, -5, 0] : 0
                          }}
                          transition={{ 
                            duration: 0.5, 
                            repeat: hoveredOffer === offer.id ? 1 : 0 
                          }}
                        >
                          <Sparkles className="h-3 w-3 mr-1" />
                          EXCLUSIVE
                        </motion.div>
                        
                        {/* Shiny Effect on Hover */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0"
                          animate={{ 
                            opacity: hoveredOffer === offer.id ? [0, 0.2, 0] : 0,
                            left: hoveredOffer === offer.id ? ['-100%', '100%'] : '-100%' 
                          }}
                          transition={{ 
                            duration: 1, 
                            repeat: 0
                          }}
                        />
                        
                        {/* Perforated Line Effect */}
                        <div className="absolute -bottom-2 left-0 right-0 flex justify-between px-6">
                          <div className="h-4 w-4 bg-zinc-900 rounded-full"></div>
                          <div className="border-t-2 border-dashed border-zinc-900 flex-grow my-auto mx-1"></div>
                          <div className="h-4 w-4 bg-zinc-900 rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Voucher Content */}
                      <div className="p-6 bg-zinc-900 border border-amber-800/30 border-t-0 rounded-b-xl">
                        <div className="text-center mb-4">
                          <h3 className="font-semibold text-xl text-amber-400">{offer.title}</h3>
                          <p className="text-amber-100/70 mt-2 text-sm">{offer.description}</p>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-amber-100/50 mb-4">
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>Valid until: {offer.validUntil}</span>
                          </div>
                          <div className="flex items-center">
                            <Tag className="w-3 h-3 mr-1" />
                            <span>Code: {offer.couponCode}</span>
                          </div>
                        </div>
                        
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            onClick={() => handleAvailNow(offer)} 
                            className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-medium border border-amber-300/20 shadow-md"
                          >
                            Redeem Now
                          </Button>
                        </motion.div>

                        {/* Ornamental Corners */}
                        <div className="absolute top-[200px] left-0 w-4 h-4 border-l-2 border-t-2 border-amber-500/30"></div>
                        <div className="absolute top-[200px] right-0 w-4 h-4 border-r-2 border-t-2 border-amber-500/30"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-amber-500/30"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-amber-500/30"></div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="mt-6" />
        </Carousel>
      </div>

      {selectedOffer && <CouponDrawer open={drawerOpen} onOpenChange={setDrawerOpen} offer={selectedOffer} />}
    </div>
  );
};

export default OngoingOffers;
