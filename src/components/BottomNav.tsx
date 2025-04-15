
import React, { useState } from 'react';
import { CalendarPlus, User, Users, LifeBuoy } from 'lucide-react';
import BookingDrawer from './BookingDrawer';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const [isBookingDrawerOpen, setIsBookingDrawerOpen] = useState(false);
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'support', label: 'Support', icon: LifeBuoy },
  ];

  return (
    <>
      <div className="bottom-nav">
        <div className="flex justify-between items-center relative">
          {/* Left side tabs */}
          <div className="flex space-x-6">
            {tabs.slice(0, 1).map((tab) => (
              <button
                key={tab.id}
                className={`bottom-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className={`bottom-nav-icon ${activeTab === tab.id ? 'text-airbnb-red' : ''}`} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          
          {/* Center button */}
          <button
            className="absolute left-1/2 transform -translate-x-1/2 -top-6 bg-airbnb-red text-white rounded-full p-3 shadow-lg"
            onClick={() => setIsBookingDrawerOpen(true)}
          >
            <CalendarPlus className="h-6 w-6" />
          </button>
          
          {/* Right side tabs */}
          <div className="flex space-x-6">
            {tabs.slice(1).map((tab) => (
              <button
                key={tab.id}
                className={`bottom-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
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
    </>
  );
};

export default BottomNav;
