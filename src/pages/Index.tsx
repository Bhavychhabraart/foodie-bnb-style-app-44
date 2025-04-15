
import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Menu from '@/components/Menu';
import PhotoGallery from '@/components/PhotoGallery';
import Reviews from '@/components/Reviews';
import Location from '@/components/Location';
import Booking from '@/components/Booking';
import Footer from '@/components/Footer';

const Index = () => {
  const [activeTab, setActiveTab] = useState('about');
  const bookingRef = useRef<HTMLDivElement>(null);

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveTab('booking');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow">
        <Hero scrollToBooking={scrollToBooking} />
        
        <div className="hidden md:block sticky top-[73px] z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="container-padding mx-auto py-3">
            <div className="flex justify-between items-center">
              <div className="flex space-x-6">
                <button 
                  className={`text-sm py-2 ${activeTab === 'about' ? 'text-airbnb-dark border-b-2 border-airbnb-red font-medium' : 'text-airbnb-light'}`}
                  onClick={() => setActiveTab('about')}
                >
                  About
                </button>
                <button 
                  className={`text-sm py-2 ${activeTab === 'menu' ? 'text-airbnb-dark border-b-2 border-airbnb-red font-medium' : 'text-airbnb-light'}`}
                  onClick={() => setActiveTab('menu')}
                >
                  Menu
                </button>
                <button 
                  className={`text-sm py-2 ${activeTab === 'photos' ? 'text-airbnb-dark border-b-2 border-airbnb-red font-medium' : 'text-airbnb-light'}`}
                  onClick={() => setActiveTab('photos')}
                >
                  Photos
                </button>
                <button 
                  className={`text-sm py-2 ${activeTab === 'reviews' ? 'text-airbnb-dark border-b-2 border-airbnb-red font-medium' : 'text-airbnb-light'}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </button>
                <button 
                  className={`text-sm py-2 ${activeTab === 'location' ? 'text-airbnb-dark border-b-2 border-airbnb-red font-medium' : 'text-airbnb-light'}`}
                  onClick={() => setActiveTab('location')}
                >
                  Location
                </button>
              </div>
              
              <button 
                className="airbnb-button"
                onClick={scrollToBooking}
              >
                Reserve a table
              </button>
            </div>
          </div>
        </div>
        
        <About />
        <Menu />
        <div ref={bookingRef}>
          <Booking id="booking" />
        </div>
        <PhotoGallery />
        <Reviews />
        <Location />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
