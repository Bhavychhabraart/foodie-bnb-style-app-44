
import React, { useState } from 'react';
import { 
  DrawerHeader, 
  DrawerTitle, 
  DrawerDescription, 
  DrawerFooter 
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Tag, 
  Check, 
  ChevronRight,
  Music,
  Cake,
  Camera,
  PartyPopper,
  QrCode,
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import BookingConfirmation from '@/components/BookingConfirmation';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { Checkbox } from "@/components/ui/checkbox";
import { v4 as uuidv4 } from 'uuid';

interface PrivatePartyFormProps {
  onBack: () => void;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  date: z.date({
    required_error: "Please select a date",
  }),
  timeSlot: z.number().min(0).max(20),
  guestCount: z.coerce.number().min(1, "Must have at least 1 guest").max(100, "Maximum 100 guests allowed").default(10),
  occasionType: z.string().min(2, "Please select an occasion"),
  specialInstructions: z.string().optional(),
  amenities: z.object({
    dj: z.boolean().default(false),
    decorations: z.boolean().default(false),
    cake: z.boolean().default(false),
    photographer: z.boolean().default(false),
  }).default({}),
});

type FormValues = z.infer<typeof formSchema>;

const timeSlots = [
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM",
  "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
  "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM"
];

const occasionTypes = [
  "Birthday Party", "Anniversary", "Corporate Celebration", "Kitty Party", "Other"
];

