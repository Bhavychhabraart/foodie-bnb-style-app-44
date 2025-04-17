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
import BookingDrawer from '@/components/BookingDrawer';
import { Button } from '@/components/ui/button';
import { Calendar, Menu } from 'lucide-react';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('home');
  const [activeTab, setActiveTab] = useState('explore');
  const [bookingOpen, setBookingOpen] = useState(false);
  const upcomingEvents = ["Soulful Sufi Night - 16th April", "Our World with Raja Kikkat - 17th April", "Thursday Gin & Groove - 17th April", "Back to 90s - 18th April", "Bollywood Night - 20th April"];
  
  return <div className="pb-16 bg-airbnb-dark">
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <ThemeToggle />
      </div>
      
      <MarqueeAnnouncement title="Upcoming Events!" items={upcomingEvents} />
      
      <div className="sticky top-0 z-10 shadow-md shadow-black/30">
        <CategorySelector activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      </div>
      
      {activeCategory === 'home' ? <div className="space-y-2 bg-airbnb-dark">
          <Spotlight />
          <Events category="home" />
          <ChefsSpecials setActiveCategory={setActiveCategory} />
          <OngoingOffers />
          <PhotoGallery />
          <About />
          <Highlights />
          <Testimonials />
        </div> : activeCategory === 'experiences' ? (
          <div className="space-y-2 bg-airbnb-dark">
            <Events category="experiences" />
          </div>
        ) : activeCategory === 'menu' ? <div>
          <FlipBook />
        </div> : activeCategory === 'offers' ? <div>
          <OngoingOffers />
        </div> : null}
      
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <BookingDrawer open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>;
};

export default Index;
