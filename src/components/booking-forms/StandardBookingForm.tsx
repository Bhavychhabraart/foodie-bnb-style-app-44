import React, { useState } from 'react';
import { 
  DrawerHeader, 
  DrawerTitle, 
  DrawerDescription, 
  DrawerFooter 
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Calendar as CalendarIcon, Clock, Users, Tag } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import BookingConfirmation from '@/components/BookingConfirmation';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';

interface StandardBookingFormProps {
  onBack: () => void;
  onClose: () => void;
}

const guestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
});

const formSchema = z.object({
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string().min(1, "Please select a time"),
  guests: z.array(guestSchema).min(1, "At least one guest is required").max(10, "Maximum 10 guests"),
  specialRequests: z.string().optional(),
  couponCode: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const timeSlots = [
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", 
  "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM",
  "10:00 PM"
];

const StandardBookingForm: React.FC<StandardBookingFormProps> = ({ onBack, onClose }) => {
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: undefined,
      time: "",
      guests: [{ name: "", gender: "other" }],
      specialRequests: "",
      couponCode: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to make a reservation.",
          variant: "destructive"
        });
        return;
      }

      // Calculate total amount (1000 cover charge per guest)
      const totalAmount = values.guests.length * 1000;

      // Insert reservation
      const { data: reservationData, error: reservationError } = await supabase
        .from('reservations')
        .insert({
          user_id: user.id,
          booking_type: 'standard',
          date: values.date.toISOString(),
          time: values.time,
          total_amount: totalAmount,
          special_requests: values.specialRequests || null,
          status: 'pending'
        })
        .select('id')
        .single();

      if (reservationError) throw reservationError;

      // Insert guests
      const guestInserts = values.guests.map(guest => ({
        reservation_id: reservationData.id,
        name: guest.name,
        gender: guest.gender,
        cover_charge: 1000
      }));

      const { error: guestsError } = await supabase
        .from('reservation_guests')
        .insert(guestInserts);

      if (guestsError) throw guestsError;

      setIsComplete(true);
      
      toast({
        title: "Reservation Successful",
        description: `Your table for ${values.guests.length} guests is reserved for ${format(values.date, 'MMMM dd, yyyy')} at ${values.time}.`,
      });

    } catch (error) {
      console.error('Reservation error:', error);
      toast({
        title: "Reservation Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                i === step 
                  ? 'bg-airbnb-red text-white' 
                  : i < step 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
              }`}
            >
              {i < step ? '✓' : i}
            </div>
            {i < 2 && (
              <div 
                className={`w-10 h-1 ${
                  i < step ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const handleApplyCoupon = () => {
    const couponCode = form.getValues('couponCode');
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

  if (isComplete) {
    return (
      <BookingConfirmation
        experienceTitle="Standard Table Booking"
        date={form.getValues('date') ? format(form.getValues('date'), 'MMMM dd, yyyy') : ''}
        time={form.getValues('time')}
        guests={form.getValues('guests').length.toString()}
        onClose={onClose}
      />
    );
  }

  return (
    <div className="pb-6">
      <DrawerHeader>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute left-4 top-4" 
          onClick={handlePrevious}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <DrawerTitle className="text-center pt-2">Book a Standard Table</DrawerTitle>
        <DrawerDescription className="text-center">
          {step === 1 ? "When would you like to visit?" : 
           step === 2 ? "Confirm your reservation" : 
           "Confirm your reservation"}
        </DrawerDescription>
      </DrawerHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 px-6">
          {renderStepIndicator()}
          
          {step === 1 && (
            <>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal flex justify-between items-center",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guest Details</FormLabel>
                    {field.value.map((guest, index) => (
                      <div key={index} className="space-y-2 border p-4 rounded-lg">
                        <FormField
                          control={form.control}
                          name={`guests.${index}.name`}
                          render={({ field: guestNameField }) => (
                            <FormItem>
                              <FormLabel>Guest Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder={`Guest ${index + 1} name`} 
                                  {...guestNameField} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`guests.${index}.gender`}
                          render={({ field: genderField }) => (
                            <FormItem>
                              <FormLabel>Gender</FormLabel>
                              <Select 
                                onValueChange={genderField.onChange} 
                                defaultValue={genderField.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const currentGuests = form.getValues('guests');
                        form.setValue('guests', [...currentGuests, { name: "", gender: "other" }]);
                      }}
                      disabled={field.value.length >= 10}
                    >
                      Add Another Guest
                    </Button>
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 2 && (
            <>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-4">Reservation Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">
                      {form.getValues('date') ? format(form.getValues('date'), 'MMMM dd, yyyy') : ''}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{form.getValues('time')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests:</span>
                    <span className="font-medium">{form.getValues('guests').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cover Charge:</span>
                    <span className="font-medium">₹{form.getValues('guests').length * 1000}</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <FormField
                  control={form.control}
                  name="couponCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Have a coupon code?</FormLabel>
                      <div className="flex">
                        <FormControl>
                          <div className="flex w-full">
                            <div className="relative flex-grow">
                              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <Input 
                                placeholder="Enter coupon code" 
                                className="pl-10" 
                                {...field} 
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
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="specialRequests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Requests (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any dietary requirements or special occasions?" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Let us know if you have any special requirements
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={handlePrevious}>
                Back
              </Button>
            ) : (
              <Button type="button" variant="outline" onClick={onBack}>
                Cancel
              </Button>
            )}
            
            <Button 
              type="submit"
              className="bg-airbnb-red hover:bg-airbnb-red/90 text-white"
            >
              {step === 2 ? 'Confirm Booking' : 'Continue'} 
              {step < 2 && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StandardBookingForm;
