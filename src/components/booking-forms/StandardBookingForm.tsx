
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { ArrowLeft, Calendar as CalendarIcon, Users } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from "@/integrations/supabase/client";

interface StandardBookingFormProps {
  onBack: () => void;
  onClose: () => void;
}

const timeSlots = [
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", 
  "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM",
  "10:00 PM"
];

const StandardBookingForm: React.FC<StandardBookingFormProps> = ({ onBack, onClose }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string | undefined>();
  const [guests, setGuests] = useState("2");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time || !name || !email || !phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Save the booking to Supabase
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          name,
          email,
          phone,
          date: format(date, 'yyyy-MM-dd'),
          time,
          guests: parseInt(guests),
          booking_type: 'standard',
          special_requests: specialRequests || null
        })
        .select();

      if (error) {
        throw error;
      }

      toast({
        title: "Booking submitted!",
        description: `Your table for ${guests} is reserved for ${format(date, 'MMMM dd, yyyy')} at ${time}.`,
      });

      onClose();
    } catch (error) {
      console.error('Error saving booking:', error);
      toast({
        title: "Something went wrong",
        description: "We couldn't process your booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#121212] text-white">
      <div className="flex items-center p-4 border-b border-airbnb-gold/20">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 text-white"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-semibold flex-1">Standard Reservation</h2>
      </div>

      <ScrollArea className="flex-1 px-6 py-4">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <Label className="text-white">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal mt-1.5 border-airbnb-gold/20 bg-[#1E1E1E] text-white"
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
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <Label className="text-white">Time</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="w-full mt-1.5 border-airbnb-gold/20 bg-[#1E1E1E] text-white">
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
            <Label className="text-white">Number of guests</Label>
            <div className="flex items-center mt-1.5">
              <Users className="mr-2 h-4 w-4 text-airbnb-gold" />
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger className="w-full border-airbnb-gold/20 bg-[#1E1E1E] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'guest' : 'guests'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="name" className="text-white">Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Your full name"
              className="mt-1.5 border-airbnb-gold/20 bg-[#1E1E1E] text-white"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="your@email.com"
              className="mt-1.5 border-airbnb-gold/20 bg-[#1E1E1E] text-white"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-white">Phone</Label>
            <Input 
              id="phone" 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="Your phone number"
              className="mt-1.5 border-airbnb-gold/20 bg-[#1E1E1E] text-white"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="specialRequests" className="text-white">Special Requests (Optional)</Label>
            <Input 
              id="specialRequests" 
              value={specialRequests} 
              onChange={(e) => setSpecialRequests(e.target.value)} 
              placeholder="Any special requests for your booking"
              className="mt-1.5 border-airbnb-gold/20 bg-[#1E1E1E] text-white"
            />
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="bg-airbnb-gold hover:bg-airbnb-gold/90 text-black font-medium w-full"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Confirm Reservation"}
            </Button>
            
            <p className="text-xs text-center text-white/70 mt-3">
              You won't be charged yet. We'll hold your reservation for 15 minutes.
            </p>
          </div>
        </form>
      </ScrollArea>
    </div>
  );
};

export default StandardBookingForm;
