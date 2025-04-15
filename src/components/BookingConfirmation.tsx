
import React, { useEffect } from 'react';
import { Check, PartyPopper } from 'lucide-react';
import { motion, useAnimation, Variants } from 'framer-motion';
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
  const controls = useAnimation();
  
  useEffect(() => {
    // Sequence the animations
    const animateSequence = async () => {
      await controls.start('checkmark');
      await controls.start('content');
      await controls.start('confetti');
    };
    
    animateSequence();
  }, [controls]);

  const checkmarkVariants: Variants = {
    hidden: { scale: 0 },
    checkmark: { 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 15,
        duration: 0.8 
      }
    }
  };
  
  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    content: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    content: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  const confettiVariants: Variants = {
    hidden: { opacity: 0 },
    confetti: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <motion.div
        variants={checkmarkVariants}
        initial="hidden"
        animate={controls}
        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6"
      >
        <motion.div
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Check className="w-10 h-10 text-white" />
        </motion.div>
      </motion.div>
      
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-2">Booking Confirmed!</motion.h2>
        
        <motion.div variants={itemVariants} className="mb-6">
          <p className="text-lg mb-1">Thank you for your reservation</p>
          <p className="text-sm text-gray-500">A confirmation has been sent to your email</p>
        </motion.div>
        
        <motion.div 
          variants={itemVariants} 
          className="bg-gray-50 rounded-lg p-4 mb-6"
          whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="font-medium mb-2">{experienceTitle}</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-500">Date:</div>
            <div>{date}</div>
            <div className="text-gray-500">Time:</div>
            <div>{time}</div>
            <div className="text-gray-500">Guests:</div>
            <div>{guests} {parseInt(guests) === 1 ? 'person' : 'people'}</div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Button 
            onClick={onClose} 
            className="mt-4 bg-airbnb-red hover:bg-airbnb-red/90 text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Done
          </Button>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        variants={confettiVariants}
        initial="hidden"
        animate={controls}
      >
        {Array.from({ length: 100 }).map((_, i) => (
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
              delay: Math.random() * 0.5 + 1, // Delay confetti until after checkmark
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default BookingConfirmation;
