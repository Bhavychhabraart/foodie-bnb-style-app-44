
import React from 'react';
import { LollipopIcon, Cherry, Candy, IceCream } from 'lucide-react';

interface MarqueeProps {
  title: string;
  items: string[];
}

const MarqueeAnnouncement: React.FC<MarqueeProps> = ({ title, items }) => {
  return (
    <div className="bg-airbnb-gold/20 py-2.5 overflow-hidden border-y border-airbnb-gold/30 dark:border-airbnb-gold/30">
      <div className="flex items-center marquee">
        <div className="flex shrink-0 items-center space-x-6 py-1 animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, dupeIndex) => (
            <React.Fragment key={dupeIndex}>
              <span className="flex items-center font-medium text-airbnb-darkbrown dark:text-airbnb-gold">
                <LollipopIcon className="h-5 w-5 mr-2" />
                {title}
              </span>
              
              {items.map((item, index) => (
                <span key={`${dupeIndex}-${index}`} className="flex items-center text-airbnb-darkbrown dark:text-airbnb-beige">
                  <span className="mr-1.5">•</span>
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
