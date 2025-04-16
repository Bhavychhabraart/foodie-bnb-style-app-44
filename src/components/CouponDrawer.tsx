
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
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface Offer {
  id: number;
  title: string;
  description: string;
  validUntil: string;
  imageUrl: string;
  couponCode: string;
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
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(offer.couponCode).then(() => {
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
    toast({
      title: "Coupon applied!",
      description: `${offer.title} discount has been applied to your reservation.`,
    });
    onOpenChange(false);
  };

  return (
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
              {/* Voucher Card */}
              <div className="rounded-xl overflow-hidden border border-airbnb-gold/30 shadow-lg">
                {/* Top Banner */}
                <div className="bg-airbnb-gold/90 text-black py-2 px-4 text-center font-semibold flex items-center justify-center">
                  <Sparkles className="h-4 w-4 mr-2" /> EXCLUSIVE OFFER
                </div>

                {/* Voucher Image */}
                <div className="relative">
                  <img 
                    src={offer.imageUrl} 
                    alt={offer.title} 
                    className="w-full aspect-video object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Perforated Line Effect */}
                  <div className="absolute -bottom-2 left-0 right-0 flex justify-between px-6">
                    <div className="h-4 w-4 bg-zinc-900 rounded-full"></div>
                    <div className="border-t-2 border-dashed border-zinc-900 flex-grow my-auto mx-1"></div>
                    <div className="h-4 w-4 bg-zinc-900 rounded-full"></div>
                  </div>
                </div>

                {/* Voucher Content */}
                <div className="p-6 bg-zinc-900 text-center">
                  <h2 className="text-2xl font-semibold text-airbnb-gold mb-2">{offer.title}</h2>
                  <p className="text-airbnb-light/80 mb-4">{offer.description}</p>
                  
                  <div className="flex items-center justify-center space-x-3 text-sm mb-4">
                    <div className="flex items-center text-airbnb-light/70">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Valid until: {offer.validUntil}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coupon Code Section */}
              <div className="rounded-xl p-5 bg-zinc-800/50 border border-airbnb-gold/20">
                <p className="text-sm text-airbnb-light/70 mb-2 text-center">Your Exclusive Coupon Code:</p>
                <div className="flex items-center">
                  <Input 
                    value={offer.couponCode} 
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

              {/* Terms & Conditions */}
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
                  Apply to Reservation
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
  );
};

export default CouponDrawer;
