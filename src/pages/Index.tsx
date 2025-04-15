
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
import MenuCard from '@/components/MenuCard';
import MarqueeAnnouncement from '@/components/MarqueeAnnouncement';
import About from '@/components/About';
import Spotlight from '@/components/Spotlight';
import { ChevronRight } from 'lucide-react';

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
        <div className="container-padding section-padding">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-2xl">Our Menu</h2>
            <button className="flex items-center text-airbnb-red hover:underline text-xs text-left">
              <span className="mr-1">View all</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <MenuCard />
        </div>
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
