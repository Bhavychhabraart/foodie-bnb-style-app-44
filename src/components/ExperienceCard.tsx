
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
    <div className="mb-8 bg-airbnb-cream/20 dark:bg-airbnb-darkbrown">
      <div className="relative rounded-xl overflow-hidden mb-2">
        <img src={imageUrl} alt={title} className="w-full h-[300px] object-cover" />
        
        <button className="share-button bg-airbnb-cream dark:bg-airbnb-darkbrown/80">
          <Share className="h-5 w-5 text-airbnb-darkbrown dark:text-airbnb-beige" />
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
          <h3 className="text-lg font-medium text-airbnb-darkbrown dark:text-airbnb-cream">{title}</h3>
          {rating > 0 && (
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-current text-airbnb-gold" />
              <span className="ml-1 text-sm">{rating.toFixed(2)}</span>
            </div>
          )}
        </div>
        
        <p className="text-airbnb-darkbrown/80 dark:text-airbnb-beige text-sm">Hosted by {host}</p>
        
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
            className="flex-1 border-airbnb-gold/30 transition-colors text-airbnb-darkbrown dark:text-airbnb-cream bg-airbnb-beige/50 hover:bg-airbnb-beige dark:bg-airbnb-darkbrown dark:hover:bg-airbnb-darkbrown/80"
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
          
          <Button 
            onClick={handleBookNow} 
            disabled={isSoldOut} 
            className="flex-1 text-white bg-airbnb-gold hover:bg-airbnb-gold/90"
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

      <BookingDrawer open={isBookingDrawerOpen} onOpenChange={setIsBookingDrawerOpen} />
    </div>
  );
};

export default ExperienceCard;
