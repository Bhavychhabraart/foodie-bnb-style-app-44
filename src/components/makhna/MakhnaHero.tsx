
import React from 'react';
import { Star, Share, Heart, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

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
    <div className="relative overflow-hidden">
      <div className="container-padding mx-auto mt-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-airbnb-gold via-airbnb-gold/90 to-airbnb-gold/80 bg-clip-text text-transparent">
            Makhna
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-sm">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-airbnb-gold fill-current" />
              <span className="font-medium text-airbnb-gold">4.89</span>
              <span className="text-airbnb-light/70">(164 reviews)</span>
            </div>
            
            <div className="flex items-center text-airbnb-light/70">
              <MapPin className="h-4 w-4 mr-1 text-airbnb-gold" />
              <span>Mumbai, India</span>
            </div>
            
            <div className="flex items-center space-x-3 sm:ml-auto">
              <Button 
                variant="ghost" 
                size="sm"
                className="hover:bg-airbnb-gold/10 text-airbnb-light group"
                onClick={handleShare}
              >
                <Share className="h-4 w-4 mr-2 text-airbnb-gold group-hover:scale-110 transition-transform" />
                Share
              </Button>
              
              <Button 
                variant="ghost"
                size="sm"
                className="hover:bg-airbnb-gold/10 text-airbnb-light group"
                onClick={handleSave}
              >
                <Heart className="h-4 w-4 mr-2 text-airbnb-gold group-hover:scale-110 transition-transform" />
                Save
              </Button>
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden h-64 md:h-[450px]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 md:row-span-2 relative group"
          >
            <img 
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b" 
              alt="Makhna main dining area" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>
          
          {[
            "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
            "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
            "https://images.unsplash.com/photo-1493962853295-0fd70327578a"
          ].map((src, index) => (
            <motion.div 
              key={src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="hidden md:block relative group overflow-hidden"
            >
              <img 
                src={src} 
                alt={`Makhna interior ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MakhnaHero;
