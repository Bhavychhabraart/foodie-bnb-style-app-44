import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Palette, Link as LinkIcon, Check } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import EditGallery from '@/components/edit-panel/EditGallery';
import EditExperiences from '@/components/edit-panel/EditExperiences';
import EditOffers from '@/components/edit-panel/EditOffers';
import EditSpecials from '@/components/edit-panel/EditSpecials';
import EditTestimonials from '@/components/edit-panel/EditTestimonials';
import EditEvents from '@/components/edit-panel/EditEvents';
import EditAboutContent from '@/components/edit-panel/EditAboutContent';
import EditHighlights from '@/components/edit-panel/EditHighlights';

const colorOptions = [
  { name: 'Red', value: '#FF385C' },
  { name: 'Blue', value: '#0EA5E9' },
  { name: 'Green', value: '#10B981' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Indigo', value: '#6366F1' },
];

const EditPanel: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("gallery");
  const [accentColor, setAccentColor] = useState("#FF385C");
  const { toast } = useToast();
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const savedColor = localStorage.getItem('accentColor');
    if (savedColor) {
      setAccentColor(savedColor);
      document.documentElement.style.setProperty('--primary', convertHexToHSL(savedColor));
    }
  }, []);

  const convertHexToHSL = (hex: string): string => {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let l = (max + min) / 2;
    let s = 0;
    let h = 0;
    if (max !== min) {
      s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
      if (max === r) {
        h = (g - b) / (max - min) + (g < b ? 6 : 0);
      } else if (max === g) {
        h = (b - r) / (max - min) + 2;
      } else {
        h = (r - g) / (max - min) + 4;
      }
      h = h * 60;
    }
    return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  const handleColorChange = (color: string) => {
    setAccentColor(color);
    document.documentElement.style.setProperty('--primary', convertHexToHSL(color));
    localStorage.setItem('accentColor', color);
    toast({
      title: "Color updated",
      description: "The accent color has been updated successfully.",
    });
  };

  const handleShareLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopiedLink(true);
      toast({
        title: "Link Copied",
        description: "Edit panel link copied to clipboard",
      });
      
      setTimeout(() => {
        setCopiedLink(false);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive"
      });
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-4"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Site
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Edit Content Panel</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleShareLink}
              className="flex items-center"
            >
              {copiedLink ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Share Link
                </>
              )}
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm" variant="outline" className="flex items-center">
                  <Palette className="h-4 w-4 mr-2" />
                  <span>Customize Colors</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Color Customization</SheetTitle>
                  <SheetDescription>
                    Choose an accent color for your site. This will affect buttons, links, and highlighted elements.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="color-picker">Custom Color</Label>
                          <div className="flex items-center mt-2 space-x-2">
                            <div 
                              className="w-10 h-10 rounded-md border border-gray-200" 
                              style={{ backgroundColor: accentColor }}
                            />
                            <Input 
                              id="color-picker"
                              type="color" 
                              value={accentColor}
                              onChange={(e) => handleColorChange(e.target.value)}
                              className="w-auto h-10"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label>Predefined Colors</Label>
                          <div className="grid grid-cols-4 gap-2 mt-2">
                            {colorOptions.map((color) => (
                              <button
                                key={color.value}
                                className="w-full p-1 border rounded-md flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
                                onClick={() => handleColorChange(color.value)}
                              >
                                <div 
                                  className="w-6 h-6 rounded-full mb-1" 
                                  style={{ backgroundColor: color.value }}
                                />
                                <span className="text-xs">{color.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <Label>Preview</Label>
                          <div className="mt-2 p-4 border rounded-md space-y-2">
                            <Button style={{ backgroundColor: accentColor }}>Primary Button</Button>
                            <div>
                              <a href="#" className="text-sm font-medium" style={{ color: accentColor }}>
                                This is how links will appear
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </SheetContent>
            </Sheet>
            <Button size="sm" variant="outline" onClick={() => navigate('/')}>Preview Site</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-8 mb-8">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="highlights">Highlights</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
            <TabsTrigger value="offers">Offers</TabsTrigger>
            <TabsTrigger value="specials">Chef's Specials</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about"><EditAboutContent /></TabsContent>
          <TabsContent value="highlights"><EditHighlights /></TabsContent>
          <TabsContent value="gallery"><EditGallery /></TabsContent>
          <TabsContent value="events"><EditEvents /></TabsContent>
          <TabsContent value="experiences"><EditExperiences /></TabsContent>
          <TabsContent value="offers"><EditOffers /></TabsContent>
          <TabsContent value="specials"><EditSpecials /></TabsContent>
          <TabsContent value="testimonials"><EditTestimonials /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default EditPanel;
