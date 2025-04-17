
import React, { useState, useEffect } from 'react';
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
  User as MaleIcon, 
  UserCircle2 as FemaleIcon 
} from 'lucide-react';
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
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface StandardBookingFormProps {
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
  time: z.string().min(1, "Please select a time"),
  maleCount: z.number().min(0, "Cannot be negative").default(0),
  femaleCount: z.number().min(0, "Cannot be negative").default(0),
  tableId: z.string().optional(),
  specialRequests: z.string().optional(),
  couponCode: z.string().optional(),
  skipQueue: z.boolean().default(false),
  addOns: z.object({
    skipQueue: z.boolean().default(false),
    discount: z.boolean().default(false),
    dessert: z.boolean().default(false),
  }).default({}),
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
  const [availableTables, setAvailableTables] = useState<any[]>([]);
  const [isLoadingTables, setIsLoadingTables] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: undefined,
      time: "",
      maleCount: 0,
      femaleCount: 0,
      tableId: undefined,
      specialRequests: "",
      couponCode: "",
      addOns: {
        skipQueue: false,
        discount: false,
        dessert: false,
      },
    },
    mode: "onChange",
  });

  const maleCount = form.watch('maleCount');
  const femaleCount = form.watch('femaleCount');
  const selectedDate = form.watch('date');
  const selectedTime = form.watch('time');
  const addOns = form.watch('addOns');
  
  const totalGuests = maleCount + femaleCount;
  
  const basePrice = totalGuests * 1000;
  
  const queueSkipPrice = addOns.skipQueue ? 100 : 0;
  
  const totalAmount = basePrice + queueSkipPrice;

  useEffect(() => {
    // When date and time are selected, fetch available tables
    if (selectedDate && selectedTime && totalGuests > 0) {
      fetchAvailableTables();
    }
  }, [selectedDate, selectedTime, totalGuests]);

  const fetchAvailableTables = async () => {
    if (!selectedDate || !selectedTime) return;
    
    setIsLoadingTables(true);
    try {
      // Convert date to ISO string for the query
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      
      // Get all tables that can fit our party size
      const { data: tables, error: tablesError } = await supabase
        .from('restaurant_tables')
        .select('*')
        .gte('capacity', totalGuests)
        .eq('is_available', true)
        .order('capacity', { ascending: true });
      
      if (tablesError) throw tablesError;
      
      if (!tables || tables.length === 0) {
        setAvailableTables([]);
        setIsLoadingTables(false);
        return;
      }
      
      // Now check which tables are already reserved for this time slot
      const { data: reservations, error: reservationsError } = await supabase
        .from('reservations')
        .select('id')
        .eq('date', dateStr)
        .eq('time', selectedTime)
        .eq('status', 'confirmed');
      
      if (reservationsError) throw reservationsError;
      
      let unavailableTableIds: string[] = [];
      
      if (reservations && reservations.length > 0) {
        // Get all reservation_tables entries for these reservations
        const reservationIds = reservations.map(res => res.id);
        
        const { data: reservedTables, error: reservedTablesError } = await supabase
          .from('reservation_tables')
          .select('table_id')
          .in('reservation_id', reservationIds);
        
        if (reservedTablesError) throw reservedTablesError;
        
        if (reservedTables && reservedTables.length > 0) {
          unavailableTableIds = reservedTables.map(rt => rt.table_id);
        }
      }
      
      // Filter out unavailable tables
      const filteredTables = tables.filter(table => !unavailableTableIds.includes(table.id));
      
      setAvailableTables(filteredTables);
    } catch (error) {
      console.error('Error fetching available tables:', error);
      toast({
        title: "Error fetching available tables",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoadingTables(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      if (values.maleCount > 0 && values.femaleCount > 0) {
        if (values.maleCount > (values.femaleCount * 2)) {
          toast({
            title: "Gender Ratio Violation",
            description: "Maximum 2 males per female allowed.",
            variant: "destructive"
          });
          return;
        }
      }
      
      const { data: { user } } = await supabase.auth.getUser();
      
      // Convert date to ISO format for storage
      const dateFormatted = format(values.date, 'yyyy-MM-dd');
      
      const { data: reservationData, error: reservationError } = await supabase
        .from('reservations')
        .insert({
          user_id: user?.id || null,
          booking_type: 'standard',
          name: values.name,
          email: values.email,
          phone: values.phone,
          date: dateFormatted,
          time: values.time,
          total_amount: totalAmount,
          special_requests: values.specialRequests || null,
          status: 'pending'
        })
        .select('id')
        .single();

      if (reservationError) throw reservationError;

      // If a table was selected, link it to the reservation
      if (selectedTableId) {
        const { error: tableError } = await supabase
          .from('reservation_tables')
          .insert({
            reservation_id: reservationData.id,
            table_id: selectedTableId
          });
          
        if (tableError) throw tableError;
      }

      const maleGuests = Array(values.maleCount).fill({
        reservation_id: reservationData.id,
        name: 'Male Guest',
        gender: 'male',
        cover_charge: 1000
      });

      const femaleGuests = Array(values.femaleCount).fill({
        reservation_id: reservationData.id,
        name: 'Female Guest',
        gender: 'female',
        cover_charge: 1000
      });

      const allGuests = [...maleGuests, ...femaleGuests];

      if (allGuests.length > 0) {
        const { error: guestsError } = await supabase
          .from('reservation_guests')
          .insert(allGuests);

        if (guestsError) throw guestsError;
      }

      setIsComplete(true);
      
      let confirmationMessage = `Your table for ${totalGuests} guests is reserved for ${format(values.date, 'MMMM dd, yyyy')} at ${values.time}.`;
      
      if (values.addOns.skipQueue) {
        confirmationMessage += " With queue skip.";
      }
      
      if (values.addOns.discount) {
        confirmationMessage += " 15% discount for next 5 visits.";
      }
      
      if (values.addOns.dessert) {
        confirmationMessage += " With complimentary dessert.";
      }
      
      toast({
        title: "Reservation Successful",
        description: confirmationMessage,
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

  const handleManualContinue = () => {
    const currentStepFields: Record<number, (keyof FormValues)[]> = {
      1: ["date", "time", "maleCount", "femaleCount"],
      2: ["name", "email", "phone"],
      3: [] // No specific validations for add-ons step
    };

    const fieldsToValidate = currentStepFields[step] || [];
    
    if (step === 1) {
      const totalGuests = form.getValues('maleCount') + form.getValues('femaleCount');
      if (totalGuests === 0) {
        toast({
          title: "No guests selected",
          description: "Please add at least one guest",
          variant: "destructive"
        });
        return;
      }
      
      const maleCount = form.getValues('maleCount');
      const femaleCount = form.getValues('femaleCount');
      if (maleCount > 0 && femaleCount > 0) {
        if (maleCount > (femaleCount * 2)) {
          toast({
            title: "Gender Ratio Violation",
            description: "Maximum 2 males per female allowed.",
            variant: "destructive"
          });
          return;
        }
      }
    }
    
    form.trigger(fieldsToValidate).then((isValid) => {
      if (isValid) {
        if (step < 3) {
          setStep(step + 1);
        } else {
          form.handleSubmit(onSubmit)();
        }
      }
    });
  };

  const handleSelectTable = (tableId: string) => {
    setSelectedTableId(tableId);
    form.setValue('tableId', tableId);
  };
  
  const renderTableSelection = () => {
    if (!selectedDate || !selectedTime || totalGuests === 0) {
      return (
        <div className="text-center py-4 text-sm text-muted-foreground">
          Please select date, time and guest count to see available tables
        </div>
      );
    }
    
    if (isLoadingTables) {
      return (
        <div className="text-center py-4">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading available tables...</p>
        </div>
      );
    }
    
    if (availableTables.length === 0) {
      return (
        <div className="text-center py-4 text-sm text-destructive">
          No tables available for {totalGuests} guests at this time. Please select a different date or time.
        </div>
      );
    }
    
    return (
      <div className="max-h-48 overflow-y-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Table #</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead className="w-[100px]">Select</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {availableTables.map((table) => (
              <TableRow 
                key={table.id}
                className={selectedTableId === table.id ? "bg-accent/50" : ""}
              >
                <TableCell className="font-medium">{table.table_number}</TableCell>
                <TableCell>{table.location}</TableCell>
                <TableCell>{table.capacity} guests</TableCell>
                <TableCell>
                  <Button
                    variant={selectedTableId === table.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSelectTable(table.id)}
                  >
                    {selectedTableId === table.id ? "Selected" : "Select"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  if (isComplete) {
    return (
      <BookingConfirmation
        experienceTitle="Standard Table Booking"
        date={form.getValues('date') ? format(form.getValues('date'), 'MMMM dd, yyyy') : ''}
        time={form.getValues('time')}
        guests={totalGuests.toString()}
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
           step === 2 ? "Contact Information" : 
           "Add-on Options"}
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
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedTableId(null);
                      }} 
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

              <div className="border rounded-lg p-4 space-y-4">
                <h3 className="font-medium">Guest Count</h3>
                
                <FormField
                  control={form.control}
                  name="maleCount"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MaleIcon className="h-5 w-5 text-blue-500" />
                          <FormLabel>Male Guests</FormLabel>
                        </div>
                        <div className="flex items-center">
                          <Button 
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              if (field.value > 0) {
                                field.onChange(field.value - 1);
                                setSelectedTableId(null);
                              }
                            }}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{field.value}</span>
                          <Button 
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              if (maleCount + femaleCount < 10) {
                                field.onChange(field.value + 1);
                                setSelectedTableId(null);
                              } else {
                                toast({
                                  title: "Maximum guests reached",
                                  description: "You can add up to 10 guests total",
                                  variant: "destructive"
                                });
                              }
                            }}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="femaleCount"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FemaleIcon className="h-5 w-5 text-pink-500" />
                          <FormLabel>Female Guests</FormLabel>
                        </div>
                        <div className="flex items-center">
                          <Button 
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              if (field.value > 0) {
                                field.onChange(field.value - 1);
                                setSelectedTableId(null);
                              }
                            }}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{field.value}</span>
                          <Button 
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              if (maleCount + femaleCount < 10) {
                                field.onChange(field.value + 1);
                                setSelectedTableId(null);
                              } else {
                                toast({
                                  title: "Maximum guests reached",
                                  description: "You can add up to 10 guests total",
                                  variant: "destructive"
                                });
                              }
                            }}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="text-sm text-muted-foreground mt-2">
                  Total Guests: {totalGuests} {totalGuests > 0 && `(Cover charge: ₹${basePrice})`}
                </div>
                
                {maleCount > 0 && femaleCount > 0 && maleCount > (femaleCount * 2) && (
                  <div className="text-sm text-destructive font-medium">
                    Gender ratio violation: Maximum 2 males per female allowed
                  </div>
                )}
              </div>

              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-medium mb-2">Available Tables</h3>
                {renderTableSelection()}
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

          {step === 3 && (
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
                    <span className="font-medium">{totalGuests} ({maleCount} male, {femaleCount} female)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Cover Charge:</span>
                    <span className="font-medium">₹{basePrice}</span>
                  </div>
                  {addOns.skipQueue && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Skip Queue Fee:</span>
                      <span className="font-medium">₹100</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t mt-2 font-semibold">
                    <span>Total:</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-4">
                <h3 className="font-medium">Add-on Options</h3>
                <p className="text-sm text-muted-foreground">Enhance your experience with these additional options</p>
                
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="addOns.skipQueue"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Skip the Queue (₹100)</FormLabel>
                          <FormDescription>
                            No waiting in line - get immediate entry to the venue
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="addOns.discount"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>15% Discount for 5 Visits</FormLabel>
                          <FormDescription>
                            Receive a special 15% discount for your next 5 visits
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="addOns.dessert"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Complimentary Dessert</FormLabel>
                          <FormDescription>
                            Enjoy a free chef's special dessert with your meal
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mt-4 py-3 border-t">
                  <p className="text-sm font-medium">If no add-ons are selected, standard gate charges apply</p>
                </div>
              </div>
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
              disabled={step === 1 && availableTables.length > 0 && !selectedTableId}
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

export default StandardBookingForm;
