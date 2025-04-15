
import React, { useState } from 'react';
import { Star, Share, Eye, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExperienceDetailsDrawer from './ExperienceDetailsDrawer';
import BookingDrawer from './BookingDrawer';

interface ExperienceCardProps {
  imageUrl: string;
  title: string;
  host: string;
  price: string;
  rating?: number;
  reviews?: number;
  isSoldOut?: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
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
    <div className="mb-8">
      <div className="relative rounded-xl overflow-hidden mb-2">
        <img src={imageUrl} alt={title} className="w-full h-[300px] object-cover" />
        
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
              <Star className="h-4 w-4 fill-current text-airbnb-dark" />
              <span className="ml-1 text-sm">{rating.toFixed(2)}</span>
            </div>
          )}
        </div>
        
        <p className="text-airbnb-light text-sm">Hosted by {host}</p>
        
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
            className="flex-1 border-airbnb-red text-airbnb-red hover:bg-airbnb-red hover:text-white transition-colors"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
          
          <Button 
            className="flex-1 bg-airbnb-red hover:bg-airbnb-red/90 text-white"
            onClick={handleBookNow}
            disabled={isSoldOut}
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

export default ExperienceCard;
