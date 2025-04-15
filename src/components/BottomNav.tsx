
import React, { useState } from 'react';
import { CalendarPlus, User, Instagram, LifeBuoy, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BookingDrawer from './BookingDrawer';
import SupportDrawer from './SupportDrawer';
import InfluencerDrawer from './InfluencerDrawer';
import { motion } from 'framer-motion';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const [isBookingDrawerOpen, setIsBookingDrawerOpen] = useState(false);
  const [isSupportDrawerOpen, setIsSupportDrawerOpen] = useState(false);
  const [isInfluencerDrawerOpen, setIsInfluencerDrawerOpen] = useState(false);
  const navigate = useNavigate();
  
  const tabs = [
    { id: 'influencer', icon: Instagram },
    { id: 'vip', icon: Award },
    { id: 'support', icon: LifeBuoy },
    { id: 'profile', icon: User },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'support') {
      setIsSupportDrawerOpen(true);
    } else if (tabId === 'influencer') {
      setIsInfluencerDrawerOpen(true);
    }
  };

  return (
    <>
      <motion.div 
        className="bottom-nav"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-between items-center relative">
          {/* Left side tabs */}
          <div className="flex justify-evenly w-5/12">
            {tabs.slice(0, 2).map((tab) => (
              <motion.button
                key={tab.id}
                className={`bottom-nav-item ${activeTab === tab.id ? 'text-airbnb-red' : ''}`}
                onClick={() => handleTabClick(tab.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <tab.icon className={`bottom-nav-icon w-8 h-8 ${activeTab === tab.id ? 'text-airbnb-red' : ''}`} />
                {activeTab === tab.id && (
                  <motion.div 
                    className="absolute bottom-0 w-6 h-1 bg-airbnb-red rounded-full" 
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
          
          {/* Center button */}
          <motion.button
            className="absolute left-1/2 transform -translate-x-1/2 -top-10 bg-airbnb-red text-white rounded-full p-5 shadow-lg"
            onClick={() => setIsBookingDrawerOpen(true)}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
          >
            <CalendarPlus className="h-8 w-8" />
          </motion.button>
          
          {/* Right side tabs */}
          <div className="flex justify-evenly w-5/12">
            {tabs.slice(2).map((tab) => (
              <motion.button
                key={tab.id}
                className={`bottom-nav-item ${activeTab === tab.id ? 'text-airbnb-red' : ''}`}
                onClick={() => handleTabClick(tab.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <tab.icon className={`bottom-nav-icon w-8 h-8 ${activeTab === tab.id ? 'text-airbnb-red' : ''}`} />
                {activeTab === tab.id && (
                  <motion.div 
                    className="absolute bottom-0 w-6 h-1 bg-airbnb-red rounded-full" 
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
      
      <BookingDrawer 
        open={isBookingDrawerOpen} 
        onOpenChange={setIsBookingDrawerOpen} 
      />

      <SupportDrawer
        open={isSupportDrawerOpen}
        onOpenChange={setIsSupportDrawerOpen}
      />

      <InfluencerDrawer
        open={isInfluencerDrawerOpen}
        onOpenChange={setIsInfluencerDrawerOpen}
      />
    </>
  );
};

export default BottomNav;
