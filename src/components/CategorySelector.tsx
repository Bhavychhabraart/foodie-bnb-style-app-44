
import React from 'react';
import { Ticket, Home, TreePine, Castle, SearchX } from 'lucide-react';

interface CategoryProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategoryProps> = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: 'experiences', label: 'Icons', icon: Ticket },
    { id: 'countryside', label: 'Countryside', icon: Home },
    { id: 'treehouses', label: 'Treehouses', icon: TreePine },
    { id: 'mansions', label: 'Mansions', icon: Castle },
    { id: 'tiny-homes', label: 'Tiny home', icon: SearchX },
  ];

  return (
    <div className="px-4 py-4 border-b border-gray-200">
      <div className="flex justify-between overflow-x-auto scrollbar-none">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`flex flex-col items-center justify-center px-4 ${
              activeCategory === category.id 
                ? 'border-b-2 border-black text-black' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            <category.icon className="w-6 h-6 mb-1" />
            <span className="text-xs whitespace-nowrap">{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
