
import React, { useState } from 'react';
import { Menu, ChevronUp, X, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';

const FlipBook: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold">Our Menu</h2>
          <p className="text-airbnb-light mt-2">Explore our delicious offerings</p>
        </div>
        
        <Card className="w-full max-w-2xl mx-auto overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 rounded-xl">
          <div className="relative h-72 w-full">
            <img 
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Restaurant menu"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
              <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                  <Button className="bg-white text-airbnb-dark hover:bg-white/90 font-medium px-8 py-6 rounded-full flex items-center gap-2 max-w-xs mx-auto">
                    <Menu className="w-5 h-5" />
                    <span>Open Menu</span>
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
                    <div className="pb-4 h-full w-full">
                      <iframe 
                        src="https://heyzine.com/flip-book/44253fcd19.html" 
                        title="Restaurant Digital Menu"
                        className="w-full h-[75vh] border-0 rounded-lg shadow-sm"
                        allow="fullscreen"
                      />
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
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-3 text-airbnb-light">
              <Utensils className="h-4 w-4" />
              <span>Complete dining options</span>
            </div>
            <p className="text-sm text-airbnb-light">
              Browse our full menu including appetizers, main courses, desserts, and drinks
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FlipBook;
