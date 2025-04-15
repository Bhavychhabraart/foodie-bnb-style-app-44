import React, { useState } from 'react';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, Star, ArrowRight, Tag } from 'lucide-react';
import { BookingDrawer } from './BookingDrawer';
import FomoNotification from './FomoNotification';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface Experience {
  imageUrl: string;
  title: string;
  host: string;
  price: string;
  rating?: number;
  reviews?: number;
  isSoldOut?: boolean;
}

interface ExperienceDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  experience: Experience;
}

const ExperienceDetailsDrawer: React.FC<ExperienceDetailsDrawerProps> = ({
  isOpen,
  onClose,
  experience
}) => {
  const [bookingDrawerOpen, setBookingDrawerOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const { toast } = useToast();

  const handleBookNow = () => {
    setBookingDrawerOpen(true);
  };

  const handleApplyCoupon = () => {
    if (couponCode) {
      setDiscountApplied(true);
      toast({
        title: "Coupon applied!",
        description: "Your discount has been applied.",
      });
    } else {
      toast({
        title: "No coupon entered",
        description: "Please enter a valid coupon code.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="max-h-[90vh] overflow-y-auto pb-8">
          <div className="mx-auto w-full max-w-md">
            <DrawerHeader>
              <DrawerTitle className="text-xl">{experience.title}</DrawerTitle>
              <DrawerDescription>
                Hosted by {experience.host}
              </DrawerDescription>
            </DrawerHeader>

            <div className="px-4 space-y-6">
              <div className="relative rounded-xl overflow-hidden">
                <img 
                  src={experience.imageUrl} 
                  alt={experience.title} 
                  className="w-full aspect-video object-cover" 
                />
                {experience.rating && experience.reviews && (
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center">
                    <Star className="h-4 w-4 text-airbnb-red fill-current mr-1" />
                    <span className="font-medium">{experience.rating.toFixed(1)}</span>
                    <span className="text-gray-600 ml-1">({experience.reviews} reviews)</span>
                  </div>
                )}
              </div>

              <div className="border-t border-b py-4 space-y-3">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-airbnb-red mr-3" />
                  <div>
                    <p className="font-medium">Available on Multiple Dates</p>
                    <p className="text-sm text-gray-600">Book your preferred date</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-airbnb-red mr-3" />
                  <div>
                    <p className="font-medium">Duration: 2 hours</p>
                    <p className="text-sm text-gray-600">Evening slots available</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-airbnb-red mr-3" />
                  <div>
                    <p className="font-medium">Group Size: Up to 8 people</p>
                    <p className="text-sm text-gray-600">Private groups available</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2">About This Experience</h3>
                <p className="text-gray-700">
                  Join us for an unforgettable culinary journey where tradition meets innovation. 
                  This experience offers a unique opportunity to taste exquisite flavors while 
                  learning about local cuisine and culture. Perfect for food enthusiasts of all levels.
                </p>
              </div>

              <div className="border rounded-md p-4">
                <label className="block text-sm font-medium mb-2">Have a coupon code?</label>
                <div className="flex">
                  <div className="relative flex-grow">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input 
                      placeholder="Enter coupon code" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="pl-10" 
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleApplyCoupon}
                    className="ml-2"
                  >
                    Apply
                  </Button>
                </div>
                {discountApplied && (
                  <p className="text-green-600 text-sm mt-2">
                    Discount applied! You'll see it on checkout.
                  </p>
                )}
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xl font-semibold">{experience.price}</p>
                    <p className="text-sm text-gray-600">per person</p>
                  </div>
                  
                  <Button 
                    className="bg-airbnb-red hover:bg-airbnb-red/90 text-white"
                    onClick={handleBookNow}
                    disabled={experience.isSoldOut}
                  >
                    {experience.isSoldOut ? "Sold Out" : "Book Now"}
                    {!experience.isSoldOut && <ArrowRight className="ml-2 h-4 w-4" />}
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

      <FomoNotification isVisible={isOpen} />
    </>
  );
};

export default ExperienceDetailsDrawer;
