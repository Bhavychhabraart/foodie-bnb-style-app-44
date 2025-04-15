
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  
  useEffect(() => {
    // Staggered animation sequence
    const logoTimer = setTimeout(() => setShowLogo(true), 300);
    const textTimer = setTimeout(() => setShowText(true), 800);
    
    // Complete animation after 2.5 seconds
    const finishTimer = setTimeout(() => {
      onFinish();
    }, 2500);
    
    return () => {
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-airbnb-red flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: showLogo ? 1 : 0.8, 
          opacity: showLogo ? 1 : 0,
          y: showLogo ? [20, 0] : 20
        }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          duration: 0.8 
        }}
        className="flex flex-col items-center"
      >
        <motion.div 
          className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-4 shadow-lg"
          animate={{ rotate: showLogo ? 360 : 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Utensils className="w-12 h-12 text-airbnb-red" />
        </motion.div>
        
        <motion.h1 
          className="text-white text-4xl font-bold mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ 
            y: showText ? 0 : 20, 
            opacity: showText ? 1 : 0 
          }}
          transition={{ duration: 0.5 }}
        >
          Fine Dine
        </motion.h1>
        
        <motion.p 
          className="text-white text-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ 
            y: showText ? 0 : 20, 
            opacity: showText ? 1 : 0 
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Exquisite Restaurant Experience
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
