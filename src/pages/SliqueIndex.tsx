
import React, { useState, useEffect } from 'react';
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
import BookingDrawer from '@/components/BookingDrawer';
import SliqueHero from '@/components/slique/SliqueHero';

const SliqueIndex = () => {
  const [activeCategory, setActiveCategory] = useState('home');
  const [activeTab, setActiveTab] = useState('explore');
  const [bookingOpen, setBookingOpen] = useState(false);
  const upcomingEvents = [
    "Jazz Night - Every Friday",
    "Chef's Table Experience",
    "Wine Tasting Evenings"
  ];
  
  useEffect(() => {
    const handleCategoryChange = (event: CustomEvent) => {
      setActiveCategory(event.detail);
    };

    window.document.addEventListener(
      "category-change",
      handleCategoryChange as EventListener
    );

    return () => {
      window.document.removeEventListener(
        "category-change",
        handleCategoryChange as EventListener
      );
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-airbnb-dark via-airbnb-dark/95 to-airbnb-dark">
      <div className="fixed top-4 right-4 z-20 flex items-center gap-2 backdrop-blur-sm bg-black/20 p-2 rounded-full">
        <ThemeToggle />
      </div>
      
      <MarqueeAnnouncement 
        title="Upcoming at Slique!" 
        items={upcomingEvents} 
      />
      
      <div className="sticky top-0 z-10">
        <div className="bg-gradient-to-b from-airbnb-dark to-transparent pb-4">
          <CategorySelector 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />
        </div>
      </div>
      
      <SliqueHero />
      
      {activeCategory === 'home' ? (
        <div className="space-y-8 animate-fade-in">
          <Spotlight tableName="slique_spotlight" />
          <Events tableName="slique_events" />
          <ChefsSpecials 
            tableName="slique_chefs_specials" 
            setActiveCategory={setActiveCategory} 
          />
          <OngoingOffers tableName="slique_offers" />
          <PhotoGallery bucketName="slique" />
          <About />
          <Highlights />
          <Testimonials />
        </div>
      ) : activeCategory === 'experiences' ? (
        <div className="space-y-8 animate-fade-in">
          <Events 
            tableName="slique_events" 
            category="experiences" 
          />
        </div>
      ) : activeCategory === 'menu' ? (
        <div className="animate-fade-in">
          <FlipBook />
        </div>
      ) : activeCategory === 'offers' ? (
        <div className="animate-fade-in">
          <OngoingOffers tableName="slique_offers" />
        </div>
      ) : null}
      
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <BookingDrawer open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
};

export default SliqueIndex;
