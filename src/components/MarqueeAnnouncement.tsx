
import React from 'react';
import { LollipopIcon, Cherry, Candy, IceCream, Calendar } from 'lucide-react';

interface MarqueeProps {
  title: string;
  items: string[];
}

const MarqueeAnnouncement: React.FC<MarqueeProps> = ({ title, items }) => {
  return (
    <div className="relative bg-gradient-to-r from-airbnb-dark via-airbnb-dark to-airbnb-dark py-3 overflow-hidden border-y border-airbnb-gold/30 shadow-md shadow-black/10">
      {/* Static icon on the left side */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-airbnb-gold/20 p-1.5 rounded-full z-10 hidden md:flex">
        <Calendar className="h-4 w-4 text-airbnb-gold" />
      </div>
      
      {/* Gradient overlay on left */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-airbnb-dark to-transparent z-[1]"></div>
      
      {/* Gradient overlay on right */}
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-airbnb-dark to-transparent z-[1]"></div>
      
      <div className="flex items-center marquee pl-8 scrollbar-none">
        <div className="flex shrink-0 items-center space-x-6 py-1 animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, dupeIndex) => (
            <React.Fragment key={dupeIndex}>
              <span className="flex items-center font-semibold text-airbnb-gold">
                <LollipopIcon className="h-5 w-5 mr-2" />
                {title}
              </span>
              
              {items.map((item, index) => (
                <span key={`${dupeIndex}-${index}`} className="flex items-center text-airbnb-light">
                  <span className="mx-2 text-airbnb-gold/50">•</span>
                  {item}
                  {index === items.length - 1 && dupeIndex === 0 ? null : (
                    <span className="ml-1.5">
                      {index % 3 === 0 ? <Cherry className="h-4 w-4 text-airbnb-gold" /> : 
                       index % 3 === 1 ? <IceCream className="h-4 w-4 text-airbnb-gold" /> : 
                       <Candy className="h-4 w-4 text-airbnb-gold" />}
                    </span>
                  )}
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeAnnouncement;
