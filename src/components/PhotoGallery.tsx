
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, ImageIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

// Static sample gallery data
const samplePhotos = [
  {
    id: '1',
    image_url: '/lovable-uploads/1b747850-74bd-4752-93b7-eeeab113b43a.png',
    alt_text: 'Restaurant interior',
    caption: 'Our elegant dining area'
  },
  {
    id: '2',
    image_url: '/lovable-uploads/1f8b3900-b741-4507-9b2f-47953f00f3bd.png',
    alt_text: 'Special dish',
    caption: 'Chef\'s special creation'
  },
  {
    id: '3',
    image_url: '/lovable-uploads/2876d9eb-45d5-4fb9-bac5-14a5d8624765.png',
    alt_text: 'Cocktail preparation',
    caption: 'Signature cocktails at the bar'
  },
  {
    id: '4',
    image_url: '/lovable-uploads/63b7aa0e-bd60-4379-aee7-3936cc89fff5.png',
    alt_text: 'Outdoor seating',
    caption: 'Our beautiful patio area'
  },
];

const PhotoGallery: React.FC = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const initialDisplayCount = 3;
  
  const photos = samplePhotos;  // Using static data instead of fetching from Supabase
  const displayPhotos = showAll ? photos : photos.slice(0, initialDisplayCount);
  
  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex(prev => (prev + 1) % photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex(prev => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div id="photos" className="section-padding bg-zinc-900">
      <div className="container-padding mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">Photo Gallery</h2>
            <ImageIcon size={20} className="text-airbnb-gold" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {displayPhotos.map((photo, index) => (
            <Dialog key={photo.id} open={open && currentPhotoIndex === index} onOpenChange={value => {
              setOpen(value);
              if (value) {
                setCurrentPhotoIndex(index);
              }
            }}>
              <DialogTrigger asChild>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl group">
                    <div className="h-64 sm:h-72 relative overflow-hidden">
                      <img 
                        src={photo.image_url} 
                        alt={photo.alt_text || 'Gallery image'} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {photo.caption && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-white text-sm">{photo.caption}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-4xl p-0 bg-transparent border-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative bg-black rounded-xl h-[80vh] flex items-center justify-center overflow-hidden"
                >
                  <Button variant="ghost" className="absolute right-4 top-4 text-white z-10 p-2 rounded-full bg-black/50 hover:bg-black/70" onClick={() => setOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                  
                  <Button variant="ghost" className="absolute left-4 top-1/2 -translate-y-1/2 text-white z-10 p-2 rounded-full bg-black/50 hover:bg-black/70" onClick={prevPhoto}>
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  
                  <motion.img 
                    key={currentPhotoIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={photos[currentPhotoIndex].image_url} 
                    alt={photos[currentPhotoIndex].alt_text || 'Gallery image'} 
                    className="max-h-full max-w-full object-contain" 
                  />
                  
                  <Button variant="ghost" className="absolute right-4 top-1/2 -translate-y-1/2 text-white z-10 p-2 rounded-full bg-black/50 hover:bg-black/70" onClick={nextPhoto}>
                    <ChevronRight className="h-6 w-6" />
                  </Button>

                  {photos[currentPhotoIndex].caption && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white py-2 px-4 rounded-md max-w-lg text-center">
                      {photos[currentPhotoIndex].caption}
                    </div>
                  )}
                </motion.div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        
        {photos.length > initialDisplayCount && (
          <div className="flex justify-center mt-8">
            <Button 
              variant="outline" 
              className="border-airbnb-gold text-airbnb-gold hover:bg-airbnb-gold/10" 
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <>
                  Show less
                  <ChevronUp className="ml-2 w-4 h-4" />
                </>
              ) : (
                <>
                  View all photos
                  <ChevronDown className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
