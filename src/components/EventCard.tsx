
import React, { useState } from 'react';
import { Star, Share, Eye, CalendarCheck, MapPin, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="border-none rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      <CardContent className="p-0">
        <div className="relative">
          <div className="relative overflow-hidden aspect-[4/6]">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          </div>
          
          {isSoldOut && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full transform -rotate-2 shadow-md">
              Sold Out
            </div>
          )}
          
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-sm px-2 py-1 rounded-lg flex items-center">
            <Star className="h-3 w-3 fill-current text-airbnb-gold mr-1" />
            <span>{rating.toFixed(1)}</span>
            {reviews > 0 && (
              <span className="text-xs text-gray-300 ml-1">({reviews})</span>
            )}
          </div>
          
          <div className="absolute top-3 left-3 backdrop-blur-sm rounded-full px-3 py-1 bg-black/60">
            <span className="text-xs font-medium text-white">{host}</span>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-airbnb-gold transition-colors">{title}</h3>
          </div>
        </div>
        
        <div className="p-4 bg-zinc-900 border-t border-airbnb-gold/20">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {time && (
              <div className="flex items-center text-gray-300 text-sm">
                <Clock className="h-4 w-4 mr-2 text-airbnb-gold/80" />
                <span>{time}</span>
              </div>
            )}
            {venue && (
              <div className="flex items-center text-gray-300 text-sm">
                <MapPin className="h-4 w-4 mr-2 text-airbnb-gold/80" />
                <span>{venue}</span>
              </div>
            )}
          </div>
          
          <p className="font-medium mb-4 text-airbnb-gold">{price}</p>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsDrawerOpen(true)} 
              className="flex-1 border-airbnb-gold/30 transition-colors text-airbnb-gold hover:bg-airbnb-gold/10"
            >
              <Eye className="mr-1 h-4 w-4" />
              View Details
            </Button>
            
            <Button 
              onClick={handleBookNow} 
              disabled={isSoldOut} 
              className="flex-1 bg-airbnb-gold hover:bg-airbnb-gold/90 text-black font-medium"
            >
              <CalendarCheck className="mr-1 h-4 w-4" />
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>

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
    </Card>
  );
};

export default EventCard;
