
import React, { useState } from 'react';
import { Menu, ChevronRight, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MenuCardProps {
  title?: string;
  description?: string;
}

const MenuCard: React.FC<MenuCardProps> = ({ 
  title = "Fine Dining Menu", 
  description = "Explore our seasonal selections and chef's specialties" 
}) => {
  const [open, setOpen] = useState(false);

  const featuredItems = [
    {
      name: "Truffle Risotto",
      category: "Main Course",
      description: "Arborio rice, wild mushrooms, black truffle"
    },
    {
      name: "Seared Scallops",
      category: "Appetizer",
      description: "Day-boat scallops, cauliflower puree, brown butter"
    },
    {
      name: "Dark Chocolate Soufflé",
      category: "Dessert",
      description: "Warm chocolate soufflé, vanilla bean ice cream"
    }
  ];

  return (
    <Card className="overflow-hidden border shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 bg-gradient-to-r from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2 font-playfair">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
      
      <CardContent className="p-5">
        <div className="mb-4 space-y-3">
          {featuredItems.map((item, index) => (
            <div key={index} className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-800">{item.name}</span>
                  <Badge variant="outline" className="ml-2 text-xs bg-soft-orange bg-opacity-20">
                    {item.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button className="w-full bg-airbnb-red hover:bg-airbnb-red/90 text-white">
              <Menu className="mr-2 h-4 w-4" />
              View Full Menu
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[90vh] rounded-t-[20px] border-t-4 border-airbnb-red">
            <iframe 
              src="https://heyzine.com/flip-book/44253fcd19.html" 
              title="Restaurant Digital Menu"
              className="w-full h-[75vh] border-0 rounded-lg shadow-sm"
              allow="fullscreen"
            />
          </DrawerContent>
        </Drawer>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
