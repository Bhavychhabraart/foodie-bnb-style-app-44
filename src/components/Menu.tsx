
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  dietary?: string[];
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Truffle Risotto",
    description: "Creamy arborio rice with wild mushrooms, finished with black truffle and aged parmesan",
    price: "$32",
    image: "https://images.unsplash.com/photo-1673814521703-8238645d2bd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "mains",
    dietary: ["vegetarian"]
  },
  {
    id: 2,
    name: "Seared Scallops",
    description: "Day-boat scallops with cauliflower puree, brown butter and micro herbs",
    price: "$38",
    image: "https://images.unsplash.com/photo-1532980579593-659bb4e3250a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "mains"
  },
  {
    id: 3,
    name: "Burrata Salad",
    description: "Fresh burrata cheese with heirloom tomatoes, basil oil and aged balsamic",
    price: "$24",
    image: "https://images.unsplash.com/photo-1505575967455-40e256f73376?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80",
    category: "starters",
    dietary: ["vegetarian"]
  },
  {
    id: 4,
    name: "Beef Tenderloin",
    description: "Grass-fed beef with truffle mash, seasonal vegetables and red wine jus",
    price: "$56",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    category: "mains"
  },
  {
    id: 5,
    name: "Dark Chocolate Soufflé",
    description: "Warm chocolate soufflé with vanilla bean ice cream",
    price: "$18",
    image: "https://images.unsplash.com/photo-1611329695518-1763fc1593c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "desserts",
    dietary: ["vegetarian"]
  },
  {
    id: 6,
    name: "Tuna Tartare",
    description: "Line-caught tuna with avocado, citrus, and crispy wonton",
    price: "$26",
    image: "https://images.unsplash.com/photo-1626082936841-433184f4d1ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    category: "starters"
  }
];

const Menu: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems = activeTab === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeTab);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div id="menu" className="section-padding bg-white">
      <div className="container-padding mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Our Menu</h2>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border border-gray-200 p-1 mb-6 w-full">
            <TabsTrigger value="all" className="text-sm">All Items</TabsTrigger>
            <TabsTrigger value="starters" className="text-sm">Starters</TabsTrigger>
            <TabsTrigger value="mains" className="text-sm">Mains</TabsTrigger>
            <TabsTrigger value="desserts" className="text-sm">Desserts</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredItems.map((item) => (
                <motion.div key={item.id} variants={item}>
                  <Card 
                    className="airbnb-card bg-white h-full hover:shadow-md cursor-pointer transition-all duration-300"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{item.name}</h3>
                        <span className="font-medium text-airbnb-dark">{item.price}</span>
                      </div>
                      <p className="text-airbnb-light text-sm mb-3">{item.description}</p>
                      {item.dietary && (
                        <div className="flex flex-wrap gap-2">
                          {item.dietary.map((diet) => (
                            <Badge key={diet} variant="outline" className="text-xs capitalize">
                              {diet}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Menu;
