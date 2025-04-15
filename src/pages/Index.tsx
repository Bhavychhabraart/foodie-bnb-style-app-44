
import React, { useState } from 'react';
import CategorySelector from '@/components/CategorySelector';
import Experiences from '@/components/Experiences';
import BottomNav from '@/components/BottomNav';
import UpcomingExperiences from '@/components/UpcomingExperiences';
import ChefsSpecials from '@/components/ChefsSpecials';
import OngoingOffers from '@/components/OngoingOffers';
import PhotoGallery from '@/components/PhotoGallery';
import Testimonials from '@/components/Testimonials';
import Highlights from '@/components/Highlights';
import FlipBook from '@/components/FlipBook';
import MarqueeAnnouncement from '@/components/MarqueeAnnouncement';

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
    <div className="pb-16 bg-white">
      <MarqueeAnnouncement 
        title="New Summer Desserts!" 
        items={summerDesserts} 
      />
      
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <CategorySelector 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>
      
      {activeCategory === 'home' ? (
        <div className="space-y-2">
          <UpcomingExperiences />
          <ChefsSpecials />
          <OngoingOffers />
          <PhotoGallery />
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
