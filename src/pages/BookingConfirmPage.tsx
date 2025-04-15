
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Users, MessageSquare, CreditCard } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';

const BookingConfirmPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('explore');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string | undefined>("7:00 PM");
  const [guests, setGuests] = useState("2");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const { toast } = useToast();
  
  const timeSlots = [
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", 
    "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM",
    "10:00 PM"
  ];
  
  const reservationTypes: Record<string, string> = {
    'regular': 'Regular Dining',
    'corporate': 'Corporate Event',
    'private': 'Private Party',
    'kitty': 'Kitty Party',
    'date': 'Date Night',
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time || !name || !email || !phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Reservation confirmed!",
      description: `Your ${reservationTypes[id || 'regular']} for ${guests} is reserved for ${format(date, 'MMMM dd, yyyy')} at ${time}.`,
    });
  };

  return (
    <div className="pb-16">
      <Navbar activeTab="menu" setActiveTab={() => {}} />

      <div className="container-padding mx-auto mt-6">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Complete Your Reservation</h1>
        <p className="text-airbnb-light mb-6">
          {id && reservationTypes[id] ? reservationTypes[id] : 'Regular Dining'}
        </p>
        
        <Card className="border-none shadow-lg mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal mt-1.5"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "MMMM dd, yyyy") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label>Time</Label>
                    <Select value={time} onValueChange={setTime}>
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
                </div>
                
                <div>
                  <Label>Number of guests</Label>
                  <div className="flex items-center mt-1.5">
                    <Users className="mr-2 h-4 w-4 text-airbnb-light" />
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'guest' : 'guests'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Label className="flex items-center" htmlFor="message">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message to restaurant (optional)
                  </Label>
                  <Textarea 
                    id="message" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Any special requests or dietary requirements?"
                    className="mt-1.5"
                  />
                </div>
                
                <div>
                  <Label className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment Method
                  </Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger className="w-full mt-1.5">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Pay at Restaurant</SelectItem>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit" className="airbnb-button w-full mt-4">
                  Confirm Reservation
                </Button>
                
                <p className="text-xs text-center text-airbnb-light mt-2">
                  You may cancel your reservation up to 2 hours before the scheduled time without any charges.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default BookingConfirmPage;
