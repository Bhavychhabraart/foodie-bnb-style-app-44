
import React from 'react';
import { Search, Home, Map, Heart, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  
  const navItems = [
    { id: 'explore', label: 'Explore', icon: Search, path: '/' },
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'locations', label: 'Locations', icon: Map, path: '/' },
    { id: 'saved', label: 'Saved', icon: Heart, path: '/' },
    { id: 'profile', label: 'Profile', icon: User, path: '/' },
  ];

  const handleTabClick = (tab: string, path: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  return (
    <div className="bottom-nav grid grid-cols-5 gap-2 z-40">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`bottom-nav-item ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => handleTabClick(item.id, item.path)}
        >
          <item.icon className="bottom-nav-icon" />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
