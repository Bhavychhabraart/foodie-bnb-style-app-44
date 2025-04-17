
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
                        src="https://heyzine.com/flip-book/44253fcd19.html" 
                        title="Restaurant Digital Menu"
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
                      <Tabs defaultValue="cocktails" className="w-full mt-6">
                        <TabsList className="grid w-full grid-cols-3 bg-airbnb-dark/50 border border-airbnb-gold/20">
                          <TabsTrigger value="cocktails">Cocktails</TabsTrigger>
                          <TabsTrigger value="wines">Wines</TabsTrigger>
                          <TabsTrigger value="spirits">Spirits</TabsTrigger>
                        </TabsList>
                        <TabsContent value="cocktails" className="pt-6">
                          <div className="space-y-6">
                            {["Signature", "Classics", "Mocktails"].map((category) => (
                              <div key={category} className="mb-8">
                                <h3 className="text-xl font-medium text-airbnb-gold mb-4 border-b border-airbnb-gold/20 pb-2">{category} Cocktails</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {Array.from({length: 4}).map((_, i) => (
                                    <div key={i} className="border-b border-airbnb-gold/10 pb-4">
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <h4 className="text-airbnb-light font-medium">
                                            {category === "Signature" ? [
                                              "Gold Fashioned",
                                              "Velvet Sour",
                                              "Midnight Bloom",
                                              "Amber Spice"
                                            ][i] : category === "Classics" ? [
                                              "Old Fashioned",
                                              "Negroni",
                                              "Whiskey Sour",
                                              "Mojito"
                                            ][i] : [
                                              "Virgin Sunrise",
                                              "Berry Bliss",
                                              "Citrus Fizz",
                                              "Spiced Apple"
                                            ][i]}
                                          </h4>
                                          <p className="text-sm text-gray-400 mt-1">{
                                            category === "Signature" ? [
                                              "Aged whiskey, orange bitters, gold flake",
                                              "Premium gin, egg white, elderflower",
                                              "Vodka, blackberry, lavender syrup",
                                              "Rum, ginger, cardamom, cinnamon"
                                            ][i] : category === "Classics" ? [
                                              "Bourbon, Angostura bitters, sugar",
                                              "Gin, Campari, sweet vermouth",
                                              "Bourbon, lemon juice, simple syrup, egg white",
                                              "White rum, lime, mint, soda"
                                            ][i] : [
                                              "Orange juice, grenadine, soda",
                                              "Mixed berries, lemon, honey",
                                              "Fresh citrus blend, mint, sparkling water",
                                              "Apple juice, cinnamon, star anise"
                                            ][i]
                                          }</p>
                                        </div>
                                        <span className="text-airbnb-gold font-medium">{
                                          category === "Mocktails" ? "₹350" : i % 2 === 0 ? "₹550" : "₹650"
                                        }</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="wines" className="pt-6">
                          <div className="space-y-6">
                            {["Red", "White", "Sparkling"].map((category) => (
                              <div key={category} className="mb-8">
                                <h3 className="text-xl font-medium text-airbnb-gold mb-4 border-b border-airbnb-gold/20 pb-2">{category} Wines</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {Array.from({length: 3}).map((_, i) => (
                                    <div key={i} className="border-b border-airbnb-gold/10 pb-4">
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <h4 className="text-airbnb-light font-medium">
                                            {category === "Red" ? [
                                              "Cabernet Sauvignon",
                                              "Pinot Noir",
                                              "Merlot"
                                            ][i] : category === "White" ? [
                                              "Chardonnay",
                                              "Sauvignon Blanc",
                                              "Pinot Grigio"
                                            ][i] : [
                                              "Champagne Brut",
                                              "Prosecco",
                                              "Rosé Champagne"
                                            ][i]}
                                          </h4>
                                          <p className="text-sm text-gray-400 mt-1">
                                            {category === "Red" ? [
                                              "France, 2016",
                                              "Italy, 2018",
                                              "California, 2017"
                                            ][i] : category === "White" ? [
                                              "California, 2019",
                                              "New Zealand, 2020",
                                              "Italy, 2021"
                                            ][i] : [
                                              "France",
                                              "Italy",
                                              "France"
                                            ][i]}
                                          </p>
                                        </div>
                                        <div className="text-right">
                                          <div className="text-airbnb-gold font-medium">{
                                            i === 0 ? "₹950 / ₹6,500" : i === 1 ? "₹850 / ₹5,500" : "₹750 / ₹4,800"
                                          }</div>
                                          <div className="text-xs text-gray-400">Glass / Bottle</div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="spirits" className="pt-6">
                          <div className="space-y-6">
                            {["Whiskey", "Vodka", "Gin", "Rum"].map((category) => (
                              <div key={category} className="mb-8">
                                <h3 className="text-xl font-medium text-airbnb-gold mb-4 border-b border-airbnb-gold/20 pb-2">{category}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {Array.from({length: 3}).map((_, i) => (
                                    <div key={i} className="border-b border-airbnb-gold/10 pb-4">
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <h4 className="text-airbnb-light font-medium">
                                            {category === "Whiskey" ? [
                                              "Macallan 12",
                                              "Glenfiddich 15",
                                              "Johnnie Walker Blue"
                                            ][i] : category === "Vodka" ? [
                                              "Grey Goose",
                                              "Belvedere",
                                              "Ketel One"
                                            ][i] : category === "Gin" ? [
                                              "Hendrick's",
                                              "Monkey 47",
                                              "Tanqueray"
                                            ][i] : [
                                              "Diplomatico",
                                              "Zacapa XO",
                                              "Plantation XO"
                                            ][i]}
                                          </h4>
                                          <p className="text-sm text-gray-400 mt-1">
                                            {category === "Whiskey" ? [
                                              "Single Malt, Scotland",
                                              "Single Malt, Scotland",
                                              "Blended Scotch"
                                            ][i] : category === "Vodka" ? [
                                              "France",
                                              "Poland",
                                              "Netherlands"
                                            ][i] : category === "Gin" ? [
                                              "Scotland",
                                              "Germany",
                                              "England"
                                            ][i] : [
                                              "Venezuela",
                                              "Guatemala",
                                              "Barbados"
                                            ][i]}
                                          </p>
                                        </div>
                                        <span className="text-airbnb-gold font-medium">{
                                          i === 0 ? "₹850" : i === 1 ? "₹950" : "₹1250"
                                        }</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
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
