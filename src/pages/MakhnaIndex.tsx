
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
import MakhnaHero from '@/components/makhna/MakhnaHero';

const MakhnaIndex = () => {
  const [activeCategory, setActiveCategory] = useState('home');
  const [activeTab, setActiveTab] = useState('explore');
  const [bookingOpen, setBookingOpen] = useState(false);
  const upcomingEvents = [
    "Live Music Night - Every Thursday",
    "Weekend Special Buffet",
    "Cultural Dance Evening - Saturdays"
  ];
  
  useEffect(() => {
    // Listen for custom category change events
    const handleCategoryChange = (event: CustomEvent) => {
      setActiveCategory(event.detail);
    };

    // Add event listener
    window.document.addEventListener(
      "category-change",
      handleCategoryChange as EventListener
    );

    // Cleanup
    return () => {
      window.document.removeEventListener(
        "category-change",
        handleCategoryChange as EventListener
      );
    };
  }, []);
  
  return (
    <div className="pb-16 bg-airbnb-dark">
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <ThemeToggle />
      </div>
      
      <MarqueeAnnouncement title="Upcoming at Makhna!" items={upcomingEvents} />
      
      <div className="sticky top-0 z-10 shadow-md shadow-black/30">
        <CategorySelector activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      </div>
      
      <MakhnaHero />
      
      {activeCategory === 'home' ? (
        <div className="space-y-2 bg-airbnb-dark">
          <Spotlight tableName="makhna_spotlight" />
          <Events tableName="makhna_events" />
          <ChefsSpecials tableName="makhna_chefs_specials" setActiveCategory={setActiveCategory} />
          <OngoingOffers tableName="makhna_offers" />
          <PhotoGallery bucketName="makhna" />
          <About />
          <Highlights />
          <Testimonials />
        </div>
      ) : activeCategory === 'experiences' ? (
        <div className="space-y-2 bg-airbnb-dark">
          <Events tableName="makhna_events" category="experiences" />
        </div>
      ) : activeCategory === 'menu' ? (
        <div>
          <FlipBook />
        </div>
      ) : activeCategory === 'offers' ? (
        <div>
          <OngoingOffers tableName="makhna_offers" />
        </div>
      ) : null}
      
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <BookingDrawer open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
};

export default MakhnaIndex;
