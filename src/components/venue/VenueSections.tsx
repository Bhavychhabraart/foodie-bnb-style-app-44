import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Clock, Utensils } from 'lucide-react';

interface Highlight {
  id: string;
  title: string;
  description: string;
  icon_name: string;
}

interface VenueHighlightsProps {
  highlights?: Highlight[];
  loading?: boolean;
}

interface VenueHeroProps {
  venueName?: string;
  venueDescription?: string;
  scrollToBooking?: () => void;
}

interface VenueAboutProps {
  title?: string;
  description?: string;
  imageUrl?: string;
}

export const VenueHero: React.FC<VenueHeroProps> = ({ 
  venueName = "Slique", 
  venueDescription = "Experience modern luxury dining in the heart of the city. Where contemporary cuisine meets elegant ambiance.",
  scrollToBooking 
}) => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-[#1A1F2C] to-[#6E59A5]">
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div className="container text-center px-4 py-12 relative z-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
          {venueName}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
          {venueDescription}
        </p>
        <div className="space-x-4">
          <Button 
            size="lg" 
            onClick={scrollToBooking}
            className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
          >
            Reserve Your Table
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="text-white border-white hover:bg-white/10"
          >
            Explore Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export const VenueAbout: React.FC<VenueAboutProps> = ({ 
  title = "Modern Elegance", 
  description = "Slique represents the pinnacle of contemporary dining, offering an innovative fusion of global flavors in a sophisticated setting. Our expert chefs craft each dish with precision and creativity, ensuring an unforgettable culinary journey.",
  imageUrl = "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
}) => {
  return (
    <section id="about" className="py-20 bg-[#1A1F2C]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-white">{title}</h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">{description}</p>
            <Button 
              variant="outline"
              className="text-white border-white hover:bg-white/10"
            >
              Our Story
            </Button>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-xl">
            <img 
              src={imageUrl} 
              alt="Slique interior" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const VenueHighlights: React.FC<VenueHighlightsProps> = ({ highlights = [], loading = false }) => {
  if (loading) {
    return (
      <div className="py-12">
        <div className="container">
          <div className="flex justify-center">
            <p className="text-white">Loading highlights...</p>
          </div>
        </div>
      </div>
    );
  }

  // Use these curated highlights for Slique
  const sliqueHighlights = [
    {
      id: '1',
      title: 'Michelin-Starred Chef',
      description: 'Experience culinary masterpieces crafted by our internationally acclaimed chef team.',
      icon_name: 'Award'
    },
    {
      id: '2',
      title: 'Farm to Table',
      description: 'We source only the finest seasonal ingredients from local artisanal producers.',
      icon_name: 'Utensils'
    },
    {
      id: '3',
      title: 'Private Dining',
      description: 'Exclusive dining spaces available for intimate gatherings and special occasions.',
      icon_name: 'Clock'
    }
  ];

  const displayHighlights = highlights.length > 0 ? highlights : sliqueHighlights;

  return (
    <section id="highlights" className="py-20 bg-gradient-to-b from-[#1A1F2C] to-[#2C1F3D]">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose Slique</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayHighlights.map((highlight) => (
            <Card key={highlight.id} className="bg-white/5 backdrop-blur-sm border-0">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-[#9b87f5]/10 p-4 rounded-full mb-4">
                    {highlight.icon_name === 'Award' && <Award className="h-8 w-8 text-[#9b87f5]" />}
                    {highlight.icon_name === 'Utensils' && <Utensils className="h-8 w-8 text-[#9b87f5]" />}
                    {highlight.icon_name === 'Clock' && <Clock className="h-8 w-8 text-[#9b87f5]" />}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{highlight.title}</h3>
                  <p className="text-gray-300">{highlight.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
