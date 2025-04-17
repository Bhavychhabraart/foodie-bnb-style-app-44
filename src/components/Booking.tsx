
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format, isWeekend } from 'date-fns';
import { Calendar as CalendarIcon, Users, Tag, Phone, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/providers/AuthProvider';
import BookingConfirmation from '@/components/BookingConfirmation';
import { supabase } from '@/integrations/supabase/client';

// Define restaurant opening hours
const openingHours = {
  weekday: {
    open: 17, // 5:00 PM
    close: 22, // 10:00 PM
  },
  weekend: {
    open: 12, // 12:00 PM
    close: 23, // 11:00 PM
  }
};

const Booking: React.FC<{ id: string }> = ({ id }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string | undefined>();
  const [guests, setGuests] = useState("2");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingData, setBookingData] = useState<Record<string, any> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { userProfile } = useAuth();

  // Set user data from profile if available
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.full_name || "");
      setEmail(userProfile.email || "");
      setPhone(userProfile.phone || "");
    }
  }, [userProfile]);

  // Generate time slots based on the selected date
  useEffect(() => {
    if (!date) return;
    
    const isWeekendDay = isWeekend(date);
    const { open, close } = isWeekendDay ? openingHours.weekend : openingHours.weekday;
    
    const slots = [];
    
    // Generate half-hour slots between opening and closing times
    for (let hour = open; hour < close; hour++) {
      slots.push(`${hour % 12 || 12}:00 ${hour >= 12 ? 'PM' : 'AM'}`);
      if (hour < close - 0.5) {
        slots.push(`${hour % 12 || 12}:30 ${hour >= 12 ? 'PM' : 'AM'}`);
      }
    }
    
    setAvailableTimeSlots(slots);
    
    // Reset selected time if it's not in the new available slots
    if (time && !slots.includes(time)) {
      setTime(undefined);
    }
  }, [date]);

  const handleApplyCoupon = () => {
    if (couponCode) {
      setDiscountApplied(true);
      toast({
        title: "Coupon applied!",
        description: "Your discount has been applied to your reservation.",
      });
    } else {
      toast({
        title: "No coupon entered",
        description: "Please enter a valid coupon code.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }
    
    if (!date || !time || !name || !email || !phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      const dateFormatted = format(date, 'yyyy-MM-dd');
      const guestCount = parseInt(guests, 10);
      const totalAmount = guestCount * 1000; // ₹1000 per guest
      
      // Create the reservation record
      const { data: reservationData, error: reservationError } = await supabase
        .from('reservations')
        .insert({
          user_id: user?.id || null,
          booking_type: 'standard',
          name: name,
          email: email,
          phone: phone,
          date: dateFormatted,
          time: time,
          total_amount: totalAmount,
          special_requests: '',
          status: 'pending'
        })
        .select('id')
        .single();
        
      if (reservationError) throw reservationError;
      
      // Add guests
      if (guestCount > 0) {
        const guests = Array(guestCount).fill({
          reservation_id: reservationData.id,
          name: 'Guest',
          gender: 'not_specified',
          cover_charge: 1000
        });
        
        const { error: guestsError } = await supabase
          .from('reservation_guests')
          .insert(guests);
          
        if (guestsError) throw guestsError;
      }
      
      // Store booking data for confirmation screen
      setBookingData({
        experienceTitle: "Table Reservation",
        date: date ? format(date, "MMMM dd, yyyy") : "",
        time: time || "",
        guests: guests,
        name: name,
        phone: phone
      });
      
      setShowConfirmation(true);
      
      // Notify the user
      toast({
        title: "Reservation Successful",
        description: `Your table for ${guests} guests is reserved for ${format(date, 'MMMM dd, yyyy')} at ${time}.`
      });
      
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Error processing booking",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    
    // Reset form
    setDate(new Date());
    setTime(undefined);
    setGuests("2");
    setName(userProfile?.full_name || "");
    setEmail(userProfile?.email || "");
    setPhone(userProfile?.phone || "");
    setCouponCode("");
    setDiscountApplied(false);
    setBookingData(null);
  };

  return (
    <div id={id} className="section-padding bg-airbnb-gray">
      {showConfirmation && bookingData ? (
        <BookingConfirmation
          experienceTitle={bookingData.experienceTitle}
          date={bookingData.date}
          time={bookingData.time}
          guests={bookingData.guests}
          name={bookingData.name}
          phone={bookingData.phone}
          onClose={handleCloseConfirmation}
        />
      ) : (
        <div className="container-padding mx-auto">
          <Card className="max-w-md mx-auto border-none shadow-lg">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-5">Reserve your table</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
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
                          disabled={(date) => date < new Date()}
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
                        {availableTimeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {date && availableTimeSlots.length > 0 && (
                      <p className="text-xs text-airbnb-light mt-1">
                        Opening hours: {isWeekend(date) ? '12:00 PM - 11:00 PM' : '5:00 PM - 10:00 PM'}
                      </p>
                    )}
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
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'guest' : 'guests'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
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
                    <div className="flex items-center mt-1.5">
                      <Phone className="mr-2 h-4 w-4 absolute left-3 text-airbnb-light" />
                      <Input 
                        id="phone" 
                        type="tel" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        placeholder="Your phone number"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="coupon">Coupon Code (Optional)</Label>
                    <div className="flex mt-1.5">
                      <div className="relative flex-grow">
                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input 
                          id="coupon" 
                          value={couponCode} 
                          onChange={(e) => setCouponCode(e.target.value)} 
                          placeholder="Enter coupon code"
                          className="pl-10"
                        />
                      </div>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleApplyCoupon}
                        className="ml-2"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="airbnb-button w-full mt-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Reserve now"
                    )}
                  </Button>
                  
                  <p className="text-xs text-center text-airbnb-light mt-2">
                    You won't be charged yet. Cancellation is free up to 24 hours before your reservation.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Booking;
