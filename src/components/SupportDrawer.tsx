import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Phone, Clock, MapPin, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SupportDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SupportDrawer: React.FC<SupportDrawerProps> = ({
  open,
  onOpenChange
}) => {
  const { toast } = useToast();

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919876543210', '_blank');
    toast({
      description: "Opening WhatsApp..."
    });
  };

  const handleDirectionsClick = () => {
    window.open('https://www.google.com/maps/dir//C333%2BV8,+Rosewood+City,+Ghasola,+Sector+49,+Gurugram,+Haryana+122018/@28.4046422,76.9708976,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x390d232687d23291:0x110d21a41028c2dd!2m2!1d77.053299!2d28.404667?entry=ttu&g_ep=EgoyMDI1MDQxNC4xIKXMDSoASAFQAw%3D%3D', '_blank');
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh] rounded-t-xl bg-[#121212] border-airbnb-gold/20">
        <div className="max-h-[85vh] overflow-y-auto">
          <div className="px-6 py-8 space-y-6">
            <DrawerHeader className="text-center mb-6">
              <DrawerTitle className="text-2xl font-bold text-white">Ha Cha</DrawerTitle>
              <DrawerDescription className="text-white/70">Support & Contact Information</DrawerDescription>
            </DrawerHeader>

            <div className="space-y-6">
              <div className="bg-[#1E1E1E] p-4 rounded-lg flex items-start border border-airbnb-gold/20">
                <Phone className="h-5 w-5 text-airbnb-gold mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-lg text-white">Contact Us</h3>
                  <p className="text-white/70 mb-2">For reservations and inquiries:</p>
                  <p className="font-medium text-white">+91 9876 543 210</p>
                  <p className="text-white/70">contact@finedine.com</p>
                </div>
              </div>

              <div className="bg-[#1E1E1E] p-4 rounded-lg flex items-start border border-airbnb-gold/20">
                <Clock className="h-5 w-5 text-airbnb-gold mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-lg text-white">Opening Hours</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <p className="text-white/70">Monday:</p>
                    <p className="text-white">6 PM - 4 AM</p>
                    <p className="text-white/70">Tuesday:</p>
                    <p className="text-white">6 PM - 4 AM</p>
                    <p className="text-white/70">Wednesday:</p>
                    <p className="text-white">6 PM - 4 AM</p>
                    <p className="text-white/70">Thursday:</p>
                    <p className="text-white">6 PM - 4 AM</p>
                    <p className="text-white/70">Friday:</p>
                    <p className="text-white">6 PM - 4 AM</p>
                    <p className="text-white/70">Saturday:</p>
                    <p className="text-white">6 PM - 4 AM</p>
                    <p className="text-white/70">Sunday:</p>
                    <p className="text-white">6 PM - 4 AM</p>
                    <p className="text-white/70">Last Order:</p>
                    <p className="text-white">3:30 AM</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1E1E1E] p-4 rounded-lg flex items-start border border-airbnb-gold/20">
                <MapPin className="h-5 w-5 text-airbnb-gold mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-lg text-white">Location</h3>
                  <p className="text-white/70 mb-2">Find us at:</p>
                  <p className="text-white">C333+V8, Rosewood City, Ghasola, Sector 49, Gurugram, Haryana 122018</p>
                  <Button 
                    variant="outline" 
                    className="mt-3 text-airbnb-gold border-airbnb-gold/20 hover:bg-airbnb-gold/5" 
                    onClick={handleDirectionsClick}
                  >
                    Get Directions
                  </Button>
                </div>
              </div>

              <div className="mt-6 pb-6">
                <Button className="w-full bg-airbnb-gold hover:bg-airbnb-gold/90 text-white py-6 flex items-center justify-center gap-2" onClick={handleWhatsAppClick}>
                  <MessageSquare className="h-5 w-5" />
                  Chat with us on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SupportDrawer;
