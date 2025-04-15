
import React from 'react';
import { CalendarPlus, User, Users, LifeBuoy } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'reserve', label: 'Reserve', icon: CalendarPlus },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'support', label: 'Support', icon: LifeBuoy },
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
