
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Calendar, Users, Clock, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { FormControl, FormLabel, FormItem } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';

interface StandardBookingFormProps {
  onBack: () => void;
  onClose: () => void;
}

const StandardBookingForm: React.FC<StandardBookingFormProps> = ({ onBack, onClose }) => {
  // Initialize all state hooks at the top level
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [guests, setGuests] = useState<number>(2);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [skipQueue, setSkipQueue] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Always define toast at the top level
  const { toast } = useToast();

  // Available dates (next 14 days)
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  // Available time slots
  const availableTimes = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
  ];

  const handleNext = () => {
    if (step === 1) {
      if (!date || !time || !guests) {
        toast({
          title: "Please fill all fields",
          description: "All fields are required to proceed",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      onBack();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time || !guests || !name || !email || !phone) {
      toast({
        title: "Please fill all required fields",
        description: "All fields are required to proceed",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Calculate total amount (base price per guest + additional fees)
      const basePrice = 1000; // ₹1000 per guest
      const skipQueueFee = skipQueue ? 100 : 0;
      const totalAmount = (basePrice * guests) + skipQueueFee;
      
      // Create reservation record
      const { data: reservation, error } = await supabase
        .from('reservations')
        .insert({
          name,
          email,
          phone,
          date,
          time,
          special_requests: notes,
          booking_type: 'standard',
          total_amount: totalAmount,
          status: 'pending'
        })
        .select('id')
        .single();
      
      if (error) {
        throw error;
      }
      
      // Create guest records
      const guestEntries = Array.from({ length: guests }, () => ({
        reservation_id: reservation.id,
        name: 'Guest',
        gender: 'not_specified',
        cover_charge: basePrice
      }));
      
      const { error: guestsError } = await supabase
        .from('reservation_guests')
        .insert(guestEntries);
        
      if (guestsError) {
        throw guestsError;
      }
      
      // Show success message
      toast({
        title: "Reservation Submitted!",
        description: `Your table for ${guests} has been reserved.`,
      });
      
      // Close the booking drawer
      onClose();
      
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast({
        title: "Reservation Failed",
        description: "There was an error submitting your reservation.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>Select Date</Label>
        <Select value={date} onValueChange={setDate}>
          <SelectTrigger className="w-full bg-[#1E1E1E] border-airbnb-gold/20">
            <SelectValue placeholder="Select date" />
          </SelectTrigger>
          <SelectContent>
            {availableDates.map(date => (
              <SelectItem key={date} value={date}>
                {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Select Time</Label>
        <Select value={time} onValueChange={setTime}>
          <SelectTrigger className="w-full bg-[#1E1E1E] border-airbnb-gold/20">
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            {availableTimes.map(time => (
              <SelectItem key={time} value={time}>{time}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Number of Guests</Label>
        <Select 
          value={guests.toString()} 
          onValueChange={(value) => setGuests(parseInt(value))}
        >
          <SelectTrigger className="w-full bg-[#1E1E1E] border-airbnb-gold/20">
            <SelectValue placeholder="Select number of guests" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'person' : 'people'}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button 
        onClick={handleNext} 
        className="w-full mt-4 bg-airbnb-red hover:bg-airbnb-red/90"
      >
        Next
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="bg-[#1E1E1E] border-airbnb-gold/20" 
          placeholder="Your name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="bg-[#1E1E1E] border-airbnb-gold/20" 
          placeholder="Your email"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input 
          id="phone" 
          type="tel" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          className="bg-[#1E1E1E] border-airbnb-gold/20" 
          placeholder="Your phone number"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Special Requests (Optional)</Label>
        <Textarea 
          id="notes" 
          value={notes} 
          onChange={(e) => setNotes(e.target.value)} 
          className="bg-[#1E1E1E] border-airbnb-gold/20" 
          placeholder="Any special requests or notes"
        />
      </div>

      <div className="flex items-center space-x-2 mt-4">
        <Checkbox 
          id="skipQueue" 
          checked={skipQueue} 
          onCheckedChange={(checked) => setSkipQueue(checked === true)}
          className="border-airbnb-gold/50 data-[state=checked]:bg-airbnb-gold"
        />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="skipQueue">
            Skip Queue Fee (₹100)
          </Label>
          <p className="text-sm text-muted-foreground">
            Get priority seating when you arrive
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-airbnb-gold/20 mt-6">
        <div className="flex justify-between mb-2">
          <span className="text-airbnb-light">Base Price ({guests} {guests === 1 ? 'guest' : 'guests'})</span>
          <span className="text-airbnb-light">₹{1000 * guests}</span>
        </div>
        {skipQueue && (
          <div className="flex justify-between mb-2">
            <span className="text-airbnb-light">Skip Queue Fee</span>
            <span className="text-airbnb-light">₹100</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-semibold mt-2 pt-2 border-t border-airbnb-gold/20">
          <span className="text-airbnb-gold">Total</span>
          <span className="text-airbnb-gold">₹{(1000 * guests) + (skipQueue ? 100 : 0)}</span>
        </div>
      </div>

      <div className="flex space-x-4 mt-6">
        <Button 
          type="button"
          onClick={handleBack} 
          variant="outline" 
          className="w-1/2 border-airbnb-gold/20 hover:bg-airbnb-gold/5"
        >
          Back
        </Button>
        <Button 
          type="submit"
          className="w-1/2 bg-airbnb-red hover:bg-airbnb-red/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Reserve Now"
          )}
        </Button>
      </div>
    </form>
  );

  return (
    <div className="flex flex-col h-full bg-[#121212] text-white">
      <div className="flex items-center justify-between px-6 py-4 border-b border-airbnb-gold/20">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleBack}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-semibold text-white">Standard Booking</h2>
        <div className="w-8" /> {/* Empty div for centering */}
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="pb-4">
          <div className="flex items-center gap-2 mb-4">
            <div className={`rounded-full w-8 h-8 flex items-center justify-center ${step === 1 ? 'bg-airbnb-gold' : 'bg-airbnb-gold/40'}`}>
              <Calendar className="h-4 w-4 text-black" />
            </div>
            <div className="h-0.5 flex-1 bg-airbnb-gold/40" />
            <div className={`rounded-full w-8 h-8 flex items-center justify-center ${step === 2 ? 'bg-airbnb-gold' : 'bg-airbnb-gold/40'}`}>
              <Users className="h-4 w-4 text-black" />
            </div>
          </div>
        </div>
        
        {step === 1 ? renderStep1() : renderStep2()}
      </div>
    </div>
  );
};

export default StandardBookingForm;
