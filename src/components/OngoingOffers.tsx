
import React, { useState, useEffect } from 'react';
import { ChevronRight, Tag, Sparkles, Clock } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import CouponDrawer from './CouponDrawer';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Offer {
  id: string;
  title: string;
  description: string;
  valid_until: string;
  image_url: string | null;
  coupon_code: string;
}

const OngoingOffers: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const { data, error } = await supabase
          .from('offers')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching offers:', error);
          toast({
            title: "Error",
            description: "Failed to load offers. Please try again later.",
            variant: "destructive",
          });
          return;
        }
        
        setOffers(data || []);
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [toast]);
  
  const handleAvailNow = (offer: Offer) => {
    setSelectedOffer(offer);
    setDrawerOpen(true);
  };

  // If no offers are available yet and still loading, show placeholder
  if (loading) {
    return (
      <div className="section-padding">
        <div className="container-padding mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-airbnb-gold" />
              <h2 className="text-2xl font-semibold">Exclusive Offers</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-none rounded-xl overflow-hidden animate-pulse">
                <CardContent className="p-0">
                  <div className="h-[180px] bg-gray-700"></div>
                  <div className="p-5 bg-zinc-900">
                    <div className="h-6 bg-gray-700 rounded mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded mb-4"></div>
                    <div className="h-10 bg-gray-700 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // If there are no offers and we're not loading anymore, provide a way to add offers
  if (offers.length === 0 && !loading) {
    return (
      <div className="section-padding">
        <div className="container-padding mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-airbnb-gold" />
              <h2 className="text-2xl font-semibold">Exclusive Offers</h2>
            </div>
            <Button 
              onClick={() => {
                toast({
                  title: "Admin Access Required",
                  description: "Please visit the edit panel to add offers.",
                });
              }}
              className="text-airbnb-gold hover:underline flex items-center"
              variant="ghost"
            >
              <span className="mr-1">Manage Offers</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="text-center py-10 bg-zinc-900/50 rounded-xl border border-dashed border-gray-700">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-airbnb-gold/50" />
            <h3 className="text-xl font-medium mb-2">No Offers Available</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              There are no active offers at the moment. Check back later for exclusive deals and promotions.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-padding mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-airbnb-gold" />
            <h2 className="text-2xl font-semibold">Exclusive Offers</h2>
          </div>
          <Button 
            variant="ghost" 
            className="text-airbnb-gold hover:underline flex items-center group animate-none hover:animate-bounce active:scale-95 transform transition-transform duration-200"
            onClick={() => {
              // Navigate to the offers page when clicked
              window.document.dispatchEvent(
                new CustomEvent("category-change", { detail: "offers" })
              );
            }}
          >
            <span className="mr-1 group-hover:mr-2 transition-all">View all</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
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
                        src={offer.image_url || '/placeholder.svg'} 
                        alt={offer.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
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
                          <span>Valid until: {offer.valid_until}</span>
                        </div>
                        <div className="flex items-center">
                          <Tag className="w-3 h-3 mr-1" />
                          <span>Code: {offer.coupon_code}</span>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => handleAvailNow(offer)} 
                        className="w-full bg-airbnb-gold hover:bg-airbnb-gold/90 text-black animate-none hover:animate-bounce active:scale-95 transform transition-transform duration-200"
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
