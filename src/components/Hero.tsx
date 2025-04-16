import React from 'react';
import { Star, Share, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Hero: React.FC<{ scrollToBooking: () => void }> = ({ scrollToBooking }) => {
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
      <h1 className="text-2xl md:text-3xl font-semibold mb-2">Fine Dine Restaurant</h1>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 fill-current text-airbnb-red" />
          <span className="font-medium">4.92</span>
          <span className="mx-1 text-airbnb-light">·</span>
          <span className="text-airbnb-light underline">286 reviews</span>
          <span className="mx-1 text-airbnb-light">·</span>
          <span className="text-airbnb-light underline">Manhattan, New York</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            className="flex items-center space-x-2 hover:bg-gray-100 rounded-md px-3 py-1.5"
            onClick={handleShare}
          >
            <Share className="h-4 w-4" />
            <span className="text-sm font-medium">Share</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex items-center space-x-2 hover:bg-gray-100 rounded-md px-3 py-1.5"
            onClick={handleSave}
          >
            <Heart className="h-4 w-4" />
            <span className="text-sm font-medium">Save</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden h-64 md:h-96">
        <div className="md:col-span-2 md:row-span-2 bg-gray-200 relative h-full">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
            alt="Restaurant main dining area" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden md:block bg-gray-200 relative h-full">
          <img 
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
            alt="Food plating" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden md:block bg-gray-200 relative h-full">
          <img 
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
            alt="Bar area" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden md:block bg-gray-200 relative h-full">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
            alt="Drinks" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
