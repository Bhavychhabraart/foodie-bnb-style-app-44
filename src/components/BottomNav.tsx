
import React, { useState } from 'react';
import { CalendarPlus, User, Instagram, LifeBuoy, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BookingDrawer from './BookingDrawer';
import SupportDrawer from './SupportDrawer';
import InfluencerDrawer from './InfluencerDrawer';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import UserProfile from './UserProfile';
import { useAuth } from '@/providers/AuthProvider';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const [isBookingDrawerOpen, setIsBookingDrawerOpen] = useState(false);
  const [isSupportDrawerOpen, setIsSupportDrawerOpen] = useState(false);
  const [isInfluencerDrawerOpen, setIsInfluencerDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { profile } = useAuth();
  
  const tabs = [
    { id: 'influencer', icon: Instagram },
    { id: 'vip', icon: Award },
    { id: 'booking', icon: CalendarPlus },
    { id: 'support', icon: LifeBuoy },
    { id: 'profile', icon: User },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'support') {
      setIsSupportDrawerOpen(true);
    } else if (tabId === 'influencer') {
      setIsInfluencerDrawerOpen(true);
    } else if (tabId === 'booking') {
      setIsBookingDrawerOpen(true);
    } else if (tabId === 'profile') {
      setIsProfileOpen(true);
    }
  };

  // Get initials for avatar
  const getInitials = () => {
    if (!profile?.full_name) return "G";
    
    return profile.full_name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <>
      <div className="bottom-nav fixed bottom-0 left-0 right-0 bg-[#000000e6] border-t border-airbnb-gold/20 px-4 py-2 z-50">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <div className="flex justify-between items-center w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex-1 flex flex-col items-center justify-center ${
                  activeTab === tab.id ? 'text-airbnb-gold' : 'text-white/70'
                } ${
                  tab.id === 'booking' ? 'relative -mt-6' : ''
                }`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.id === 'booking' ? (
                  <div className="bg-airbnb-gold text-white rounded-full p-4 shadow-lg">
                    <tab.icon className="h-7 w-7" />
                  </div>
                ) : tab.id === 'profile' && profile ? (
                  <Avatar className="h-6 w-6 bg-airbnb-gold text-white">
                    <AvatarFallback className="text-xs">{getInitials()}</AvatarFallback>
                  </Avatar>
                ) : (
                  <tab.icon className="w-6 h-6" />
                )}
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

      <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>User Profile</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            <UserProfile onClose={() => setIsProfileOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default BottomNav;
