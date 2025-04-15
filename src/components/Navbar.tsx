
import React, { useState } from 'react';
import { Menu, User, Instagram, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SupportDrawer from './SupportDrawer';
import InfluencerDrawer from './InfluencerDrawer';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const [isSupportDrawerOpen, setIsSupportDrawerOpen] = useState(false);
  const [isInfluencerDrawerOpen, setIsInfluencerDrawerOpen] = useState(false);
  
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'menu', label: 'Menu' },
    { id: 'photos', label: 'Photos' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'location', label: 'Location' },
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
      <div className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="container-padding mx-auto flex items-center justify-between py-4">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-airbnb-red cursor-pointer" onClick={() => navigate('/')}>Fine Dine</h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`text-sm font-medium ${
                  activeTab === item.id
                    ? 'text-airbnb-dark border-b-2 border-airbnb-red pb-1'
                    : 'text-airbnb-light hover:text-airbnb-dark'
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full p-2">
                  <Menu size={20} className="mr-2 md:hidden" />
                  <User size={20} className="hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                <DropdownMenuItem className="cursor-pointer text-sm">Sign in</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-sm">Sign up</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-sm" onClick={() => handleTabClick('influencer')}>
                  <Instagram className="h-4 w-4 mr-2" /> Influencer
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-sm" onClick={() => handleTabClick('vip')}>
                  <Award className="h-4 w-4 mr-2" /> VIP
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-sm" onClick={() => handleTabClick('support')}>
                  Support
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-sm md:hidden">
                  <Button 
                    variant="airbnb" 
                    className="w-full justify-center mt-2"
                    onClick={() => setActiveTab('booking')}
                  >
                    Reserve a table
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

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

export default Navbar;
