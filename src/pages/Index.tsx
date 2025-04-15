
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
import OngoingOffers from '@/components/OngoingOffers';
import FlipBook from '@/components/FlipBook';
import Menu from '@/components/Menu';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('home');
  const [activeTab, setActiveTab] = useState('explore');

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <SearchBar />
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
          <About />
        </div>
      ) : activeCategory === 'menu' ? (
        <FlipBook />
      ) : activeCategory === 'experiences' ? (
        <Experiences category={activeCategory} />
      ) : (
        <Menu />
      )}
      
      <Footer />
      
      <BottomNav 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default Index;
