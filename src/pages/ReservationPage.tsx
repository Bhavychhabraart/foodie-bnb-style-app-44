
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ReservationType = ({ title, description, icon, selected, onClick }: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <Card 
      className={`cursor-pointer transition-all ${selected ? 'border-airbnb-red ring-2 ring-airbnb-red/20' : 'border-gray-200'}`}
      onClick={onClick}
    >
      <CardContent className="p-4 flex items-start gap-4">
        <div className="bg-airbnb-gray p-3 rounded-full">{icon}</div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-airbnb-light text-sm">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const ReservationPage = () => {
  const [activeTab, setActiveTab] = useState('explore');
  const [selectedType, setSelectedType] = useState('regular');
  const navigate = useNavigate();
  
  const reservationTypes = [
    {
      id: 'regular',
      title: 'Regular Dining',
      description: 'Regular dining experience for couples and small groups',
      icon: '🍽️'
    },
    {
      id: 'corporate',
      title: 'Corporate Events',
      description: 'Business meetings and corporate gatherings',
      icon: '💼'
    },
    {
      id: 'private',
      title: 'Private Parties',
      description: 'Exclusive space for private celebrations',
      icon: '🎉'
    },
    {
      id: 'kitty',
      title: 'Kitty Parties',
      description: 'Fun and entertainment for group gatherings',
      icon: '👯'
    },
    {
      id: 'date',
      title: 'Date Night',
      description: 'Special romantic setup for couples',
      icon: '❤️'
    }
  ];

  const handleContinue = () => {
    navigate(`/booking/${selectedType}`);
  };

  return (
    <div className="pb-16">
      <Navbar activeTab="menu" setActiveTab={() => {}} />

      <div className="container-padding mx-auto mt-6">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Reservation</h1>
        <p className="text-airbnb-light mb-6">Select the type of reservation you want to make</p>
        
        <div className="space-y-4 mb-8">
          {reservationTypes.map((type) => (
            <ReservationType
              key={type.id}
              title={type.title}
              description={type.description}
              icon={<span className="text-2xl">{type.icon}</span>}
              selected={selectedType === type.id}
              onClick={() => setSelectedType(type.id)}
            />
          ))}
        </div>
        
        <Button 
          className="airbnb-button w-full md:w-auto"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
      
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default ReservationPage;
