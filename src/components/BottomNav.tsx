
import React from 'react';
import { Search, Heart, Home, MessageSquare, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'explore', label: 'Explore', icon: Search },
    { id: 'wishlists', label: 'Wishlists', icon: Heart },
    { id: 'trips', label: 'Experiences', icon: Home },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="bottom-nav">
      <div className="flex justify-between">
        {tabs.map((tab) => (
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
  );
};

export default BottomNav;
