
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Booking from '@/components/Booking';
import About from '@/components/About';
import Menu from '@/components/Menu';
import PhotoGallery from '@/components/PhotoGallery';
import Reviews from '@/components/Reviews';
import Location from '@/components/Location';
import BottomNav from '@/components/BottomNav';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = React.useState('about');
  
  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-section');
    bookingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pb-16">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Hero scrollToBooking={scrollToBooking} />
      
      <div className="container-padding mx-auto">
        {activeTab === 'about' && <About />}
        {activeTab === 'menu' && <Menu />}
        {activeTab === 'photos' && <PhotoGallery />}
        {activeTab === 'reviews' && <Reviews />}
        {activeTab === 'location' && <Location />}
      </div>
      
      <Booking id="booking-section" />
      <BottomNav activeTab="explore" setActiveTab={() => {}} />
    </div>
  );
};

export default RestaurantDetailPage;
