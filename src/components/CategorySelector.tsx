
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
    <div className="container-padding mx-auto mt-4 border-b border-airbnb-darkbrown pb-3 bg-airbnb-darkbrown/90 dark:bg-airbnb-darkbrown">
      <div className="flex justify-between overflow-x-auto scrollbar-none">
        {categories.map(category => (
          <button 
            key={category.id} 
            className={`flex flex-col items-center px-6 py-2 transition-all duration-300 ${
              activeCategory === category.id 
                ? 'text-airbnb-gold border-b-2 border-airbnb-gold -mb-[13px]' 
                : 'text-airbnb-beige hover:text-airbnb-cream'
            }`} 
            onClick={() => setActiveCategory(category.id)}
          >
            <category.icon className={`h-5 w-5 mb-1 ${
              activeCategory === category.id ? 'text-airbnb-gold' : 'text-airbnb-beige'
            }`} />
            <span className="text-xs font-medium">{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
