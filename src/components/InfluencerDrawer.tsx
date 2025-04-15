
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
import { Instagram, Camera, CheckCircle, User, Mail, MessageSquare } from 'lucide-react';
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const [step, setStep] = useState(1);
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
    setStep(1);
    setSubmitted(false);
    onOpenChange(false);
  };

  const nextStep = () => {
    let canProceed = false;
    
    if (step === 1) {
      const nameValue = form.getValues('name');
      const emailValue = form.getValues('email');
      
      if (nameValue && emailValue) {
        canProceed = true;
      } else {
        toast({
          title: "Missing information",
          description: "Please fill in all fields before proceeding.",
          variant: "destructive"
        });
      }
    } else if (step === 2) {
      const instagramValue = form.getValues('instagram');
      const followersValue = form.getValues('followers');
      
      if (instagramValue && followersValue) {
        canProceed = true;
      } else {
        toast({
          title: "Missing information",
          description: "Please fill in all fields before proceeding.",
          variant: "destructive"
        });
      }
    }
    
    if (canProceed) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-6">
        <div className="flex items-center space-x-2">
          {[1, 2, 3].map((i) => (
            <React.Fragment key={i}>
              <div 
                className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                  i === step 
                    ? 'bg-airbnb-red text-white' 
                    : i < step 
                      ? 'bg-green-100 text-green-600 border border-green-200' 
                      : 'bg-gray-100 text-gray-400'
                }`}
              >
                {i < step ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <span>{i}</span>
                )}
              </div>
              {i < 3 && (
                <div 
                  className={`h-1 w-10 ${
                    i < step ? 'bg-green-400' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    if (submitted) {
      return (
        <div className="p-4 flex flex-col items-center text-center space-y-6">
          <div className="bg-green-100 p-6 rounded-full">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Thank You!</h3>
            <p className="text-gray-600">
              We've received your application and our team will get in touch with you shortly.
              We'll review your Instagram profile and discuss potential collaboration opportunities.
            </p>
          </div>
          <Button onClick={resetAndClose} variant="outline" className="mt-4">
            Close
          </Button>
        </div>
      );
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="John Doe" className="pl-10" {...field} />
                      </div>
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
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="your@email.com" type="email" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Instagram Details</h3>
              
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
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Additional Information</h3>
              
              <Card className="bg-amber-50 p-4 border-none mb-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Instagram className="h-5 w-5 text-amber-600" />
                  <h3 className="font-medium text-amber-800">Almost there!</h3>
                </div>
                <p className="text-sm text-amber-700">
                  Tell us about your content style and what type of collaboration you're interested in.
                </p>
              </Card>
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          placeholder="Tell us about your content style and why you'd like to collaborate..." 
                          {...field} 
                          className="min-h-[100px] pt-3 pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          
          <DrawerFooter className="px-0 flex-row space-x-2 pt-6">
            {step > 1 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
                className="flex-1"
              >
                Back
              </Button>
            )}
            
            {step < 3 ? (
              <Button 
                type="button" 
                onClick={nextStep}
                className="flex-1 bg-airbnb-red hover:bg-airbnb-red/90"
              >
                Next Step
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="flex-1 bg-airbnb-red hover:bg-airbnb-red/90"
              >
                Submit Application
              </Button>
            )}
          </DrawerFooter>
        </form>
      </Form>
    );
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

          <div className="p-4">
            {!submitted && renderStepIndicator()}
            
            {step === 1 && !submitted && (
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
            )}

            {renderStepContent()}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default InfluencerDrawer;
