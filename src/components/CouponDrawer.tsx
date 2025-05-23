import React, { useState } from 'react';
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerDescription 
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ClipboardCopy, Check, Calendar, Tag, Sparkles, Clock, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { BookingDrawer } from './BookingDrawer';

interface Offer {
  id: string;
  title: string;
  description: string;
  valid_until: string;
  image_url: string | null;
  coupon_code: string;
}

interface CouponDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  offer: Offer;
}

const CouponDrawer: React.FC<CouponDrawerProps> = ({ 
  open, 
  onOpenChange, 
  offer 
}) => {
  const [copied, setCopied] = useState(false);
  const [bookingDrawerOpen, setBookingDrawerOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(offer.coupon_code).then(() => {
      setCopied(true);
      toast({
        title: "Coupon copied!",
        description: "The coupon code has been copied to your clipboard.",
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    });
  };

  const handleApplyCoupon = () => {
    onOpenChange(false);
    setBookingDrawerOpen(true);
    
    window.document.dispatchEvent(
      new CustomEvent("apply-coupon", { 
        detail: { 
          code: offer.coupon_code,
          title: offer.title
        } 
      })
    );
  };

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh] bg-zinc-900 border-t-4 border-airbnb-gold">
          <div className="max-h-[90vh] overflow-y-auto scrollbar-hide pb-safe">
            <div className="mx-auto w-full max-w-md">
              <DrawerHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-airbnb-gold" />
                    <DrawerTitle className="text-xl">Exclusive Offer</DrawerTitle>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <DrawerDescription className="text-center text-airbnb-light/70">
                  Present this voucher during your visit
                </DrawerDescription>
              </DrawerHeader>

              <div className="px-4 space-y-6 pb-8">
                <div className="rounded-xl overflow-hidden border border-airbnb-gold/30 shadow-lg">
                  <div className="bg-airbnb-gold/90 text-black py-2 px-4 text-center font-semibold flex items-center justify-center">
                    <Sparkles className="h-4 w-4 mr-2" /> EXCLUSIVE OFFER
                  </div>

                  <div className="relative">
                    <img 
                      src={offer.image_url || '/placeholder.svg'} 
                      alt={offer.title} 
                      className="w-full aspect-video object-cover" 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    <div className="absolute -bottom-2 left-0 right-0 flex justify-between px-6">
                      <div className="h-4 w-4 bg-zinc-900 rounded-full"></div>
                      <div className="border-t-2 border-dashed border-zinc-900 flex-grow my-auto mx-1"></div>
                      <div className="h-4 w-4 bg-zinc-900 rounded-full"></div>
                    </div>
                  </div>

                  <div className="p-6 bg-zinc-900 text-center">
                    <h2 className="text-2xl font-semibold text-airbnb-gold mb-2">{offer.title}</h2>
                    <p className="text-airbnb-light/80 mb-4">{offer.description}</p>
                    
                    <div className="flex items-center justify-center space-x-3 text-sm mb-4">
                      <div className="flex items-center text-airbnb-light/70">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Valid until: {offer.valid_until}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl p-5 bg-zinc-800/50 border border-airbnb-gold/20">
                  <p className="text-sm text-airbnb-light/70 mb-2 text-center">Your Exclusive Coupon Code:</p>
                  <div className="flex items-center">
                    <Input 
                      value={offer.coupon_code} 
                      readOnly 
                      className="bg-zinc-900 border-r-0 rounded-r-none text-center text-lg font-mono font-bold text-airbnb-gold" 
                    />
                    <Button 
                      onClick={handleCopyCode} 
                      variant="outline" 
                      className="rounded-l-none border-l-0 bg-zinc-900 hover:bg-zinc-800"
                    >
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <ClipboardCopy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-center mt-2 text-airbnb-light/60">
                    Present this code when ordering or making a reservation
                  </p>
                </div>

                <div className="text-xs text-airbnb-light/60 p-4 bg-zinc-800/30 rounded-lg">
                  <h4 className="font-medium mb-2">Terms & Conditions:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Cannot be combined with other offers</li>
                    <li>Valid for dine-in only</li>
                    <li>Subject to availability</li>
                    <li>Management reserves the right to modify or withdraw the offer</li>
                  </ul>
                </div>

                <div className="pt-4 space-y-3">
                  <Button 
                    className="w-full bg-airbnb-gold hover:bg-airbnb-gold/90 text-black"
                    onClick={handleApplyCoupon}
                  >
                    Book with this Offer
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-airbnb-gold/30 text-airbnb-gold hover:bg-airbnb-gold/10"
                    onClick={() => onOpenChange(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <BookingDrawer 
        open={bookingDrawerOpen} 
        onOpenChange={setBookingDrawerOpen}
      />
    </>
  );
};

export default CouponDrawer;
