
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000); // Show splash screen for 2 seconds
    
    // Play the video once it's loaded
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video playback failed:", error);
      });
    }
    
    return () => clearTimeout(timer);
  }, [onFinish]);
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background effect */}
      <div className="absolute inset-0 bg-airbnb-gold dark:bg-airbnb-darkbrown opacity-90"></div>
      
      {/* Content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col items-center relative z-10"
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
      
      {/* Instagram embed as iframe */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <iframe
          src="https://www.instagram.com/reel/C0332sbSlPv/embed"
          className="w-full h-full opacity-40"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          title="Ha Cha Instagram Reel"
        ></iframe>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
