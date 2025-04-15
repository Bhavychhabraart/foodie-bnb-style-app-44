
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, Utensils, Camera, Gift, Users } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
  return (
    <Card className="border border-gray-200 hover:shadow-md transition-all">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-airbnb-gray p-3 rounded-full">
            {icon}
          </div>
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        <p className="text-airbnb-light mb-4">{description}</p>
        <Button variant="outline" className="w-full">Learn More</Button>
      </CardContent>
    </Card>
  );
};

const VenueServicesPage = () => {
  const [activeTab, setActiveTab] = useState('explore');
  
  const services = [
    {
      title: 'Live Music',
      description: 'Enjoy live performances from local artists while you dine with us.',
      icon: <Music className="h-6 w-6 text-airbnb-red" />
    },
    {
      title: 'Private Chef',
      description: 'Book a private chef experience for your special occasions.',
      icon: <Utensils className="h-6 w-6 text-airbnb-red" />
    },
    {
      title: 'Photography',
      description: 'Professional photography services for your celebrations.',
      icon: <Camera className="h-6 w-6 text-airbnb-red" />
    },
    {
      title: 'Gift Services',
      description: 'Surprise your loved ones with special gifts delivered to the table.',
      icon: <Gift className="h-6 w-6 text-airbnb-red" />
    },
    {
      title: 'Event Planning',
      description: 'Complete event planning services for larger gatherings.',
      icon: <Users className="h-6 w-6 text-airbnb-red" />
    }
  ];

  return (
    <div className="pb-16">
      <Navbar activeTab="menu" setActiveTab={() => {}} />

      <div className="container-padding mx-auto mt-6">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Inside Venue Services</h1>
        <p className="text-airbnb-light mb-6">Discover the special services available at our restaurant</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
      
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default VenueServicesPage;
