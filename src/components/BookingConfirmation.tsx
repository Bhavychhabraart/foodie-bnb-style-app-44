
import React from 'react';
import { Check, PartyPopper, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface BookingConfirmationProps {
  experienceTitle: string;
  date: string;
  time: string;
  guests: string;
  onClose: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  experienceTitle,
  date,
  time,
  guests,
  onClose
}) => {
  const handleWhatsAppShare = () => {
    // Format the message for WhatsApp
    const message = `Booking Confirmed!\n\n${experienceTitle}\nDate: ${date}\nTime: ${time}\nGuests: ${guests} ${parseInt(guests) === 1 ? 'person' : 'people'}`;
    
    // Phone number with the country code
    const phoneNumber = "919220829369"; // 91 is India's country code followed by the number
    
    // Create the WhatsApp URL 
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6"
      >
        <Check className="w-10 h-10 text-white" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
        
        <div className="mb-6">
          <p className="text-lg mb-1">Thank you for your reservation</p>
          <p className="text-sm text-gray-500">A confirmation has been sent to your email</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-medium mb-2">{experienceTitle}</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-500">Date:</div>
            <div>{date}</div>
            <div className="text-gray-500">Time:</div>
            <div>{time}</div>
            <div className="text-gray-500">Guests:</div>
            <div>{guests} {parseInt(guests) === 1 ? 'person' : 'people'}</div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              position: "absolute",
              top: "40%",
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              backgroundColor: ['#FFD700', '#FF6347', '#00CED1', '#9370DB', '#3CB371'][
                Math.floor(Math.random() * 5)
              ],
              transform: 'rotate(0deg)',
              opacity: 1,
            }}
            animate={{
              top: `${Math.random() * 50 + 100}%`,
              rotate: `${Math.random() * 360}deg`,
              opacity: 0,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              ease: "easeOut",
              delay: Math.random() * 0.5,
            }}
          />
        ))}
      </motion.div>
      
      <div className="flex flex-col gap-3 mt-4 w-full sm:flex-row sm:justify-center">
        <Button 
          onClick={handleWhatsAppShare} 
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Send className="mr-2 h-4 w-4" />
          Send on WhatsApp
        </Button>
        
        <Button 
          onClick={onClose} 
          className="bg-airbnb-red hover:bg-airbnb-red/90 text-white"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
