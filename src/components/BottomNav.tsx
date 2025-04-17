
import React from 'react';
import { Compass, Home, CalendarRange, Sparkles, Instagram } from 'lucide-react';
import { Button } from './ui/button';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenInfluencer: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, onOpenInfluencer }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t dark:border-gray-800 flex justify-around items-center h-16 z-50">
      <Button
        variant="ghost"
        className={`flex flex-col items-center justify-center h-full w-full ${
          activeTab === 'home' ? 'text-airbnb-red' : 'text-gray-500'
        }`}
        onClick={() => setActiveTab('home')}
      >
        <Home className="h-5 w-5" />
        <span className="text-xs mt-1">Home</span>
      </Button>
      <Button
        variant="ghost"
        className={`flex flex-col items-center justify-center h-full w-full ${
          activeTab === 'explore' ? 'text-airbnb-red' : 'text-gray-500'
        }`}
        onClick={() => setActiveTab('explore')}
      >
        <Compass className="h-5 w-5" />
        <span className="text-xs mt-1">Explore</span>
      </Button>
      <Button
        variant="ghost"
        className={`flex flex-col items-center justify-center h-full w-full ${
          activeTab === 'bookings' ? 'text-airbnb-red' : 'text-gray-500'
        }`}
        onClick={() => setActiveTab('bookings')}
      >
        <CalendarRange className="h-5 w-5" />
        <span className="text-xs mt-1">Bookings</span>
      </Button>
      <Button
        variant="ghost"
        className={`flex flex-col items-center justify-center h-full w-full ${
          activeTab === 'influencer' ? 'text-airbnb-red' : 'text-gray-500'
        }`}
        onClick={onOpenInfluencer}
      >
        <Instagram className="h-5 w-5" />
        <span className="text-xs mt-1">Collab</span>
      </Button>
    </div>
  );
};

export default BottomNav;
