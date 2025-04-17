
import React, { useState } from 'react';
import { Menu, ChevronUp, X, Utensils, Wine, BookOpen } from 'lucide-react';
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

const FlipBook: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('food');

  return (
    <div className="w-full py-12 px-4 bg-airbnb-dark">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-airbnb-light">Our Menus</h2>
          <p className="text-airbnb-gold mt-2 italic">Culinary excellence with every dish and drink</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Food Menu Card */}
          <Card className="w-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-airbnb-gold/20 rounded-2xl group">
            <div className="relative h-80 w-full">
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Fine dining menu"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                <Drawer open={open && activeTab === 'food'} onOpenChange={(o) => {
                  setOpen(o);
                  if (o) setActiveTab('food');
                }}>
                  <DrawerTrigger asChild>
                    <Button 
                      className="bg-airbnb-gold hover:bg-airbnb-gold/90 text-airbnb-dark font-semibold px-6 py-6 rounded-xl flex items-center gap-2 max-w-xs mx-auto backdrop-blur-sm border border-airbnb-gold/50"
                    >
                      <Utensils className="w-5 h-5" />
                      <span>View Food Menu</span>
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="h-[90vh] rounded-t-[20px] border-t-4 border-airbnb-gold bg-airbnb-dark">
                    <div className="flex justify-between items-center px-6 pt-4 pb-2 border-b border-airbnb-gold/20">
                      <h2 className="text-2xl font-semibold text-airbnb-light flex items-center">
                        <BookOpen className="w-6 h-6 mr-2 text-airbnb-gold" />
                        Fine Dining Menu
                      </h2>
                      <DrawerClose asChild>
                        <Button variant="ghost" size="icon" className="rounded-full text-airbnb-light hover:bg-airbnb-gold/20">
                          <X className="h-5 w-5" />
                        </Button>
                      </DrawerClose>
                    </div>
                    <div className="h-[calc(90vh-70px)] w-full px-4 overflow-y-auto">
                      <iframe 
                        src="https://heyzine.com/flip-book/d97986850b.html" 
                        title="Restaurant Food Menu"
                        className="w-full h-[75vh] border-0 rounded-lg shadow-lg mt-4"
                        allow="fullscreen"
                      />
                    </div>
                    <div className="flex justify-center pb-6">
                      <Button 
                        variant="ghost" 
                        className="rounded-full flex items-center gap-1 text-airbnb-gold hover:bg-airbnb-gold/20"
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
            <CardContent className="p-6 text-center bg-zinc-900">
              <div className="flex items-center justify-center gap-2 mb-3 text-airbnb-gold">
                <Utensils className="h-5 w-5" />
                <span className="font-medium">Food Menu</span>
              </div>
              <p className="text-sm text-airbnb-light opacity-80">
                Experience our chef's culinary artistry with exquisite dishes prepared with the finest ingredients
              </p>
            </CardContent>
          </Card>

          {/* Drinks Menu Card */}
          <Card className="w-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-airbnb-gold/20 rounded-2xl group">
            <div className="relative h-80 w-full">
              <img 
                src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1257&q=80"
                alt="Cocktail menu"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                <Drawer open={open && activeTab === 'drinks'} onOpenChange={(o) => {
                  setOpen(o);
                  if (o) setActiveTab('drinks');
                }}>
                  <DrawerTrigger asChild>
                    <Button 
                      className="bg-airbnb-gold hover:bg-airbnb-gold/90 text-airbnb-dark font-semibold px-6 py-6 rounded-xl flex items-center gap-2 max-w-xs mx-auto backdrop-blur-sm border border-airbnb-gold/50"
                    >
                      <Wine className="w-5 h-5" />
                      <span>View Drinks Menu</span>
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="h-[90vh] rounded-t-[20px] border-t-4 border-airbnb-gold bg-airbnb-dark">
                    <div className="flex justify-between items-center px-6 pt-4 pb-2 border-b border-airbnb-gold/20">
                      <h2 className="text-2xl font-semibold text-airbnb-light flex items-center">
                        <Wine className="w-6 h-6 mr-2 text-airbnb-gold" />
                        Drinks & Cocktails
                      </h2>
                      <DrawerClose asChild>
                        <Button variant="ghost" size="icon" className="rounded-full text-airbnb-light hover:bg-airbnb-gold/20">
                          <X className="h-5 w-5" />
                        </Button>
                      </DrawerClose>
                    </div>
                    <div className="h-[calc(90vh-70px)] w-full px-4 overflow-y-auto">
                      <iframe 
                        src="https://heyzine.com/flip-book/63a72633a7.html" 
                        title="Restaurant Drinks Menu"
                        className="w-full h-[75vh] border-0 rounded-lg shadow-lg mt-4"
                        allow="fullscreen"
                      />
                    </div>
                    <div className="flex justify-center pb-6">
                      <Button 
                        variant="ghost" 
                        className="rounded-full flex items-center gap-1 text-airbnb-gold hover:bg-airbnb-gold/20"
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
            <CardContent className="p-6 text-center bg-zinc-900">
              <div className="flex items-center justify-center gap-2 mb-3 text-airbnb-gold">
                <Wine className="h-5 w-5" />
                <span className="font-medium">Drinks Menu</span>
              </div>
              <p className="text-sm text-airbnb-light opacity-80">
                Discover our expert mixologist's signature cocktails, premium spirits, and carefully selected wines
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FlipBook;
