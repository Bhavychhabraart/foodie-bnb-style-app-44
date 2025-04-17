import React, { useState } from 'react';
import { DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Calendar as CalendarIcon, Clock, Users, Briefcase } from 'lucide-react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';

interface CorporateEventFormProps {
  onBack: () => void;
  onClose: () => void;
}

const formSchema = z.object({
  eventDate: z.date({
    required_error: "Please select a date",
  }),
  startTime: z.string().min(1, "Please select a start time"),
  endTime: z.string().min(1, "Please select an end time"),
  attendees: z.string().min(1, "Please select the number of attendees"),
  eventType: z.enum(["meeting", "lunch", "dinner", "presentation"], {
    required_error: "Please select an event type",
  }),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  contactName: z.string().min(2, "Name must be at least 2 characters"),
  contactEmail: z.string().email("Please enter a valid email"),
  contactPhone: z.string().min(10, "Please enter a valid phone number"),
  requirements: z.array(z.string()).optional(),
  additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const timeSlots = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", 
  "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM",
  "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", 
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM"
];

const requirementItems = [
  {
    id: "projector",
    label: "Projector & Screen",
  },
  {
    id: "audioSystem",
    label: "Audio System",
  },
  {
    id: "videoConferencing",
    label: "Video Conferencing",
  },
  {
    id: "whiteboard",
    label: "Whiteboard",
  },
  {
    id: "privateRoom",
    label: "Private Room",
  },
  {
    id: "catering",
    label: "Catering Services",
  }
];

const CorporateEventForm: React.FC<CorporateEventFormProps> = ({ onBack, onClose }) => {
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startTime: "",
      endTime: "",
      attendees: "",
      eventType: "meeting",
      companyName: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      requirements: [],
      additionalInfo: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: FormValues) => {
    try {
      console.log("Form submitted with values:", values);
      
      if (step < 3) {
        setStep(step + 1);
      } else {
        console.log("Booking complete!");
        
        // After successful booking, send confirmation email
        try {
          const { data, error } = await supabase.functions.invoke('send-booking-confirmation', {
            body: {
              email: values.contactEmail,
              name: values.companyName,
              date: format(values.eventDate, 'MMMM dd, yyyy'),
              time: values.startTime,
              guests: values.attendees.toString(),
              experienceTitle: "Corporate Event Booking",
              specialRequests: values.requirements
            }
          });

          if (error) {
            console.error("Error sending confirmation email:", error);
            // Don't block booking completion if email fails
          } else {
            console.log("Email confirmation sent successfully");
          }
        } catch (emailError) {
          console.error("Exception sending confirmation email:", emailError);
          // Don't block booking completion if email fails
        }

        setIsComplete(true);
        
        toast({
          title: "Corporate Event Booked Successfully",
          description: `Your event for ${values.attendees} attendees is scheduled for ${format(values.eventDate, 'PPP')} at ${values.startTime}. A confirmation email has been sent to your inbox.`,
        });
      }
    } catch (error) {
      console.error("Form validation error:", error);
    }
  };

  const handleManualContinue = () => {
    console.log("Manual continue button clicked");
    const currentStepFields: Record<number, (keyof FormValues)[]> = {
      1: ["eventDate", "startTime", "endTime", "attendees", "eventType"],
      2: ["companyName", "contactName", "contactEmail", "contactPhone"],
      3: [],
    };

    // Get the fields to validate for the current step
    const fieldsToValidate = currentStepFields[step] || [];
    
    // Trigger validation for the current step's fields
    form.trigger(fieldsToValidate).then((isValid) => {
      console.log("Form validation result:", isValid);
      
      if (isValid) {
        if (step < 3) {
          setStep(step + 1);
        } else {
          // For the final step, we'll submit the entire form
          form.handleSubmit(onSubmit)();
        }
      }
    });
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-4">
        {[1, 2, 3].map((i) => (
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
            {i < 3 && (
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

  if (isComplete) {
    return (
      <BookingConfirmation
        experienceTitle="Corporate Event Booking"
        date={form.getValues('eventDate') ? format(form.getValues('eventDate'), 'MMMM dd, yyyy') : ''}
        time={`${form.getValues('startTime')} - ${form.getValues('endTime')}`}
        guests={form.getValues('attendees')}
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
        <DrawerTitle className="text-center pt-2">Book a Corporate Event</DrawerTitle>
        <DrawerDescription className="text-center">
          {step === 1 ? "Event Details" : 
           step === 2 ? "Contact Information" : 
           "Additional Requirements"}
        </DrawerDescription>
      </DrawerHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 px-6">
          {renderStepIndicator()}
          
          {step === 1 && (
            <>
              <FormField
                control={form.control}
                name="eventDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Event Date</FormLabel>
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
                              <span>Select event date</span>
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

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Start time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={`start-${time}`} value={time}>
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
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="End time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={`end-${time}`} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="attendees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Attendees</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select number of attendees" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} attendees
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
                name="eventType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Event Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="meeting" />
                          </FormControl>
                          <FormLabel className="font-normal">Business Meeting</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="lunch" />
                          </FormControl>
                          <FormLabel className="font-normal">Business Lunch</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="dinner" />
                          </FormControl>
                          <FormLabel className="font-normal">Corporate Dinner</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="presentation" />
                          </FormControl>
                          <FormLabel className="font-normal">Presentation/Seminar</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 2 && (
            <>
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contact person's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="contact@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 3 && (
            <>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-lg mb-4">Event Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">
                      {form.getValues('eventDate') ? format(form.getValues('eventDate'), 'MMMM dd, yyyy') : ''}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">
                      {form.getValues('startTime')} - {form.getValues('endTime')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Attendees:</span>
                    <span className="font-medium">{form.getValues('attendees')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Event Type:</span>
                    <span className="font-medium">
                      {form.getValues('eventType')?.charAt(0).toUpperCase() + form.getValues('eventType')?.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Company:</span>
                    <span className="font-medium">{form.getValues('companyName')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contact:</span>
                    <span className="font-medium">{form.getValues('contactName')}</span>
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="requirements"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Additional Requirements</FormLabel>
                      <FormDescription>
                        Select any equipment or services you need for your event
                      </FormDescription>
                    </div>
                    {requirementItems.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="requirements"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value || [], item.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any other requirements or information we should know?" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
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
              type="button" 
              onClick={handleManualContinue}
              className="bg-airbnb-red hover:bg-airbnb-red/90 text-white"
            >
              {step === 3 ? 'Confirm Booking' : 'Continue'} 
              {step < 3 && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CorporateEventForm;
