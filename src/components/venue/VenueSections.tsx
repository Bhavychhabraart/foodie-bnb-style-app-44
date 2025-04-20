
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

export const VenueHighlights: React.FC<VenueHighlightsProps> = ({ highlights = [], loading = false }) => {
  if (loading) {
    return (
      <div className="py-12">
        <div className="container">
          <div className="flex justify-center">
            <p>Loading highlights...</p>
          </div>
        </div>
      </div>
    );
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return <Award className="h-8 w-8 text-primary" />;
      case 'Clock':
        return <Clock className="h-8 w-8 text-primary" />;
      case 'Utensils':
        return <Utensils className="h-8 w-8 text-primary" />;
      default:
        return <Award className="h-8 w-8 text-primary" />;
    }
  };

  // Use sample data if no highlights are provided
  const displayHighlights = highlights.length > 0 ? highlights : [
    {
      id: '1', 
      title: 'Award-Winning Chefs',
      description: 'Our culinary team has been recognized with prestigious awards for their innovative approach.',
      icon_name: 'Award'
    },
    {
      id: '2',
      title: 'Farm to Table',
      description: 'We source the freshest ingredients from local farms for an authentic dining experience.',
      icon_name: 'Utensils'
    },
    {
      id: '3',
      title: 'Exclusive Dining Hours',
      description: 'We offer special dining hours for intimate gatherings and private celebrations.',
      icon_name: 'Clock'
    }
  ];

  return (
    <section id="highlights" className="py-12 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">Venue Highlights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayHighlights.map((highlight) => (
            <Card key={highlight.id} className="bg-card hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-4 rounded-full mb-4">
                    {getIconComponent(highlight.icon_name)}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
                  <p className="text-muted-foreground">{highlight.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

interface VenueHeroProps {
  venueName?: string;
  venueDescription?: string;
  scrollToBooking?: () => void;
}

export const VenueHero: React.FC<VenueHeroProps> = ({ 
  venueName = "Venue Name", 
  venueDescription = "Experience the ultimate dining destination where aesthetics meet culinary excellence!",
  scrollToBooking 
}) => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-r from-primary/20 to-muted">
      <div className="container text-center px-4 py-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{venueName}</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-muted-foreground">
          {venueDescription}
        </p>
        <div className="space-x-4">
          <Button size="lg" onClick={scrollToBooking}>
            Book a Table
          </Button>
          <Button variant="outline" size="lg">
            View Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

interface VenueAboutProps {
  title?: string;
  description?: string;
  imageUrl?: string;
}

export const VenueAbout: React.FC<VenueAboutProps> = ({ 
  title = "About Our Venue", 
  description = "We are a premier dining destination offering exquisite cuisine and an unforgettable atmosphere. Our team of dedicated chefs works tirelessly to create innovative dishes using the finest ingredients.",
  imageUrl = "https://lovable.dev/placeholder.svg"
}) => {
  return (
    <section id="about" className="py-12">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-muted-foreground mb-6">{description}</p>
            <Button variant="outline">Read Our Story</Button>
          </div>
          <div className="aspect-video overflow-hidden rounded-lg">
            <img 
              src={imageUrl} 
              alt="About our venue" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};
