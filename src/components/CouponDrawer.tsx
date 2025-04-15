
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
import { ClipboardCopy, Check, Calendar, Tag } from 'lucide-react';
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
      <DrawerContent className={`${isMobile ? 'max-h-[90dvh]' : 'max-h-[90vh]'} overflow-y-auto pb-safe`}>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle className="text-xl text-center">{offer.title}</DrawerTitle>
            <DrawerDescription className="text-center">
              Use this coupon during your reservation
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 space-y-6 pb-8">
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src={offer.imageUrl} 
                alt={offer.title} 
                className="w-full aspect-video object-cover" 
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Exclusive Offer</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                {offer.description}
              </p>
              
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Valid until: {offer.validUntil}</span>
              </div>
            </div>

            <div className="border rounded-md p-4 bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">Your Coupon Code:</p>
              <div className="flex items-center">
                <Input 
                  value={offer.couponCode} 
                  readOnly 
                  className="bg-white border-r-0 rounded-r-none" 
                />
                <Button 
                  onClick={handleCopyCode} 
                  variant="outline" 
                  className="rounded-l-none border-l-0 bg-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <ClipboardCopy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Button 
                className="w-full bg-airbnb-red hover:bg-airbnb-red/90 text-white"
                onClick={handleApplyCoupon}
              >
                Apply to Reservation
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CouponDrawer;
