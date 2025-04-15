
import React from 'react';
import { Star, Share } from 'lucide-react';

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
        
        <button className="share-button">
          <Share className="h-5 w-5 text-gray-700" />
        </button>
        
        <div className="image-dots">
          <div className="image-dot active"></div>
          <div className="image-dot"></div>
          <div className="image-dot"></div>
          <div className="image-dot"></div>
          <div className="image-dot"></div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium">{title}</h3>
          {rating > 0 && (
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-current text-airbnb-dark" />
              <span className="ml-1 text-sm">{rating.toFixed(2)}</span>
            </div>
          )}
        </div>
        
        <p className="text-airbnb-light text-sm">Hosted by {host}</p>
        
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
