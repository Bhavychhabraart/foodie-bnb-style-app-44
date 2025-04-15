
import React from 'react';
import { Menu, Ticket, Tag, Home } from 'lucide-react';

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
      label: 'Experiences',
      icon: Ticket
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
    <div className="container-padding mx-auto mt-4 border-b border-gray-800 pb-3 bg-zinc-900">
      <div className="flex justify-between overflow-x-auto scrollbar-none">
        {categories.map(category => (
          <button 
            key={category.id} 
            className={`category-pill px-4 ${activeCategory === category.id ? 'active text-amber-500 border-amber-500' : 'text-gray-400'}`} 
            onClick={() => setActiveCategory(category.id)}
          >
            <category.icon className="category-icon" />
            <span>{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
