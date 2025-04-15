
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
import MarqueeAnnouncement from '@/components/MarqueeAnnouncement';
import About from '@/components/About';
import Spotlight from '@/components/Spotlight';
import FadeInSection from '@/components/FadeInSection';
import { motion } from 'framer-motion';

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
    <motion.div 
      className="pb-16 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <MarqueeAnnouncement 
        title="New Summer Desserts!" 
        items={summerDesserts} 
      />
      
      <motion.div 
        className="sticky top-0 z-10 bg-white shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <CategorySelector 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </motion.div>
      
      {activeCategory === 'home' ? (
        <div className="space-y-2">
          <FadeInSection delay={0.1}>
            <Experiences category="home" />
          </FadeInSection>
          
          <FadeInSection delay={0.2} direction="right">
            <Spotlight />
          </FadeInSection>
          
          <FadeInSection delay={0.3} direction="left">
            <ChefsSpecials />
          </FadeInSection>
          
          <FadeInSection delay={0.4}>
            <OngoingOffers />
          </FadeInSection>
          
          <FadeInSection delay={0.5} direction="right">
            <PhotoGallery />
          </FadeInSection>
          
          <About />
          
          <FadeInSection delay={0.2} direction="left">
            <Highlights />
          </FadeInSection>
          
          <FadeInSection delay={0.3}>
            <Testimonials />
          </FadeInSection>
        </div>
      ) : activeCategory === 'experiences' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Experiences category="experiences" />
        </motion.div>
      ) : activeCategory === 'menu' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FlipBook />
        </motion.div>
      ) : activeCategory === 'offers' ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <OngoingOffers />
        </motion.div>
      ) : null}
      
      <BottomNav 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </motion.div>
  );
};

export default Index;
