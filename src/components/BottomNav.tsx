
import React, { useState } from 'react';
import { CalendarPlus, User, Instagram, LifeBuoy, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BookingDrawer from './BookingDrawer';
import SupportDrawer from './SupportDrawer';
import InfluencerDrawer from './InfluencerDrawer';

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
      <div className="bottom-nav">
        <div className="flex justify-between items-center relative px-4">
          {/* Left side tabs */}
          <div className="flex justify-between w-2/5">
            {tabs.slice(0, 2).map((tab) => (
              <button
                key={tab.id}
                className={`bottom-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <tab.icon className={`bottom-nav-icon ${activeTab === tab.id ? 'text-airbnb-red' : ''}`} />
              </button>
            ))}
          </div>
          
          {/* Center button */}
          <button
            className="absolute left-1/2 transform -translate-x-1/2 -top-10 bg-airbnb-red text-white rounded-full p-5 shadow-lg"
            onClick={() => setIsBookingDrawerOpen(true)}
          >
            <CalendarPlus className="h-8 w-8" />
          </button>
          
          {/* Right side tabs */}
          <div className="flex justify-between w-2/5">
            {tabs.slice(2).map((tab) => (
              <button
                key={tab.id}
                className={`bottom-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <tab.icon className={`bottom-nav-icon ${activeTab === tab.id ? 'text-airbnb-red' : ''}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
      
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
