
import React, { useState } from 'react';
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
    <div className="pb-16 bg-airbnb-cream/20 dark:bg-airbnb-darkbrown">
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>
      
      <MarqueeAnnouncement title="Upcoming Events!" items={upcomingEvents} />
      
      <div className="sticky top-0 z-10 bg-airbnb-cream dark:bg-airbnb-darkbrown shadow-md shadow-black/30">
        <CategorySelector activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      </div>
      
      {activeCategory === 'home' ? (
        <div className="space-y-2 bg-airbnb-cream/20 dark:bg-airbnb-darkbrown">
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
          <Events category="menu" />
          <FlipBook />
        </div>
      ) : activeCategory === 'offers' ? (
        <div>
          <Events category="offers" />
          <OngoingOffers />
        </div>
      ) : null}
      
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Index;