const PrivatePartyForm: React.FC<PrivatePartyFormProps> = ({ onBack, onClose }) => {
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [bookingId, setBookingId] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: undefined,
      timeSlot: 10, // Default to 5:00 PM (index 10)
      guestCount: 10,
      occasionType: "",
      specialInstructions: "",
      amenities: {
        dj: false,
        decorations: false,
        cake: false,
        photographer: false,
      },
    },
    mode: "onChange",
  });

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-4">
        {[1, 2].map((i) => (
          <React.Fragment key={i}>
            <div className="flex items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  i === step 
                    ? 'bg-airbnb-red text-white' 
                    : i < step 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-700'
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i}
              </div>
              {i < 2 && (
                <div 
                  className={`w-10 h-1 ${
                    i < step ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          </React.Fragment>
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

  const onSubmit = async (values: FormValues) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const dateFormatted = format(values.date, 'yyyy-MM-dd');
      const selectedTime = timeSlots[values.timeSlot];
      const reservationId = uuidv4();
      setBookingId(reservationId);
      
      const { data: reservationData, error: reservationError } = await supabase
        .from('reservations')
        .insert({
          id: reservationId,
          user_id: user?.id || null,
          booking_type: 'private_party',
          name: values.name,
          email: values.email,
          phone: values.phone,
          date: dateFormatted,
          time: selectedTime,
          total_amount: values.guestCount * 2000,
          occasion_type: values.occasionType,
          special_requests: values.specialInstructions || null,
          guest_count: values.guestCount,
          status: 'pending'
        })
        .select('id')
        .single();

      if (reservationError) throw reservationError;
      
      // Send booking confirmation email
      try {
        // Build add-ons array from selected amenities
        const selectedAddOns = [];
        if (values.amenities.dj) selectedAddOns.push("DJ Setup");
        if (values.amenities.decorations) selectedAddOns.push("Special Decorations");
        if (values.amenities.cake) selectedAddOns.push("Celebration Cake");
        if (values.amenities.photographer) selectedAddOns.push("Professional Photographer");
        
        console.log("Sending email confirmation for private party booking");
        
        const { data: emailData, error: emailError } = await supabase.functions.invoke('send-booking-confirmation', {
          body: {
            email: values.email,
            name: values.name,
            date: format(values.date, 'MMMM dd, yyyy'),
            time: selectedTime,
            guests: values.guestCount.toString(),
            experienceTitle: `Private Party: ${values.occasionType}`,
            specialRequests: values.specialInstructions,
            addOns: selectedAddOns
          }
        });

        if (emailError) {
          console.error("Error sending confirmation email:", emailError);
          // Don't prevent booking completion if email fails
        } else {
          console.log("Email confirmation sent successfully:", emailData);
        }
      } catch (emailError) {
        console.error("Exception sending confirmation email:", emailError);
        // Don't prevent booking completion if email fails
      }

      setIsComplete(true);
      toast({
        title: "Private Party Booked Successfully",
        description: `Your ${values.occasionType} party for ${values.guestCount} guests is scheduled for ${format(values.date, 'PPP')}. A confirmation email has been sent to your inbox.`,
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

  const QRTicket = () => {
    const selectedTime = timeSlots[form.getValues('timeSlot')];
    
    return (
      <div className="flex flex-col items-center text-center">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Your Booking is Pending Confirmation</h2>
          <p className="text-muted-foreground mb-6">
            Our team will review your request and get back to you shortly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xs mx-auto">
          <div className="flex justify-center mb-3">
            <QrCode className="w-32 h-32" />
          </div>
          
          <div className="border-t border-dashed border-gray-300 my-3" />
          
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-1">{form.getValues('occasionType')}</h3>
            <p className="text-sm mb-1">Booking ID: {bookingId.substring(0, 8).toUpperCase()}</p>
            <p className="text-sm mb-1">
              {form.getValues('date') ? format(form.getValues('date'), 'MMMM dd, yyyy') : ''}
            </p>
            <p className="text-sm mb-1">{selectedTime}</p>
            <p className="text-sm">{form.getValues('guestCount')} Guests</p>
          </div>

          <div className="border-t border-dashed border-gray-300 my-3" />
          
          <div className="text-xs text-center text-muted-foreground">
            <p>Show this QR code at the entrance</p>
            <p>BOOKING STATUS: PENDING</p>
          </div>
        </div>

        <Button 
          onClick={onClose} 
          className="mt-6 bg-airbnb-red hover:bg-airbnb-red/90"
        >
          Done
        </Button>
      </div>
    );
  };

  if (isComplete) {
    return (
      <div className="p-4">
        <QRTicket />
      </div>
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
        <DrawerTitle className="text-center pt-2">Book a Private Party</DrawerTitle>
        <DrawerDescription className="text-center">
          {step === 1 ? "Tell us about your party" : "Contact Information"}
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
                name="timeSlot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time: {timeSlots[field.value]}</FormLabel>
                    <FormControl>
                      <div className="py-4">
                        <Slider
                          min={0}
                          max={20}
                          step={1}
                          value={[field.value]}
                          onValueChange={(value) => {
                            field.onChange(value[0]);
                          }}
                          className="mt-2"
                        />
                      </div>
                    </FormControl>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>12:00 PM</span>
                      <span>4:00 PM</span>
                      <span>8:00 PM</span>
                      <span>10:00 PM</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="guestCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Guests</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="Enter number of guests"
                        value={field.value}
                        onChange={(e) => {
                          const value = e.target.value === "" ? "" : parseInt(e.target.value, 10);
                          field.onChange(value);
                        }}
                        min={1}
                        max={100}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="occasionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Occasion</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select occasion" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {occasionTypes.map((occasion) => (
                          <SelectItem key={occasion} value={occasion}>
                            {occasion}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="border rounded-lg p-4 space-y-4">
                <h3 className="font-medium">Optional Amenities</h3>
                
                <FormField
                  control={form.control}
                  name="amenities.dj"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="flex items-center"><Music className="mr-2 h-4 w-4" /> DJ Setup</FormLabel>
                        <FormDescription>
                          Professional DJ with sound system
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="amenities.decorations"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="flex items-center"><PartyPopper className="mr-2 h-4 w-4" /> Special Decorations</FormLabel>
                        <FormDescription>
                          Custom decorations based on your theme
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="amenities.cake"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="flex items-center"><Cake className="mr-2 h-4 w-4" /> Celebration Cake</FormLabel>
                        <FormDescription>
                          Custom cake for your special occasion
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="amenities.photographer"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="flex items-center"><Camera className="mr-2 h-4 w-4" /> Professional Photographer</FormLabel>
                        <FormDescription>
                          Capture memories with a professional photographer
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
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
                      <Input type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Instructions (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any special requirements or instructions?" 
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
              type={step === 2 ? "submit" : "button"}
              className="bg-airbnb-red hover:bg-airbnb-red/90 text-white"
              onClick={() => {
                form.trigger().then((isValid) => {
                  if (isValid) {
                    if (step < 2) {
                      setStep(step + 1);
                    } else {
                      form.handleSubmit(onSubmit)();
                    }
                  }
                });
              }}
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

export default PrivatePartyForm;
