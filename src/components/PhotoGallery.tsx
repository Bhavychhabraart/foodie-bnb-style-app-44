
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface GalleryPhoto {
  id: number | string;
  url: string;
  alt: string;
}

const PhotoGallery: React.FC = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryPhotos();
  }, []);

  const fetchGalleryPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('id, image_url, alt_text')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const formattedData = data.map(item => ({
          id: item.id,
          url: item.image_url,
          alt: item.alt_text || ''
        }));
        setPhotos(formattedData);
      } else {
        // Fallback to default photos if no gallery photos found
        setPhotos([
          {
            id: 1,
            url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            alt: "Main dining area with elegant table settings"
          },
          {
            id: 2,
            url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            alt: "Gourmet dish presentation"
          },
          {
            id: 3,
            url: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            alt: "Bar area with premium spirits"
          },
          {
            id: 4,
            url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            alt: "Craft cocktails and drinks"
          },
          {
            id: 5,
            url: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
            alt: "Chef preparing signature dish"
          },
          {
            id: 6,
            url: "https://images.unsplash.com/photo-1464195244916-405fa0a8763e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            alt: "Private dining section"
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching gallery photos:', error);
      // Use default photos on error
      setPhotos([
        {
          id: 1,
          url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          alt: "Main dining area with elegant table settings"
        },
        {
          id: 2,
          url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          alt: "Gourmet dish presentation"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex(prev => (prev + 1) % photos.length);
  };
  
  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex(prev => (prev - 1 + photos.length) % photos.length);
  };

  if (loading) {
    return (
      <div id="photos" className="section-padding bg-zinc-900">
        <div className="container-padding mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Photo Gallery</h2>
            <LayoutGrid size={20} className="text-airbnb-dark bg-zinc-50" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-40 sm:h-48 md:h-56 lg:h-64 bg-gray-800" />
            ))}
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
            <Dialog 
              key={photo.id} 
              open={open && currentPhotoIndex === index} 
              onOpenChange={value => {
                setOpen(value);
                if (value) {
                  setCurrentPhotoIndex(index);
                }
              }}
            >
              <DialogTrigger asChild>
                <Card className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg">
                  <div className="h-40 sm:h-48 md:h-56 lg:h-64 relative">
                    <img 
                      src={photo.url} 
                      alt={photo.alt} 
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
                  
                  <img src={photos[currentPhotoIndex].url} alt={photos[currentPhotoIndex].alt} className="max-h-full max-w-full" />
                  
                  <Button variant="ghost" className="absolute right-4 top-1/2 -translate-y-1/2 text-white z-10 p-2 rounded-full bg-black/50 hover:bg-black/70" onClick={nextPhoto}>
                    <ChevronRight className="h-6 w-6" />
                  </Button>
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
