import React, { useState } from 'react';
import { ChevronRight, Calendar, ArrowRight, ArrowLeft, User, Phone, Mail, AlertCircle } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselDots } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from 'date-fns';
import { useToast } from "@/components/ui/use-toast";
import BookingConfirmation from './BookingConfirmation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface Experience {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
  price: string;
}

const upcomingExperiences = [{
  id: 1,
  title: "Farm to Table Dinner",
  date: "May 25, 2025",
  imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  price: "₹3,200 per person"
}, {
  id: 2,
  title: "Wine Tasting Evening",
  date: "June 3, 2025",
  imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  price: "₹1,800 per person"
}, {
  id: 3,
  title: "Pasta Making Class",
  date: "June 12, 2025",
  imageUrl: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80",
  price: "₹2,500 per person"
}];

const timeSlots = ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM"];

const formSchema = z.object({
  time: z.string().min(1, {
    message: "Please select a time"
  }),
  guests: z.string().min(1, {
    message: "Please select number of guests"
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters"
  }),
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number"
  }),
  specialRequests: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const UpcomingExperiences: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    toast
  } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      time: "",
      guests: "2",
      name: "",
      email: "",
      phone: "",
      specialRequests: ""
    },
    mode: "onChange"
  });

  const handleBookNow = (experience: Experience) => {
    setSelectedExperience(experience);
    setBookingStep(1);
    setBookingComplete(false);
    form.reset({
      time: "",
      guests: "2",
      name: "",
      email: "",
      phone: "",
      specialRequests: ""
    });
    setDrawerOpen(true);
  };

  const onSubmit = (values: FormValues) => {
    console.log("Form submitted with values:", values);
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
    } else {
      console.log("Booking complete!");
      setBookingComplete(true);
    }
  };

  const handleManualContinue = () => {
    console.log("Manual continue button clicked");
    const currentStepFields: Record<number, string[]> = {
      1: ["time", "guests"],
      2: ["name", "email", "phone"],
      3: []
    };

    const fieldsToValidate = currentStepFields[bookingStep] || [];

    form.trigger(fieldsToValidate as any).then(isValid => {
      console.log("Form validation result:", isValid);
      if (isValid) {
        if (bookingStep < 3) {
          setBookingStep(bookingStep + 1);
        } else {
          form.handleSubmit(onSubmit)();
        }
      }
    });
  };

  const handlePrevious = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1);
    }
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => {
      setBookingStep(1);
      setBookingComplete(false);
    }, 300);
  };

  const renderStepIndicator = () => {
    return <div className="flex items-center justify-center space-x-2 mb-6">
        {[1, 2, 3].map(step => <div key={step} className={`w-2.5 h-2.5 rounded-full ${step === bookingStep ? 'bg-airbnb-red' : step < bookingStep ? 'bg-gray-400' : 'bg-gray-200'}`} />)}
      </div>;
  };

  const renderBookingStepContent = () => {
    if (bookingComplete) {
      return <BookingConfirmation experienceTitle={selectedExperience?.title || ""} date={selectedExperience?.date || ""} time={form.getValues("time")} guests={form.getValues("guests")} onClose={handleCloseDrawer} />;
    }
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 px-6">
          {renderStepIndicator()}
          
          {bookingStep === 1 && <div className="space-y-4">
              <h3 className="text-lg font-medium mb-3">Choose your preferences</h3>
              
              <FormField control={form.control} name="time" render={({
            field
          }) => <FormItem>
                    <FormLabel>Select Time</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map(slot => <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="guests" render={({
            field
          }) => <FormItem>
                    <FormLabel>Number of Guests</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'guest' : 'guests'}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>} />
            </div>}
          
          {bookingStep === 2 && <div className="space-y-4">
              <h3 className="text-lg font-medium mb-3">Personal Details</h3>
              
              <FormField control={form.control} name="name" render={({
            field
          }) => <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input {...field} placeholder="Your full name" className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="email" render={({
            field
          }) => <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input {...field} type="email" placeholder="your@email.com" className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <FormField control={form.control} name="phone" render={({
            field
          }) => <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input {...field} type="tel" placeholder="Your phone number" className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
            </div>}
          
          {bookingStep === 3 && <div className="space-y-4">
              <h3 className="text-lg font-medium mb-3">Additional Information</h3>
              
              <FormField control={form.control} name="specialRequests" render={({
            field
          }) => <FormItem>
                    <FormLabel>Special Requests</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Any dietary restrictions or special requests?" className="min-h-[100px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800">Please note:</p>
                  <p className="text-amber-700">Your experience is not confirmed until you complete this process. No payment will be taken at this time.</p>
                </div>
              </div>
            </div>}
          
          <DrawerFooter className="px-0 pt-2">
            <div className="flex justify-between w-full">
              {bookingStep > 1 ? <Button type="button" variant="outline" onClick={handlePrevious} className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button> : <div />}
              
              <Button type="button" onClick={handleManualContinue} className="bg-airbnb-red hover:bg-airbnb-red/90 text-white">
                {bookingStep === 3 ? 'Confirm Booking' : 'Continue'} 
                {bookingStep < 3 && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
            
            <DrawerClose asChild>
              <Button variant="outline" onClick={() => setDrawerOpen(false)}>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </Form>;
  };

  return <div className="section-padding">
      <div className="container-padding mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-2xl">Upcoming Experiences</h2>
          <button className="flex items-center text-airbnb-red hover:underline text-xs text-left">
            <span className="mr-1">View all</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {upcomingExperiences.map(experience => <CarouselItem key={experience.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="airbnb-card border-none">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img src={experience.imageUrl} alt={experience.title} className="w-full h-[200px] object-cover rounded-t-xl" />
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">{experience.date}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-1">{experience.title}</h3>
                      <p className="text-airbnb-light mb-3">{experience.price}</p>
                      
                      <Drawer open={drawerOpen && selectedExperience?.id === experience.id} onOpenChange={setDrawerOpen}>
                        <DrawerTrigger asChild>
                          <Button className="w-full bg-airbnb-red hover:bg-airbnb-red/90 text-white" onClick={() => handleBookNow(experience)}>
                            Book Now <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </DrawerTrigger>
                        <DrawerContent className="max-h-[90vh] overflow-auto">
                          <DrawerHeader>
                            <DrawerTitle>{bookingComplete ? 'Booking Confirmed' : selectedExperience?.title}</DrawerTitle>
                            {!bookingComplete && <DrawerDescription>
                                {selectedExperience?.date} | {selectedExperience?.price}
                              </DrawerDescription>}
                          </DrawerHeader>
                          {renderBookingStepContent()}
                        </DrawerContent>
                      </Drawer>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>)}
          </CarouselContent>
          <CarouselDots className="mt-4" />
        </Carousel>
      </div>
    </div>;
};

export default UpcomingExperiences;
