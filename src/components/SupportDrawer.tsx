
import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Phone, Clock, MapPin, MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface SupportDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SupportDrawer: React.FC<SupportDrawerProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();

  const handleWhatsAppClick = () => {
    // Open WhatsApp with the restaurant's number
    window.open('https://wa.me/919876543210', '_blank');
    toast({
      description: "Opening WhatsApp...",
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-xl overflow-auto">
        <SheetHeader className="text-center mb-6">
          <SheetTitle className="text-2xl font-bold text-airbnb-red">Fine Dine</SheetTitle>
          <SheetDescription>Support & Contact Information</SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg flex items-start">
            <Phone className="h-5 w-5 text-airbnb-red mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-lg">Contact Us</h3>
              <p className="text-gray-600 mb-2">For reservations and inquiries:</p>
              <p className="font-medium">+91 9876 543 210</p>
              <p className="text-gray-600">contact@finedine.com</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg flex items-start">
            <Clock className="h-5 w-5 text-airbnb-red mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-lg">Opening Hours</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <p className="text-gray-600">Monday - Friday:</p>
                <p>12:00 PM - 11:00 PM</p>
                <p className="text-gray-600">Saturday - Sunday:</p>
                <p>11:00 AM - 11:30 PM</p>
                <p className="text-gray-600">Last Order:</p>
                <p>10:30 PM</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg flex items-start">
            <MapPin className="h-5 w-5 text-airbnb-red mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-lg">Location</h3>
              <p className="text-gray-600 mb-2">Find us at:</p>
              <p>42 Gourmet Avenue, Culinary District</p>
              <p>Mumbai, Maharashtra 400001</p>
              <Button 
                variant="outline" 
                className="mt-3 text-airbnb-red"
                onClick={() => window.open('https://maps.google.com', '_blank')}
              >
                Get Directions
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <Button 
              className="w-full bg-green-500 hover:bg-green-600 text-white py-6 flex items-center justify-center gap-2"
              onClick={handleWhatsAppClick}
            >
              <MessageSquare className="h-5 w-5" />
              Chat with us on WhatsApp
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SupportDrawer;
