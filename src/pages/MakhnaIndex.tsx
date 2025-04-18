
import React, { useState } from 'react';
import CategorySelector from '@/components/CategorySelector';
import Events from '@/components/Events';
import BottomNav from '@/components/BottomNav';
import MarqueeAnnouncement from '@/components/MarqueeAnnouncement';
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
  
  return (
    <div className="pb-16 bg-[#1A1F2C]">
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <ThemeToggle />
      </div>
      
      <MarqueeAnnouncement title="Upcoming at Makhna!" items={upcomingEvents} />
      
      <div className="sticky top-0 z-10 shadow-md shadow-black/30">
        <CategorySelector activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      </div>
      
      <MakhnaHero />
      
      {activeCategory === 'home' ? (
        <div className="space-y-2">
          <Events category="makhna" />
        </div>
      ) : null}
      
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <BookingDrawer open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
};

export default MakhnaIndex;
