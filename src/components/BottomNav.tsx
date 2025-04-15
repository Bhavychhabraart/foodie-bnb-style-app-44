
import React from 'react';
import { Search, Heart, Home, Utensils, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  
  const tabs = [
    { id: 'explore', label: 'Home', icon: Home, route: '/' },
    { id: 'menu', label: 'Menu', icon: Utensils, route: '/menu' },
    { id: 'reservation', label: 'Reserve', icon: Search, route: '/reservation' },
    { id: 'saved', label: 'Saved', icon: Heart, route: '/venue-services' },
    { id: 'profile', label: 'Profile', icon: User, route: '/admin' },
  ];

  const handleTabClick = (tabId: string, route: string) => {
    setActiveTab(tabId);
    navigate(route);
  };

  return (
    <div className="bottom-nav">
      <div className="flex justify-between">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`bottom-nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id, tab.route)}
          >
            <tab.icon className={`bottom-nav-icon ${activeTab === tab.id ? 'text-airbnb-red' : ''}`} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
