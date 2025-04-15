
import React from 'react';
import { Search, Heart, Home, Building, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  
  const tabs = [
    { id: 'explore', label: 'Explore', icon: Search, route: '/' },
    { id: 'wishlists', label: 'Wishlists', icon: Heart, route: '/venue-services' },
    { id: 'trips', label: 'Trips', icon: Building, route: '/reservation' },
    { id: 'messages', label: 'Messages', icon: Building, route: '/menu' },
    { id: 'profile', label: 'Profile', icon: User, route: '/admin' },
  ];

  const handleTabClick = (tabId: string, route: string) => {
    setActiveTab(tabId);
    navigate(route);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
      <div className="flex justify-between px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex flex-col items-center justify-center text-xs ${
              activeTab === tab.id ? 'text-red-500' : 'text-gray-500'
            }`}
            onClick={() => handleTabClick(tab.id, tab.route)}
          >
            <tab.icon className={`w-6 h-6 mb-1 ${
              activeTab === tab.id ? 'text-red-500' : 'text-gray-500'
            }`} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
