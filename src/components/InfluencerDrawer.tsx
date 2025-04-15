
import React, { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Instagram, Camera, CheckCircle } from 'lucide-react';
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

interface InfluencerDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormValues {
  name: string;
  email: string;
  instagram: string;
  followers: string;
  message: string;
}

const InfluencerDrawer: React.FC<InfluencerDrawerProps> = ({ open, onOpenChange }) => {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      instagram: '',
      followers: '',
      message: ''
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log('Instagram influencer application submitted:', data);
    setSubmitted(true);
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you soon.",
    });
  };

  const resetAndClose = () => {
    form.reset();
    setSubmitted(false);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] overflow-y-auto">
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle className="text-xl flex items-center gap-2">
              <Instagram className="h-5 w-5 text-airbnb-red" />
              Instagram Collaboration
            </DrawerTitle>
            <DrawerDescription>
              Join our exclusive network of food influencers and create amazing content with us
            </DrawerDescription>
          </DrawerHeader>

          {!submitted ? (
            <div className="p-4">
              <div className="mb-6">
                <Card className="bg-soft-purple p-4 border-none">
                  <div className="flex items-center space-x-3 mb-3">
                    <Instagram className="h-6 w-6 text-purple-500" />
                    <h3 className="font-medium">Why collaborate with us?</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Exclusive food tasting events</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Complimentary dishes for content creation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Featured stories on our social media</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Collaborate with our chefs for unique content</span>
                    </li>
                  </ul>
                </Card>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram Handle</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input placeholder="@yourhandle" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="followers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Followers Count</FormLabel>
                        <FormControl>
                          <Input placeholder="10000" {...field} />
                        </FormControl>
                        <FormDescription>
                          Approximate number of followers
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Tell us about your content style and why you'd like to collaborate..." 
                            {...field} 
                            className="min-h-[80px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DrawerFooter className="px-0">
                    <Button type="submit" className="w-full bg-airbnb-red hover:bg-airbnb-red/90">
                      Submit Application
                    </Button>
                  </DrawerFooter>
                </form>
              </Form>
            </div>
          ) : (
            <div className="p-4 flex flex-col items-center text-center space-y-6">
              <div className="bg-soft-green p-6 rounded-full">
                <Camera className="h-12 w-12 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  We've received your application and will review it shortly. 
                  Our team will contact you within 2-3 business days.
                </p>
              </div>
              <Button onClick={resetAndClose} variant="outline" className="mt-4">
                Close
              </Button>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default InfluencerDrawer;
