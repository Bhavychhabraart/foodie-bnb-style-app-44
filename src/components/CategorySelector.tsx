
import React from 'react';
import { Menu, Calendar, Tag, Home, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";
interface CategoryProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}
const CategorySelector: React.FC<CategoryProps> = ({
  activeCategory,
  setActiveCategory
}) => {
  const categories = [{
    id: 'home',
    label: 'Home',
    icon: Home
  }, {
    id: 'experiences',
    label: 'Upcoming',
    icon: Calendar
  }, {
    id: 'menu',
    label: 'Menu',
    icon: Menu
  }, {
    id: 'offers',
    label: 'Offers',
    icon: Tag
  }];
  return <div className="bg-gradient-to-b from-airbnb-dark to-airbnb-dark shadow-lg shadow-black/20">
      <div className="container-padding mx-auto border-b border-airbnb-gold/20 pb-2">
        <div className="flex justify-between overflow-x-auto scrollbar-none">
          {categories.map(category => <button key={category.id} className={cn("flex flex-col items-center px-6 py-3 transition-all duration-300 relative", activeCategory === category.id ? "text-airbnb-gold" : "text-airbnb-light hover:text-airbnb-light/90")} onClick={() => setActiveCategory(category.id)}>
              <div className="flex items-center justify-center">
                <category.icon className={cn("h-5 w-5 mb-1", activeCategory === category.id ? "text-airbnb-gold" : "text-airbnb-light")} />
              </div>
              <span className="text-xs font-medium">{category.label}</span>
              {activeCategory === category.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-airbnb-gold/50 via-airbnb-gold to-airbnb-gold/50 rounded-full" />}
            </button>)}
        </div>
      </div>
    </div>;
};
export default CategorySelector;
