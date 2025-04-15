
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import CategorySelector from '@/components/CategorySelector';
import Experiences from '@/components/Experiences';
import BottomNav from '@/components/BottomNav';
import UpcomingExperiences from '@/components/UpcomingExperiences';
import ChefsSpecials from '@/components/ChefsSpecials';
import PhotoGallery from '@/components/PhotoGallery';
import Testimonials from '@/components/Testimonials';
import Highlights from '@/components/Highlights';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('menu');
  const [activeTab, setActiveTab] = useState('explore');

  return (
    <div className="pb-16">
      <SearchBar />
      <CategorySelector 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      {activeCategory === 'home' ? (
        <>
          <UpcomingExperiences />
          <ChefsSpecials />
          <PhotoGallery />
          <Testimonials />
          <Highlights />
        </>
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
