
import React, { useState } from 'react';
import { Menu as MenuIcon, ChevronUp, X, Share, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import ExperienceCard from './ExperienceCard';

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
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const filteredItems = activeTab === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeTab);

  return (
    <div className="container-padding section-padding">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-2xl">Our Menu</h2>
        <button className="flex items-center text-airbnb-red hover:underline text-xs text-left">
          <span className="mr-1">View all</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="relative">
        <ExperienceCard
          imageUrl="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          title="Fine Dining Menu"
          host="Explore our curated selection of dishes"
          price="View our full menu"
          rating={4.9}
          reviews={120}
        />
        
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button className="absolute bottom-4 left-0 right-0 mx-auto w-4/5 bg-airbnb-red hover:bg-airbnb-red/90 text-white">
              <MenuIcon className="mr-2 h-4 w-4" />
              Open Menu
            </Button>
          </DrawerTrigger>
          
          <DrawerContent className="h-[90vh] rounded-t-[20px] border-t-4 border-airbnb-red">
            <div className="flex justify-between items-center px-6 pt-4 pb-2">
              <h2 className="text-2xl font-semibold">Fine Dining Menu</h2>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </DrawerClose>
            </div>
            
            <ScrollArea className="h-[calc(90vh-70px)] w-full px-4">
              <div className="pb-8 px-2">
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="bg-white border border-gray-200 p-1 mb-6 w-full grid grid-cols-4">
                    <TabsTrigger value="all" className="text-sm">All Items</TabsTrigger>
                    <TabsTrigger value="starters" className="text-sm">Starters</TabsTrigger>
                    <TabsTrigger value="mains" className="text-sm">Mains</TabsTrigger>
                    <TabsTrigger value="desserts" className="text-sm">Desserts</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={activeTab} className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {filteredItems.map((item) => (
                        <Card key={item.id} className="overflow-hidden border-none shadow-md">
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
                              <span className="font-medium text-airbnb-red">{item.price}</span>
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
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>
            
            <div className="flex justify-center pb-6">
              <Button 
                variant="ghost" 
                className="rounded-full flex items-center gap-1 text-airbnb-red"
                onClick={() => setOpen(false)}
              >
                <ChevronUp className="h-5 w-5" />
                <span>Close</span>
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default Menu;
