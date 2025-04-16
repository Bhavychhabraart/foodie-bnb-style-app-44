
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
import { motion } from 'framer-motion';

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
      <DrawerContent className="max-h-[90vh] bg-zinc-900 border-t-4 border-amber-500">
        <div className="max-h-[90vh] overflow-y-auto scrollbar-hide pb-safe">
          <div className="mx-auto w-full max-w-md">
            <DrawerHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-amber-400 animate-pulse" />
                  <DrawerTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                    Exclusive Offer
                  </DrawerTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <DrawerDescription className="text-center text-amber-100/60">
                Present this voucher during your visit
              </DrawerDescription>
            </DrawerHeader>

            <div className="px-4 space-y-6 pb-8">
              {/* Voucher Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="rounded-xl overflow-hidden border border-amber-800/30 shadow-xl"
              >
                {/* Top Banner */}
                <motion.div 
                  className="bg-gradient-to-r from-amber-600 to-amber-400 text-black py-2 px-4 text-center font-semibold flex items-center justify-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <Sparkles className="h-4 w-4 mr-2" /> EXCLUSIVE OFFER
                </motion.div>

                {/* Voucher Image */}
                <div className="relative">
                  <motion.div
                    className="w-full aspect-video overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <motion.img 
                      src={offer.imageUrl} 
                      alt={offer.title} 
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, duration: 1.2 }}
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  
                  {/* Gold ornament overlay */}
                  <div className="absolute top-4 left-0 right-0 flex justify-center">
                    <div className="h-px w-1/2 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <div className="h-px w-1/2 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
                  </div>
                  
                  {/* Perforated Line Effect */}
                  <div className="absolute -bottom-2 left-0 right-0 flex justify-between px-6">
                    <div className="h-4 w-4 bg-zinc-900 rounded-full"></div>
                    <div className="border-t-2 border-dashed border-zinc-900 flex-grow my-auto mx-1"></div>
                    <div className="h-4 w-4 bg-zinc-900 rounded-full"></div>
                  </div>
                </div>

                {/* Voucher Content */}
                <motion.div 
                  className="p-6 bg-zinc-900 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-amber-400 mb-2">{offer.title}</h2>
                  <p className="text-amber-100/70 mb-4">{offer.description}</p>
                  
                  <div className="flex items-center justify-center space-x-3 text-sm mb-4">
                    <div className="flex items-center text-amber-100/60">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Valid until: {offer.validUntil}</span>
                    </div>
                  </div>

                  {/* Ornamental divider */}
                  <div className="flex items-center justify-center my-4">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
                    <Sparkles className="h-3 w-3 mx-2 text-amber-500/70" />
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Coupon Code Section */}
              <motion.div 
                className="rounded-xl p-5 bg-zinc-800/50 border border-amber-500/20 shadow-inner"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <p className="text-sm text-amber-100/70 mb-2 text-center font-medium">Your Exclusive Coupon Code:</p>
                <div className="flex items-center">
                  <Input 
                    value={offer.couponCode} 
                    readOnly 
                    className="bg-zinc-900 border-r-0 rounded-r-none text-center text-lg font-mono font-bold text-amber-400 border-amber-500/30" 
                  />
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      onClick={handleCopyCode} 
                      variant="outline" 
                      className="rounded-l-none border-l-0 bg-zinc-900 hover:bg-zinc-800 border-amber-500/30"
                    >
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <ClipboardCopy className="h-4 w-4" />}
                    </Button>
                  </motion.div>
                </div>
                <p className="text-xs text-center mt-2 text-amber-100/60">
                  Present this code when ordering or making a reservation
                </p>
              </motion.div>

              {/* Terms & Conditions */}
              <motion.div 
                className="text-xs text-amber-100/60 p-4 bg-zinc-800/30 rounded-lg border border-amber-500/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h4 className="font-medium mb-2">Terms & Conditions:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Cannot be combined with other offers</li>
                  <li>Valid for dine-in only</li>
                  <li>Subject to availability</li>
                  <li>Management reserves the right to modify or withdraw the offer</li>
                </ul>
              </motion.div>

              <div className="pt-4 space-y-3">
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <Button 
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-medium border border-amber-300/20 shadow-md"
                    onClick={handleApplyCoupon}
                  >
                    Apply to Reservation
                  </Button>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <Button 
                    variant="outline" 
                    className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-500/10 shadow-sm"
                    onClick={() => onOpenChange(false)}
                  >
                    Close
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CouponDrawer;
