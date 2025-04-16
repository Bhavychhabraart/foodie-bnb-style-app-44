
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CategorySelector from '@/components/CategorySelector';
import Events from '@/components/Events';
import BottomNav from '@/components/BottomNav';
import ChefsSpecials from '@/components/ChefsSpecials';
import OngoingOffers from '@/components/OngoingOffers';
import PhotoGallery from '@/components/PhotoGallery';
import Testimonials from '@/components/Testimonials';
import Highlights from '@/components/Highlights';
import FlipBook from '@/components/FlipBook';
import MarqueeAnnouncement from '@/components/MarqueeAnnouncement';
import About from '@/components/About';
import Spotlight from '@/components/Spotlight';
import { ThemeToggle } from '@/components/ThemeToggle';
import { EditIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('home');
  const [activeTab, setActiveTab] = useState('explore');
  const upcomingEvents = [
    "Soulful Sufi Night - 16th April", 
    "Our World with Raja Kikkat - 17th April", 
    "Thursday Gin & Groove - 17th April", 
    "Back to 90s - 18th April", 
    "Bollywood Night - 20th April"
  ];
  
  return (
    <div className="pb-16 bg-airbnb-dark">
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <Link to="/edit-panel">
          <Button variant="outline" size="sm" className="h-8 gap-1 bg-black/40 backdrop-blur-sm border-gray-700 hover:bg-black/60">
            <EditIcon className="h-3.5 w-3.5" />
            <span className="text-xs">Edit Site</span>
          </Button>
        </Link>
        <ThemeToggle />
      </div>
      
      <MarqueeAnnouncement title="Upcoming Events!" items={upcomingEvents} />
      
      <div className="sticky top-0 z-10 shadow-md shadow-black/30">
        <CategorySelector activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      </div>
      
      {activeCategory === 'home' ? (
        <div className="space-y-2 bg-airbnb-dark">
          <Events category="home" />
          <Spotlight />
          <ChefsSpecials />
          <OngoingOffers />
          <PhotoGallery />
          <About />
          <Highlights />
          <Testimonials />
        </div>
      ) : activeCategory === 'experiences' ? (
        <Events category="experiences" />
      ) : activeCategory === 'menu' ? (
        <div>
          <FlipBook />
        </div>
      ) : activeCategory === 'offers' ? (
        <div>
          <OngoingOffers />
        </div>
      ) : null}
      
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Index;
