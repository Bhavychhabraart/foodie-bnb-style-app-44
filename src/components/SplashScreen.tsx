
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000); // Show splash screen for 2 seconds
    
    return () => clearTimeout(timer);
  }, [onFinish]);
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-airbnb-gold dark:bg-airbnb-darkbrown flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 rounded-full bg-white dark:bg-airbnb-darkbrown flex items-center justify-center mb-4 shadow-lg border-2 border-airbnb-beige dark:border-airbnb-gold">
          <Utensils className="w-12 h-12 text-airbnb-gold dark:text-airbnb-gold" />
        </div>
        <img 
          src="/lovable-uploads/6a7081ed-4360-446d-88ca-eed6d851e169.png" 
          alt="Ha Cha Logo" 
          className="max-w-[250px] mb-4"
        />
        <motion.p 
          className="text-white text-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Exquisite Restaurant Experience
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
