
import React, { useState } from 'react';
import { Star, Share, Eye, CalendarCheck, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ExperienceDetailsDrawer from './ExperienceDetailsDrawer';
import BookingDrawer from './BookingDrawer';

interface EventCardProps {
  imageUrl: string;
  title: string;
  host: string;
  price: string;
  rating?: number;
  reviews?: number;
  isSoldOut?: boolean;
  venue?: string;
  time?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  imageUrl,
  title,
  host,
  price,
  rating = 0,
  reviews = 0,
  isSoldOut = false,
  venue,
  time
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBookingDrawerOpen, setIsBookingDrawerOpen] = useState(false);
  
  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookingDrawerOpen(true);
  };
  
  return (
    <div className="mb-8 rounded-xl overflow-hidden bg-airbnb-cream/10 dark:bg-airbnb-darkbrown/50 shadow-md">
      <div className="relative rounded-xl overflow-hidden mb-2">
        <AspectRatio ratio={4 / 5} className="bg-airbnb-beige/20">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </AspectRatio>
        
        <button className="absolute top-2 right-2 bg-black/30 p-2 rounded-full backdrop-blur-sm">
          <Share className="h-5 w-5 text-white" />
        </button>
        
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
          <div className="w-2 h-2 rounded-full bg-airbnb-gold"></div>
          <div className="w-2 h-2 rounded-full bg-white/50"></div>
          <div className="w-2 h-2 rounded-full bg-white/50"></div>
          <div className="w-2 h-2 rounded-full bg-white/50"></div>
          <div className="w-2 h-2 rounded-full bg-white/50"></div>
        </div>
      </div>
      
      <div className="px-3 py-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-airbnb-darkbrown dark:text-airbnb-cream">{title}</h3>
          {rating > 0 && (
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-current text-airbnb-gold" />
              <span className="ml-1 text-sm text-airbnb-darkbrown dark:text-airbnb-cream">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        <p className="text-airbnb-darkbrown/80 dark:text-airbnb-beige text-sm">{host}</p>
        
        {venue && (
          <div className="flex items-center gap-1 mt-1 text-airbnb-darkbrown/70 dark:text-airbnb-beige/70 text-xs">
            <MapPin className="h-3 w-3" />
            <span>{venue}</span>
          </div>
        )}
        
        {time && (
          <div className="flex items-center gap-1 mt-1 text-airbnb-darkbrown/70 dark:text-airbnb-beige/70 text-xs">
            <Clock className="h-3 w-3" />
            <span>{time}</span>
          </div>
        )}
        
        {isSoldOut ? (
          <p className="font-medium mt-1 text-red-400">Sold out</p>
        ) : (
          <p className="mt-1 text-airbnb-darkbrown dark:text-white/80 text-sm">
            <span className="font-medium">{price}</span>
          </p>
        )}

        <div className="flex gap-2 mt-3">
          <Button 
            variant="outline" 
            onClick={() => setIsDrawerOpen(true)} 
            className="flex-1 border-airbnb-gold/30 transition-colors text-airbnb-darkbrown dark:text-airbnb-cream bg-airbnb-beige/50 hover:bg-airbnb-beige dark:bg-airbnb-darkbrown dark:hover:bg-airbnb-darkbrown/80 text-xs sm:text-sm"
          >
            <Eye className="mr-1 h-4 w-4" />
            View
          </Button>
          
          <Button 
            onClick={handleBookNow} 
            disabled={isSoldOut} 
            className="flex-1 text-white bg-airbnb-gold hover:bg-airbnb-gold/90 text-xs sm:text-sm"
          >
            <CalendarCheck className="mr-1 h-4 w-4" />
            Book
          </Button>
        </div>
      </div>

      <ExperienceDetailsDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        experience={{
          imageUrl,
          title,
          host,
          price,
          rating,
          reviews,
          isSoldOut
        }} 
      />

      <BookingDrawer open={isBookingDrawerOpen} onOpenChange={setIsBookingDrawerOpen} />
    </div>
  );
};

export default EventCard;
