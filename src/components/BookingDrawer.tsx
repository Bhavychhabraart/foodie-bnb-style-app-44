
import React, { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Calendar, User, Users, Briefcase, PartyPopper, Utensils } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import StandardBookingForm from './booking-forms/StandardBookingForm';
import CorporateEventForm from './booking-forms/CorporateEventForm';
import PrivatePartyForm from './booking-forms/PrivatePartyForm';
import { useIsMobile } from '@/hooks/use-mobile';

type BookingOption = 'standard' | 'corporate' | 'party' | null;

interface BookingDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BookingDrawer: React.FC<BookingDrawerProps> = ({ open, onOpenChange }) => {
  const [selectedOption, setSelectedOption] = useState<BookingOption>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleBookingOptionSelect = (option: BookingOption) => {
    setSelectedOption(option);
  };

  const handleBack = () => {
    setSelectedOption(null);
  };

  const renderBookingOptions = () => {
    return (
      <div className="flex flex-col h-full bg-[#121212] text-white">
        <DrawerHeader className="pb-6 pt-6">
          <DrawerTitle className="text-center text-2xl font-bold text-white">How would you like to book?</DrawerTitle>
          <DrawerDescription className="text-center text-base mt-2 text-white/70">
            Choose an option below to get started
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 px-6 pb-8 space-y-6">
          <Button
            variant="outline"
            className="flex items-center justify-start border-2 border-airbnb-gold/20 h-28 w-full relative p-4 rounded-xl hover:border-airbnb-gold/50 hover:bg-airbnb-gold/5 transition-all bg-[#1E1E1E]"
            onClick={() => handleBookingOptionSelect('standard')}
          >
            <Utensils className="h-8 w-8 text-airbnb-gold mr-4" />
            <div className="text-left flex-1">
              <h3 className="font-medium text-lg text-white">Standard Table</h3>
              <p className="text-sm text-white/70 mt-1">Reserve a table for your group</p>
            </div>
            <div className="text-airbnb-gold text-xl">→</div>
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-start border-2 border-airbnb-gold/20 h-28 w-full relative p-4 rounded-xl hover:border-airbnb-gold/50 hover:bg-airbnb-gold/5 transition-all bg-[#1E1E1E]"
            onClick={() => handleBookingOptionSelect('corporate')}
          >
            <Briefcase className="h-8 w-8 text-airbnb-gold mr-4" />
            <div className="text-left flex-1">
              <h3 className="font-medium text-lg text-white">Corporate Event</h3>
              <p className="text-sm text-white/70 mt-1">Organize a business lunch or meeting</p>
            </div>
            <div className="text-airbnb-gold text-xl">→</div>
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-start border-2 border-airbnb-gold/20 h-28 w-full relative p-4 rounded-xl hover:border-airbnb-gold/50 hover:bg-airbnb-gold/5 transition-all bg-[#1E1E1E]"
            onClick={() => handleBookingOptionSelect('party')}
          >
            <PartyPopper className="h-8 w-8 text-airbnb-gold mr-4" />
            <div className="text-left flex-1">
              <h3 className="font-medium text-lg text-white">Private Party</h3>
              <p className="text-sm text-white/70 mt-1">Host a celebration or kitty party</p>
            </div>
            <div className="text-airbnb-gold text-xl">→</div>
          </Button>
        </div>
      </div>
    );
  };

  const renderSelectedForm = () => {
    switch (selectedOption) {
      case 'standard':
        return <StandardBookingForm onBack={handleBack} onClose={() => onOpenChange(false)} />;
      case 'corporate':
        return <CorporateEventForm onBack={handleBack} onClose={() => onOpenChange(false)} />;
      case 'party':
        return <PrivatePartyForm onBack={handleBack} onClose={() => onOpenChange(false)} />;
      default:
        return renderBookingOptions();
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] bg-[#121212] border-airbnb-gold/20">
        <div className="max-h-[90vh] overflow-y-auto pb-safe scrollbar-hide">
          {renderSelectedForm()}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default BookingDrawer;
