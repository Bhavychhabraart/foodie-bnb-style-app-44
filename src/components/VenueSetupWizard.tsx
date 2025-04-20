
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/providers/AuthProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditAboutContent from "@/components/edit-panel/EditAboutContent";

// Add interface for venue
interface Venue {
  id: string;
  name: string;
  slug: string;
  description?: string;
  address: string;
  website?: string;
  contact_email: string;
  contact_phone: string;
  owner_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const VenueSetupWizard: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeStep, setActiveStep] = useState("about");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFinish = async () => {
    setIsLoading(true);
    try {
      // Update venue status to completed
      // Explicitly type updateData to include `setup_completed`
      const updateData: { setup_completed: boolean } = { setup_completed: true };
      await supabase
        .from("venues")
        .update(updateData)
        .eq("slug", slug);
      
      toast({ 
        title: "Setup Complete", 
        description: "Your venue is now ready! You can now access your admin panel." 
      });
      
      navigate(`/venues/${slug}/admin`);
    } catch (error: any) {
      console.error("Error completing setup:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to complete setup",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Set Up Your Venue</CardTitle>
          <CardDescription>
            Complete the following steps to set up your venue's website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="about" value={activeStep} onValueChange={setActiveStep}>
            <TabsList className="grid grid-cols-4 w-full mb-8">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="highlights">Highlights</TabsTrigger>
              <TabsTrigger value="menu">Menu & Specials</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="space-y-4">
              <h3 className="text-xl font-medium">About Your Venue</h3>
              <p className="text-muted-foreground mb-4">
                Add information about your venue, its history, and what makes it special.
              </p>
              <EditAboutContent venueSlug={slug} />
              <div className="flex justify-end mt-4">
                <Button onClick={() => setActiveStep("highlights")}>
                  Next: Highlights
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="highlights" className="space-y-4">
              <h3 className="text-xl font-medium">Venue Highlights</h3>
              <p className="text-muted-foreground mb-4">
                Add key highlights and features of your venue.
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 h-64 rounded flex items-center justify-center">
                <p className="text-gray-500">Highlights editor will go here</p>
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={() => setActiveStep("about")}>
                  Back
                </Button>
                <Button onClick={() => setActiveStep("menu")}>
                  Next: Menu & Specials
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="menu" className="space-y-4">
              <h3 className="text-xl font-medium">Menu & Chef's Specials</h3>
              <p className="text-muted-foreground mb-4">
                Add your menu items and chef's specials.
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 h-64 rounded flex items-center justify-center">
                <p className="text-gray-500">Menu editor will go here</p>
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={() => setActiveStep("highlights")}>
                  Back
                </Button>
                <Button onClick={() => setActiveStep("events")}>
                  Next: Events
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="events" className="space-y-4">
              <h3 className="text-xl font-medium">Events & Experiences</h3>
              <p className="text-muted-foreground mb-4">
                Add upcoming events and experiences at your venue.
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 h-64 rounded flex items-center justify-center">
                <p className="text-gray-500">Events editor will go here</p>
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={() => setActiveStep("menu")}>
                  Back
                </Button>
                <Button onClick={handleFinish} disabled={isLoading}>
                  {isLoading ? "Finishing..." : "Finish Setup"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default VenueSetupWizard;
