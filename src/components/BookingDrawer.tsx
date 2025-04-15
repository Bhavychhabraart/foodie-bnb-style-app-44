
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
      <div className="grid grid-cols-1 gap-4 px-4 pb-6">
        <DrawerHeader>
          <DrawerTitle className="text-center text-xl">How would you like to book?</DrawerTitle>
          <DrawerDescription className="text-center">
            Choose an option below to get started
          </DrawerDescription>
        </DrawerHeader>

        <Button
          variant="outline"
          className="flex items-center justify-start border-2 h-24 relative p-4"
          onClick={() => handleBookingOptionSelect('standard')}
        >
          <Utensils className="h-6 w-6 text-airbnb-red mr-3" />
          <div className="text-left">
            <h3 className="font-medium">Standard Table</h3>
            <p className="text-xs text-gray-500">Reserve a table for your group</p>
          </div>
          <div className="absolute right-4">→</div>
        </Button>

        <Button
          variant="outline"
          className="flex items-center justify-start border-2 h-24 relative p-4"
          onClick={() => handleBookingOptionSelect('corporate')}
        >
          <Briefcase className="h-6 w-6 text-airbnb-red mr-3" />
          <div className="text-left">
            <h3 className="font-medium">Corporate Event</h3>
            <p className="text-xs text-gray-500">Organize a business lunch or meeting</p>
          </div>
          <div className="absolute right-4">→</div>
        </Button>

        <Button
          variant="outline"
          className="flex items-center justify-start border-2 h-24 relative p-4"
          onClick={() => handleBookingOptionSelect('party')}
        >
          <PartyPopper className="h-6 w-6 text-airbnb-red mr-3" />
          <div className="text-left">
            <h3 className="font-medium">Private Party</h3>
            <p className="text-xs text-gray-500">Host a celebration or kitty party</p>
          </div>
          <div className="absolute right-4">→</div>
        </Button>
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
      <DrawerContent className={`${isMobile ? 'max-h-[135dvh]' : 'max-h-[135vh]'} overflow-y-auto pb-safe`}>
        {renderSelectedForm()}
      </DrawerContent>
    </Drawer>
  );
};

export default BookingDrawer;
