
import React, { useState } from 'react';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Booking from '@/components/Booking';
import CategorySelector from '@/components/CategorySelector';
import Experiences from '@/components/Experiences';
import BottomNav from '@/components/BottomNav';

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('experiences');
  const [activeTab, setActiveTab] = useState('explore');
  
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-section');
    bookingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pb-16">
      <Navbar activeTab="about" setActiveTab={() => {}} />
      <Hero scrollToBooking={scrollToBooking} />
      <CategorySelector 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <Experiences category={activeCategory} />
      <Booking id="booking-section" />
      <BottomNav 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default HomePage;
