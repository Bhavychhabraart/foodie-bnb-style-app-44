
import React, { useState, useEffect } from 'react';
import { Menu, User, Instagram, Award, LogOut } from 'lucide-react';
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
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/providers/AuthProvider';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import UserProfile from './UserProfile';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile } = useAuth();
  const [isSupportDrawerOpen, setIsSupportDrawerOpen] = useState(false);
  const [isInfluencerDrawerOpen, setIsInfluencerDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
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
    } else if (tabId === 'profile') {
      setIsProfileOpen(true);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Sign Out Failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out",
      });
    }
  };

  // Get initials for profile button
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
      <div className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="container-padding mx-auto flex items-center justify-between py-4">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-airbnb-red cursor-pointer" onClick={() => navigate('/')}>Hacha</h1>
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
                <Button variant="outline" className={`rounded-full ${profile ? 'bg-airbnb-gold text-white hover:bg-airbnb-gold/90 border-airbnb-gold' : ''} p-2`}>
                  {profile ? (
                    <span className="font-medium">{getInitials()}</span>
                  ) : (
                    <>
                      <Menu size={20} className="mr-2 md:hidden" />
                      <User size={20} className="hidden md:block" />
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                {profile ? (
                  <>
                    <DropdownMenuItem className="cursor-default text-sm font-medium">
                      {profile.full_name}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-sm" onClick={() => handleTabClick('profile')}>
                      <User className="h-4 w-4 mr-2" /> View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-sm" onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" /> Sign out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem className="cursor-pointer text-sm" onClick={() => navigate('/auth')}>
                      Sign in / Sign up
                    </DropdownMenuItem>
                  </>
                )}
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

export default Navbar;
