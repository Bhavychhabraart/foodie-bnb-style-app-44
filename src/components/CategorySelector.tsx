
import React from 'react';
import { Menu, Calendar, Tag, Home } from 'lucide-react';

interface CategoryProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategoryProps> = ({
  activeCategory,
  setActiveCategory
}) => {
  const categories = [
    {
      id: 'home',
      label: 'Home',
      icon: Home
    }, 
    {
      id: 'experiences',
      label: 'Events',
      icon: Calendar
    }, 
    {
      id: 'menu',
      label: 'Menu',
      icon: Menu
    }, 
    {
      id: 'offers',
      label: 'Offers',
      icon: Tag
    }
  ];
  
  return (
    <div className="container-padding mx-auto mt-4 border-b border-zinc-800 pb-3 bg-zinc-900">
      <div className="flex justify-between overflow-x-auto scrollbar-none">
        {categories.map(category => (
          <button 
            key={category.id} 
            className={`flex flex-col items-center px-6 py-2 transition-all duration-300 ${
              activeCategory === category.id 
                ? 'text-airbnb-purple border-b-2 border-airbnb-purple -mb-[13px]' 
                : 'text-gray-400 hover:text-gray-300'
            }`} 
            onClick={() => setActiveCategory(category.id)}
          >
            <category.icon className={`h-5 w-5 mb-1 ${
              activeCategory === category.id ? 'text-airbnb-purple' : 'text-gray-500'
            }`} />
            <span className="text-xs font-medium">{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
