
import React, { useState } from 'react';
import { Star, Share, Eye, CalendarCheck } from 'lucide-react';
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
}

const EventCard: React.FC<EventCardProps> = ({
  imageUrl,
  title,
  host,
  price,
  rating = 0,
  reviews = 0,
  isSoldOut = false
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBookingDrawerOpen, setIsBookingDrawerOpen] = useState(false);
  
  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookingDrawerOpen(true);
  };
  
  return (
    <div className="mb-8 bg-zinc-900">
      <div className="relative rounded-xl overflow-hidden mb-2">
        <AspectRatio ratio={9/16} className="bg-zinc-800">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </AspectRatio>
        
        <button className="share-button">
          <Share className="h-5 w-5 text-gray-700" />
        </button>
        
        <div className="image-dots">
          <div className="image-dot active"></div>
          <div className="image-dot"></div>
          <div className="image-dot"></div>
          <div className="image-dot"></div>
          <div className="image-dot"></div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium">{title}</h3>
          {rating > 0 && (
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-current text-amber-500" />
              <span className="ml-1 text-sm">{rating.toFixed(2)}</span>
            </div>
          )}
        </div>
        
        <p className="text-airbnb-light text-sm">Date: {host}</p>
        
        {isSoldOut ? (
          <p className="font-medium mt-1">Sold out</p>
        ) : (
          <p className="mt-1">
            <span className="font-medium">{price}</span>
          </p>
        )}

        <div className="flex gap-2 mt-3">
          <Button 
            variant="outline" 
            onClick={() => setIsDrawerOpen(true)} 
            className="flex-1 border-airbnb-red transition-colors text-orange-50 bg-orange-700 hover:bg-orange-600"
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
          
          <Button 
            onClick={handleBookNow} 
            disabled={isSoldOut} 
            className="flex-1 text-white bg-amber-500 hover:bg-amber-400"
          >
            <CalendarCheck className="mr-2 h-4 w-4" />
            Book Now
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

      <BookingDrawer 
        open={isBookingDrawerOpen} 
        onOpenChange={setIsBookingDrawerOpen} 
      />
    </div>
  );
};

export default EventCard;
