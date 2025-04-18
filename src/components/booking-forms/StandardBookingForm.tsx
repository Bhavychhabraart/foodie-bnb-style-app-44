
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Calendar, Users, Clock, MapPin, ArrowRight, Loader2, PartyPopper, Send } from 'lucide-react';
import { FormControl, FormLabel, FormItem } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import GuestDetailsInput from './GuestDetailsInput';
import { BookingSteps } from './BookingSteps';
import { motion } from 'framer-motion';
import BookingConfirmation from '@/components/BookingConfirmation';

interface StandardBookingFormProps {
  onBack: () => void;
  onClose: () => void;
}

const StandardBookingForm: React.FC<StandardBookingFormProps> = ({ onBack, onClose }) => {
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
  const [genderCounts, setGenderCounts] = useState({ male: 0, female: 0 });
  const [genderError, setGenderError] = useState<string>('');
  const [tablePreference, setTablePreference] = useState<string>('ground');
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const { toast } = useToast();

  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  const availableTimes = [
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM',
    '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM', '12:00 AM',
    '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM', '2:30 AM',
    '3:00 AM', '3:30 AM', '4:00 AM'
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
    } else if (step === 2) {
      if (!name || !email || !phone) {
        toast({
          title: "Please fill all fields",
          description: "All fields are required to proceed",
          variant: "destructive",
        });
        return;
      }
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const validateGenderRatio = () => {
    const { male, female } = genderCounts;
    const couples = Math.min(male, female);
    const maleStags = male - couples;
    
    if (male + female !== guests) {
      setGenderError('Total number of male and female guests must equal total guests');
      return false;
    }
    
    if (maleStags > couples) {
      setGenderError(`Number of male stags (${maleStags}) cannot exceed number of couples (${couples})`);
      return false;
    }
    
    setGenderError('');
    return true;
  };

  const handleGenderCountChange = (gender: 'male' | 'female', value: number) => {
    setGenderCounts(prev => ({
      ...prev,
      [gender]: value
    }));
    setGenderError('');
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

    if (!validateGenderRatio()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      
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
          total_amount: (1000 * guests) + (skipQueue ? 100 : 0),
          status: 'pending'
        })
        .select('id')
        .single();
      
      if (error) {
        throw error;
      }

      const guestEntries = [];
      
      for (let i = 0; i < genderCounts.male; i++) {
        guestEntries.push({
          reservation_id: reservation.id,
          name: 'Guest',
          gender: 'male',
          cover_charge: 1000
        });
      }
      
      for (let i = 0; i < genderCounts.female; i++) {
        guestEntries.push({
          reservation_id: reservation.id,
          name: 'Guest',
          gender: 'female',
          cover_charge: 1000
        });
      }
      
      const { error: guestsError } = await supabase
        .from('reservation_guests')
        .insert(guestEntries);
        
      if (guestsError) {
        console.error('Error creating guest entries:', guestsError);
        throw guestsError;
      }
      
      toast({
        title: "Reservation Submitted!",
        description: "We have received your reservation and will share confirmation on your email.",
      });
      
      setShowConfirmation(true);
      
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

  if (showConfirmation) {
    return (
      <BookingConfirmation
        experienceTitle="Standard Table Reservation"
        date={new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
        time={time}
        guests={guests.toString()}
        name={name}
        phone={phone}
        onClose={onClose}
      />
    );
  }

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
          onValueChange={(value) => {
            const newGuests = parseInt(value);
            setGuests(newGuests);
            setGenderCounts({ male: 0, female: 0 });
          }}
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
    <div className="space-y-5">
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
          type="button"
          onClick={handleNext}
          className="w-1/2 bg-airbnb-red hover:bg-airbnb-red/90"
        >
          Next
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <form onSubmit={handleSubmit} className="space-y-5">
      {guests > 0 && (
        <GuestDetailsInput
          guestCount={guests}
          genderCounts={genderCounts}
          onGenderCountChange={handleGenderCountChange}
          error={genderError}
        />
      )}

      <div className="space-y-2">
        <Label>Table Preference</Label>
        <Select value={tablePreference} onValueChange={setTablePreference}>
          <SelectTrigger className="w-full bg-[#1E1E1E] border-airbnb-gold/20">
            <SelectValue placeholder="Select table preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ground">Ground Floor</SelectItem>
            <SelectItem value="first">First Floor</SelectItem>
            <SelectItem value="terrace">Terrace</SelectItem>
          </SelectContent>
        </Select>
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
          disabled={isSubmitting || !!genderError || genderCounts.male + genderCounts.female !== guests}
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
        <div className="w-8" />
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="pb-8">
          <BookingSteps currentStep={step} />
        </div>
        
        {step === 1 ? renderStep1() : step === 2 ? renderStep2() : renderStep3()}
      </div>
    </div>
  );
};

export default StandardBookingForm;
