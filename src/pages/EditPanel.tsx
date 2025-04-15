
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import EditGallery from '@/components/edit-panel/EditGallery';
import EditExperiences from '@/components/edit-panel/EditExperiences';
import EditOffers from '@/components/edit-panel/EditOffers';
import EditSpecials from '@/components/edit-panel/EditSpecials';
import EditTestimonials from '@/components/edit-panel/EditTestimonials';

const EditPanel: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("gallery");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
          <div>
            <Button size="sm" variant="outline">Preview Site</Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
            <TabsTrigger value="offers">Offers</TabsTrigger>
            <TabsTrigger value="specials">Chef's Specials</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gallery">
            <EditGallery />
          </TabsContent>
          
          <TabsContent value="experiences">
            <EditExperiences />
          </TabsContent>
          
          <TabsContent value="offers">
            <EditOffers />
          </TabsContent>
          
          <TabsContent value="specials">
            <EditSpecials />
          </TabsContent>
          
          <TabsContent value="testimonials">
            <EditTestimonials />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default EditPanel;
