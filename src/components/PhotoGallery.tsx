import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";

// Type for gallery photos
type GalleryPhoto = {
  id: string;
  image_url: string;
  alt_text?: string;
  caption?: string;
};

interface PhotoGalleryProps {
  bucketName?: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  bucketName = 'gallery'
}) => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .list('', {
          limit: 10,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) {
        console.error('Error fetching gallery photos:', error);
        return;
      }

      const galleryPhotos: GalleryPhoto[] = data.map((photo, index) => ({
        id: photo.name,
        image_url: supabase.storage.from(bucketName).getPublicUrl(photo.name).data.publicUrl,
        alt_text: `Gallery image ${index + 1}`,
        caption: `Photo ${index + 1}`
      }));
      setPhotos(galleryPhotos);
    };
    fetchPhotos();
  }, [bucketName]);

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex(prev => (prev + 1) % photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex(prev => (prev - 1 + photos.length) % photos.length);
  };

  return <div id="photos" className="section-padding bg-airbnb-dark">
      <div className="container-padding mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">Photo Gallery</h2>
            <ImageIcon size={20} className="text-airbnb-gold" />
          </div>
        </div>
        
        {photos.length === 0 ? <div className="text-center py-10 text-gray-500">
            No photos in the gallery yet
          </div> : <>
            <Carousel className="w-full">
              <CarouselContent>
                {photos.map((photo, index) => <CarouselItem key={photo.id} className="md:basis-1/2 lg:basis-1/3">
                    <Dialog open={open && currentPhotoIndex === index} onOpenChange={value => {
                setOpen(value);
                if (value) {
                  setCurrentPhotoIndex(index);
                }
              }}>
                      <DialogTrigger asChild>
                        <motion.div whileHover={{
                    y: -5
                  }} transition={{
                    type: "spring",
                    stiffness: 300
                  }}>
                          <Card className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl group">
                            <div className="h-64 sm:h-72 relative overflow-hidden">
                              <img src={photo.image_url} alt={photo.alt_text || 'Gallery image'} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              
                              {photo.caption && <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                  <p className="text-white text-sm">{photo.caption}</p>
                                </div>}
                            </div>
                          </Card>
                        </motion.div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-4xl p-0 bg-transparent border-none">
                        <motion.div initial={{
                    opacity: 0,
                    scale: 0.95
                  }} animate={{
                    opacity: 1,
                    scale: 1
                  }} exit={{
                    opacity: 0
                  }} className="relative bg-black rounded-xl h-[80vh] flex items-center justify-center overflow-hidden">
                          <Button variant="ghost" className="absolute right-4 top-4 text-white z-10 p-2 rounded-full bg-black/50 hover:bg-black/70" onClick={() => setOpen(false)}>
                            <X className="h-5 w-5" />
                          </Button>
                          
                          <Button variant="ghost" className="absolute left-4 top-1/2 -translate-y-1/2 text-white z-10 p-2 rounded-full bg-black/50 hover:bg-black/70" onClick={prevPhoto}>
                            <ChevronLeft className="h-6 w-6" />
                          </Button>
                          
                          <motion.img key={currentPhotoIndex} initial={{
                      opacity: 0
                    }} animate={{
                      opacity: 1
                    }} exit={{
                      opacity: 0
                    }} src={photos[currentPhotoIndex].image_url} alt={photos[currentPhotoIndex].alt_text || 'Gallery image'} className="max-h-full max-w-full object-contain" />
                          
                          <Button variant="ghost" className="absolute right-4 top-1/2 -translate-y-1/2 text-white z-10 p-2 rounded-full bg-black/50 hover:bg-black/70" onClick={nextPhoto}>
                            <ChevronRight className="h-6 w-6" />
                          </Button>

                          {photos[currentPhotoIndex].caption && <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white py-2 px-4 rounded-md max-w-lg text-center">
                              {photos[currentPhotoIndex].caption}
                            </div>}
                        </motion.div>
                      </DialogContent>
                    </Dialog>
                  </CarouselItem>)}
              </CarouselContent>
              <CarouselDots className="mt-4" />
            </Carousel>
          </>}
      </div>
    </div>;
};

export default PhotoGallery;
