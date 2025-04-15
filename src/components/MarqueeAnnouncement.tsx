
import React from 'react';
import { LollipopIcon, IceCreamCone, Cherry, Candy } from 'lucide-react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  title: string;
  items: string[];
}

const MarqueeAnnouncement: React.FC<MarqueeProps> = ({ title, items }) => {
  return (
    <motion.div 
      className="bg-soft-yellow py-2.5 overflow-hidden border-y border-amber-200"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center marquee">
        <motion.div 
          className="flex shrink-0 items-center space-x-6 py-1 whitespace-nowrap"
          animate={{ 
            x: [0, -50, -100, -150, -200, -250, -300, -350, -400, -450, -500],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {[...Array(3)].map((_, dupeIndex) => (
            <React.Fragment key={dupeIndex}>
              <motion.span 
                className="flex items-center font-medium text-amber-900"
                whileHover={{ scale: 1.05 }}
              >
                <LollipopIcon className="h-5 w-5 mr-2" />
                {title}
              </motion.span>
              
              {items.map((item, index) => (
                <motion.span 
                  key={`${dupeIndex}-${index}`} 
                  className="flex items-center text-amber-800"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="mr-1.5">•</span>
                  {item}
                  {index === items.length - 1 && dupeIndex === 0 ? null : (
                    <motion.span 
                      className="ml-1.5"
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                    >
                      {index % 3 === 0 ? <Cherry className="h-4 w-4 text-airbnb-red" /> : 
                       index % 3 === 1 ? <IceCreamCone className="h-4 w-4 text-blue-500" /> : 
                       <Candy className="h-4 w-4 text-pink-500" />}
                    </motion.span>
                  )}
                </motion.span>
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MarqueeAnnouncement;
