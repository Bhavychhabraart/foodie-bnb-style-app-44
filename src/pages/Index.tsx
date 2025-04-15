
import React, { useState } from 'react';
import CategorySelector from '@/components/CategorySelector';
import Experiences from '@/components/Experiences';
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

  const summerDesserts = [
    "Mango Passion Sorbet", 
    "Berry Pavlova",
    "Coconut Lime Panna Cotta",
    "Watermelon Granita",
    "Lavender Honey Ice Cream"
  ];

  return (
    <div className="pb-16 bg-background">
      <div className="flex justify-end p-4">
        <ThemeToggle />
      </div>
      
      <MarqueeAnnouncement 
        title="New Summer Desserts!" 
        items={summerDesserts} 
      />
      
      <div className="sticky top-0 z-10 bg-background shadow-sm dark:shadow-gray-800/20">
        <CategorySelector 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>
      
      {activeCategory === 'home' ? (
        <div className="space-y-2">
          <Experiences category="home" />
          <Spotlight />
          <ChefsSpecials />
          <OngoingOffers />
          <PhotoGallery />
          <About />
          <Highlights />
          <Testimonials />
        </div>
      ) : activeCategory === 'experiences' ? (
        <Experiences category="experiences" />
      ) : activeCategory === 'menu' ? (
        <FlipBook />
      ) : activeCategory === 'offers' ? (
        <OngoingOffers />
      ) : null}
      
      <BottomNav 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default Index;
