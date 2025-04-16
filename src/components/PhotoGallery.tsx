
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from '@tanstack/react-query';

// Fetch gallery images from Supabase
const fetchGalleryImages = async () => {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching gallery images:', error);
    throw error;
  }
  
  return data || [];
};

const PhotoGallery: React.FC = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [open, setOpen] = useState(false);
  
  // Use React Query to fetch and cache gallery images
  const { data: photos = [], isLoading, error } = useQuery({
    queryKey: ['galleryPhotos'],
    queryFn: fetchGalleryImages
  });

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex(prev => (prev + 1) % photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex(prev => (prev - 1 + photos.length) % photos.length);
  };

  // Show loading state while fetching images
  if (isLoading) {
    return (
      <div id="photos" className="section-padding bg-zinc-900">
        <div className="container-padding mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Photo Gallery</h2>
          <div className="flex justify-center items-center h-64">
            <p className="text-airbnb-gold/80">Loading gallery...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if there was a problem fetching images
  if (error) {
    return (
      <div id="photos" className="section-padding bg-zinc-900">
        <div className="container-padding mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Photo Gallery</h2>
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">Unable to load gallery images</p>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state if no images exist
  if (photos.length === 0) {
    return (
      <div id="photos" className="section-padding bg-zinc-900">
        <div className="container-padding mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Photo Gallery</h2>
          <div className="flex justify-center items-center h-64">
            <p className="text-airbnb-gold/80">No photos available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="photos" className="section-padding bg-zinc-900">
      <div className="container-padding mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Photo Gallery</h2>
          <LayoutGrid size={20} className="text-airbnb-dark bg-zinc-50" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map((photo, index) => (
            <Dialog key={photo.id} open={open && currentPhotoIndex === index} onOpenChange={value => {
              setOpen(value);
              if (value) {
                setCurrentPhotoIndex(index);
              }
            }}>
              <DialogTrigger asChild>
                <Card className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg">
                  <div className="h-40 sm:h-48 md:h-56 lg:h-64 relative">
                    <img 
                      src={photo.image_url} 
                      alt={photo.alt_text || 'Gallery image'} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    />
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-3xl p-0 bg-transparent border-none">
                <div className="relative bg-black h-[80vh] flex items-center justify-center">
                  <Button variant="ghost" className="absolute right-4 top-4 text-white z-10 p-2 rounded-full bg-black/50 hover:bg-black/70" onClick={() => setOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                  
                  <Button variant="ghost" className="absolute left-4 top-1/2 -translate-y-1/2 text-white z-10 p-2 rounded-full bg-black/50 hover:bg-black/70" onClick={prevPhoto}>
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  
                  <img 
                    src={photos[currentPhotoIndex].image_url} 
                    alt={photos[currentPhotoIndex].alt_text || 'Gallery image'} 
                    className="max-h-full max-w-full" 
                  />
                  
                  <Button variant="ghost" className="absolute right-4 top-1/2 -translate-y-1/2 text-white z-10 p-2 rounded-full bg-black/50 hover:bg-black/70" onClick={nextPhoto}>
                    <ChevronRight className="h-6 w-6" />
                  </Button>

                  {photos[currentPhotoIndex].caption && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white py-2 px-4 rounded-md max-w-lg text-center">
                      {photos[currentPhotoIndex].caption}
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
