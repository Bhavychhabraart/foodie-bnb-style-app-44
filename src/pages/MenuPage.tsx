
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Menu from '@/components/Menu';
import BottomNav from '@/components/BottomNav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState('explore');
  const categories = ['Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Specials'];
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="pb-16">
      <Navbar activeTab="menu" setActiveTab={() => {}} />

      <div className="container-padding mx-auto mt-6">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">Our Menu</h1>
        
        <Tabs defaultValue={categories[0]} className="w-full" 
          onValueChange={(value) => setActiveCategory(value)}>
          <TabsList className="grid w-full grid-cols-5">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <Menu category={category} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default MenuPage;
