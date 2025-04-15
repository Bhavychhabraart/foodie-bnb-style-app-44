
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
    { id: 'influencer', label: 'Influencer', icon: Instagram },
    { id: 'vip', label: 'VIP', icon: Award },
    { id: 'support', label: 'Support', icon: LifeBuoy },
    { id: 'profile', label: 'Profile', icon: User },
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
        <div className="flex justify-between items-center relative">
          {/* Left side tabs */}
          <div className="flex space-x-6">
            {tabs.slice(0, 2).map((tab) => (
              <button
                key={tab.id}
                className={`bottom-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <tab.icon className={`bottom-nav-icon ${activeTab === tab.id ? 'text-airbnb-red' : ''}`} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          
          {/* Center button */}
          <button
            className="absolute left-1/2 transform -translate-x-1/2 -top-8 bg-airbnb-red text-white rounded-full p-4 shadow-lg"
            onClick={() => setIsBookingDrawerOpen(true)}
          >
            <CalendarPlus className="h-7 w-7" />
          </button>
          
          {/* Right side tabs */}
          <div className="flex space-x-6">
            {tabs.slice(2).map((tab) => (
              <button
                key={tab.id}
                className={`bottom-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <tab.icon className={`bottom-nav-icon ${activeTab === tab.id ? 'text-airbnb-red' : ''}`} />
                <span>{tab.label}</span>
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
