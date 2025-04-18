
import React from 'react';
import { Star, Share, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const MakhnaHero = () => {
  const { toast } = useToast();

  const handleShare = () => {
    toast({
      title: 'Share this restaurant',
      description: 'Link copied to clipboard!',
    });
  };

  const handleSave = () => {
    toast({
      title: 'Restaurant saved',
      description: 'Added to your favorites!',
    });
  };

  return (
    <div className="container-padding mx-auto mt-4">
      <h1 className="text-2xl md:text-3xl font-semibold mb-2 text-airbnb-light">Makhna</h1>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1 text-airbnb-gold">
          <Star className="h-4 w-4 fill-current" />
          <span className="font-medium">4.89</span>
          <span className="mx-1 text-airbnb-light/70">·</span>
          <span className="text-airbnb-light/70 underline">164 reviews</span>
          <span className="mx-1 text-airbnb-light/70">·</span>
          <span className="text-airbnb-light/70 underline">Mumbai, India</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            className="flex items-center space-x-2 hover:bg-airbnb-gold/10 rounded-md px-3 py-1.5"
            onClick={handleShare}
          >
            <Share className="h-4 w-4 text-airbnb-gold" />
            <span className="text-sm font-medium text-airbnb-light">Share</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex items-center space-x-2 hover:bg-airbnb-gold/10 rounded-md px-3 py-1.5"
            onClick={handleSave}
          >
            <Heart className="h-4 w-4 text-airbnb-gold" />
            <span className="text-sm font-medium text-airbnb-light">Save</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden h-64 md:h-96">
        <div className="md:col-span-2 md:row-span-2 bg-airbnb-dark relative h-full">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b" 
            alt="Makhna main dining area" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden md:block bg-airbnb-dark relative h-full">
          <img 
            src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
            alt="Food plating" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden md:block bg-airbnb-dark relative h-full">
          <img 
            src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d" 
            alt="Bar area" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden md:block bg-airbnb-dark relative h-full">
          <img 
            src="https://images.unsplash.com/photo-1493962853295-0fd70327578a" 
            alt="Drinks" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default MakhnaHero;
