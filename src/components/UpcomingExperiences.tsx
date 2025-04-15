
import React, { useState } from 'react';
import { ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { format } from 'date-fns';
import { useToast } from "@/components/ui/use-toast";

interface Experience {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
  price: string;
}

const upcomingExperiences = [
  {
    id: 1,
    title: "Farm to Table Dinner",
    date: "May 25, 2025",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    price: "₹3,200 per person"
  },
  {
    id: 2,
    title: "Wine Tasting Evening",
    date: "June 3, 2025",
    imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    price: "₹1,800 per person"
  },
  {
    id: 3,
    title: "Pasta Making Class",
    date: "June 12, 2025",
    imageUrl: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1165&q=80",
    price: "₹2,500 per person"
  }
];

const timeSlots = [
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", 
  "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM",
  "10:00 PM"
];

const UpcomingExperiences: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [guests, setGuests] = useState("2");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const { toast } = useToast();

  const handleBookNow = (experience: Experience) => {
    setSelectedExperience(experience);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedExperience || !selectedTime || !name || !email || !phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Booking confirmed!",
      description: `Your booking for ${selectedExperience.title} on ${selectedExperience.date} at ${selectedTime} has been confirmed.`,
    });

    // Reset form
    setSelectedTime(undefined);
    setGuests("2");
    setName("");
    setEmail("");
    setPhone("");
    setSpecialRequests("");
  };

  return (
    <div className="section-padding">
      <div className="container-padding mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Upcoming Experiences</h2>
          <button className="flex items-center text-airbnb-red hover:underline">
            <span className="mr-1">View all</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {upcomingExperiences.map((experience) => (
              <CarouselItem key={experience.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="airbnb-card border-none">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={experience.imageUrl} 
                        alt={experience.title} 
                        className="w-full h-[200px] object-cover rounded-t-xl"
                      />
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">{experience.date}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-1">{experience.title}</h3>
                      <p className="text-airbnb-light mb-3">{experience.price}</p>
                      
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button 
                            className="w-full bg-airbnb-red hover:bg-airbnb-red/90 text-white"
                            onClick={() => handleBookNow(experience)}
                          >
                            Book Now <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <div className="mx-auto w-full max-w-md">
                            <DrawerHeader>
                              <DrawerTitle>Book {selectedExperience?.title}</DrawerTitle>
                              <DrawerDescription>
                                {selectedExperience?.date} | {selectedExperience?.price}
                              </DrawerDescription>
                            </DrawerHeader>
                            
                            <form onSubmit={handleSubmit} className="px-6">
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="time">Time</Label>
                                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                                    <SelectTrigger className="w-full mt-1.5">
                                      <SelectValue placeholder="Select time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {timeSlots.map((slot) => (
                                        <SelectItem key={slot} value={slot}>
                                          {slot}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div>
                                  <Label htmlFor="guests">Number of guests</Label>
                                  <Select value={guests} onValueChange={setGuests}>
                                    <SelectTrigger className="w-full mt-1.5">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                        <SelectItem key={num} value={num.toString()}>
                                          {num} {num === 1 ? 'guest' : 'guests'}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div>
                                  <Label htmlFor="name">Name</Label>
                                  <Input 
                                    id="name" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    placeholder="Your full name"
                                    className="mt-1.5"
                                  />
                                </div>
                                
                                <div>
                                  <Label htmlFor="email">Email</Label>
                                  <Input 
                                    id="email" 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="your@email.com"
                                    className="mt-1.5"
                                  />
                                </div>
                                
                                <div>
                                  <Label htmlFor="phone">Phone</Label>
                                  <Input 
                                    id="phone" 
                                    type="tel" 
                                    value={phone} 
                                    onChange={(e) => setPhone(e.target.value)} 
                                    placeholder="Your phone number"
                                    className="mt-1.5"
                                  />
                                </div>
                                
                                <div>
                                  <Label htmlFor="special-requests">Special Requests</Label>
                                  <Textarea 
                                    id="special-requests"
                                    value={specialRequests}
                                    onChange={(e) => setSpecialRequests(e.target.value)}
                                    placeholder="Any dietary restrictions or special requests?"
                                    className="mt-1.5"
                                  />
                                </div>
                              </div>
                            </form>
                            
                            <DrawerFooter>
                              <Button onClick={handleSubmit} className="bg-airbnb-red hover:bg-airbnb-red/90 text-white">
                                Confirm Booking
                              </Button>
                              <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DrawerClose>
                            </DrawerFooter>
                          </div>
                        </DrawerContent>
                      </Drawer>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-x-1/2" />
          <CarouselNext className="right-0 translate-x-1/2" />
        </Carousel>
      </div>
    </div>
  );
};

export default UpcomingExperiences;
