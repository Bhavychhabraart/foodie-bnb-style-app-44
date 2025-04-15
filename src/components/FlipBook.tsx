
import React, { useState } from 'react';
import { Menu, ChevronUp, X } from 'lucide-react';
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
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white py-4 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Fine Dine Menu</h2>
        <p className="text-muted-foreground">Explore our culinary offerings</p>
      </div>
      
      <Card className="w-full max-w-3xl mx-auto shadow-lg bg-soft-orange bg-opacity-20 rounded-xl">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-medium mb-4">Our Digital Menu</h3>
          <p className="mb-6 text-muted-foreground">
            Open our interactive menu to browse through our delicious offerings and daily specials
          </p>
          
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button className="bg-airbnb-red hover:bg-airbnb-red/90 text-white font-medium px-8 py-6 rounded-full flex items-center gap-2">
                <Menu className="w-5 h-5" />
                <span>Open Menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[90vh] rounded-t-[20px] border-t-4 border-airbnb-red">
              <div className="flex justify-between items-center px-6 pt-4 pb-2">
                <h2 className="text-2xl font-semibold">Our Digital Menu</h2>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default FlipBook;
