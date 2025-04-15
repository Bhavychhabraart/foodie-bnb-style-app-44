
import React from 'react';
import { Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'menu', label: 'Menu' },
    { id: 'photos', label: 'Photos' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'location', label: 'Location' },
  ];

  return (
    <div className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container-padding mx-auto flex items-center justify-between py-4">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-airbnb-red">Fine Dine</h1>
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
              <DropdownMenuItem className="cursor-pointer text-sm">Contact us</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-sm md:hidden">
                <Button 
                  variant="ghost" 
                  className="airbnb-button w-full justify-center mt-2"
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
  );
};

export default Navbar;
