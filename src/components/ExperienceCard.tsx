
import React from 'react';
import { Share } from 'lucide-react';

interface ExperienceCardProps {
  imageUrl: string;
  title: string;
  host: string;
  price: string;
  rating?: number;
  reviews?: number;
  isSoldOut?: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  imageUrl,
  title,
  host,
  price,
  rating = 0,
  reviews = 0,
  isSoldOut = false
}) => {
  return (
    <div className="mb-8">
      <div className="relative rounded-xl overflow-hidden mb-2">
        <img src={imageUrl} alt={title} className="w-full h-[300px] object-cover" />
        
        <button className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center">
          <Share className="h-5 w-5 text-gray-700" />
        </button>
        
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/70'}`}
            />
          ))}
        </div>
      </div>
      
      <div className="px-1">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-gray-500 text-sm">Hosted by {host}</p>
        
        {isSoldOut ? (
          <p className="font-medium mt-1">Sold out</p>
        ) : (
          <p className="mt-1">
            <span className="font-medium">{price}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;
