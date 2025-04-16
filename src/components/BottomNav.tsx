
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
      <div className="bottom-nav fixed bottom-0 left-0 right-0 bg-[#000000e6] border-t border-airbnb-gold/20 px-4 py-2 z-50">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          {/* Left side tabs */}
          <div className="flex justify-between items-center flex-1 space-x-4">
            {tabs.slice(0, 2).map((tab) => (
              <button
                key={tab.id}
                className={`flex-1 flex flex-col items-center justify-center ${activeTab === tab.id ? 'text-airbnb-gold' : 'text-white/70'}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <tab.icon className="w-6 h-6" />
              </button>
            ))}
          </div>
          
          {/* Center button */}
          <button
            className="absolute left-1/2 transform -translate-x-1/2 -top-8 bg-airbnb-gold text-white rounded-full p-4 shadow-lg"
            onClick={() => setIsBookingDrawerOpen(true)}
          >
            <CalendarPlus className="h-7 w-7" />
          </button>
          
          {/* Right side tabs */}
          <div className="flex justify-between items-center flex-1 space-x-4">
            {tabs.slice(2).map((tab) => (
              <button
                key={tab.id}
                className={`flex-1 flex flex-col items-center justify-center ${activeTab === tab.id ? 'text-airbnb-gold' : 'text-white/70'}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <tab.icon className="w-6 h-6" />
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
