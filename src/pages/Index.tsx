
import React, { useState } from 'react';
import CategorySelector from '@/components/CategorySelector';
import Experiences from '@/components/Experiences';
import BottomNav from '@/components/BottomNav';
import UpcomingExperiences from '@/components/UpcomingExperiences';
import ChefsSpecials from '@/components/ChefsSpecials';
import PhotoGallery from '@/components/PhotoGallery';
import Testimonials from '@/components/Testimonials';
import Highlights from '@/components/Highlights';
import OngoingOffers from '@/components/OngoingOffers';
import FlipBook from '@/components/FlipBook';
import Menu from '@/components/Menu';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('menu');
  const [activeTab, setActiveTab] = useState('explore');

  return (
    <div className="pb-16 bg-white">
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
          <Testimonials />
          <Highlights />
        </div>
      ) : activeCategory === 'menu' ? (
        <FlipBook />
      ) : (
        <Experiences category={activeCategory} />
      )}
      
      <BottomNav 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default Index;
