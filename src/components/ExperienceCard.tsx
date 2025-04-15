
import React, { useState } from 'react';
import { Star, Share, Eye, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExperienceDetailsDrawer from './ExperienceDetailsDrawer';
import BookingDrawer from './BookingDrawer';
import { motion } from 'framer-motion';

interface ExperienceCardProps {
  imageUrl: string;
  title: string;
  host: string;
  price: string;
  rating?: number;
  reviews?: number;
  isSoldOut?: boolean;
  delay?: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  imageUrl,
  title,
  host,
  price,
  rating = 0,
  reviews = 0,
  isSoldOut = false,
  delay = 0
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBookingDrawerOpen, setIsBookingDrawerOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookingDrawerOpen(true);
  };

  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div 
        className="relative rounded-xl overflow-hidden mb-2"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <motion.img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-[300px] object-cover" 
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5 }}
        />
        
        <motion.button 
          className="share-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share className="h-5 w-5 text-gray-700" />
        </motion.button>
        
        <div className="image-dots">
          <div className="image-dot active"></div>
          <div className="image-dot"></div>
          <div className="image-dot"></div>
          <div className="image-dot"></div>
          <div className="image-dot"></div>
        </div>
      </motion.div>
      
      <div>
        <div className="flex justify-between items-start">
          <motion.h3 
            className="text-lg font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 + delay * 0.1 }}
          >
            {title}
          </motion.h3>
          {rating > 0 && (
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + delay * 0.1 }}
            >
              <Star className="h-4 w-4 fill-current text-airbnb-dark" />
              <span className="ml-1 text-sm">{rating.toFixed(2)}</span>
            </motion.div>
          )}
        </div>
        
        <motion.p 
          className="text-airbnb-light text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 + delay * 0.1 }}
        >
          Hosted by {host}
        </motion.p>
        
        {isSoldOut ? (
          <motion.p 
            className="font-medium mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 + delay * 0.1 }}
          >
            Sold out
          </motion.p>
        ) : (
          <motion.p 
            className="mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 + delay * 0.1 }}
          >
            <span className="font-medium">{price}</span>
          </motion.p>
        )}

        <motion.div 
          className="flex gap-2 mt-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 + delay * 0.1 }}
        >
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
        </motion.div>
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
    </motion.div>
  );
};

export default ExperienceCard;
