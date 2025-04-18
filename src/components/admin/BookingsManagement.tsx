import React from 'react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Check, X, MessageSquare } from 'lucide-react';

// Define the Booking type
interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  booking_type: string;
  status: string;
  total_amount: number;
  special_requests?: string;
}

// Format date utility function
const formatDate = (dateString: string): string => {
  try {
    // Try to parse the date string and format it
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy');
  } catch (error) {
    // Return the original string if parsing fails
    return dateString;
  }
};

const handleWhatsAppMessage = (booking: Booking) => {
  const confirmationMessage = `Hello ${booking.name}! 🎉\n\n` +
    `Your magical dining experience at Hacha is all set! ✨\n\n` +
    `Booking Details:\n` +
    `Date: ${formatDate(booking.date)}\n` +
    `Time: ${booking.time}\n` +
    `Booking Type: ${booking.booking_type}\n` +
    `Total: ₹${booking.total_amount.toLocaleString()}\n\n` +
    `We can't wait to dazzle you with an unforgettable culinary journey. See you soon! 🍽️💫\n\n` +
    `Warmly,\nThe Hacha Team`;

  // Ensure phone number starts with +91
  const phoneNumber = booking.phone.startsWith('+91') 
    ? booking.phone.replace(/\D/g, '') 
    : `91${booking.phone.replace(/\D/g, '')}`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(confirmationMessage)}`;
  window.open(whatsappUrl, '_blank');
};

const BookingsManagement: React.FC = () => {
  const { data: bookings, isLoading, refetch } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data as Booking[];
    }
  });

  const updateBookingStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('reservations')
      .update({ status })
      .eq('id', id);
    
    if (!error) {
      refetch();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-airbnb-light">Recent Bookings</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-airbnb-gold/20 hover:bg-airbnb-gold/10"
          onClick={() => refetch()}
        >
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-airbnb-gold/60">Loading bookings...</p>
        </div>
      ) : bookings && bookings.length > 0 ? (
        <div className="rounded-md border border-airbnb-gold/20 overflow-hidden">
          <Table>
            <TableHeader className="bg-airbnb-dark/70">
              <TableRow className="hover:bg-airbnb-dark/90 border-airbnb-gold/20">
                <TableHead className="text-airbnb-gold/80">Name</TableHead>
                <TableHead className="text-airbnb-gold/80">Date & Time</TableHead>
                <TableHead className="text-airbnb-gold/80">Type</TableHead>
                <TableHead className="text-airbnb-gold/80">Amount</TableHead>
                <TableHead className="text-airbnb-gold/80">Status</TableHead>
                <TableHead className="text-airbnb-gold/80">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow 
                  key={booking.id} 
                  className="hover:bg-airbnb-gold/5 border-airbnb-gold/10"
                >
                  <TableCell className="text-airbnb-light">
                    <div>
                      <p className="font-medium">{booking.name}</p>
                      <p className="text-xs text-airbnb-gold/60">{booking.email}</p>
                      <p className="text-xs text-airbnb-gold/60">{booking.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-airbnb-light">
                    <p>{formatDate(booking.date)}</p>
                    <p className="text-xs text-airbnb-gold/60">{booking.time}</p>
                  </TableCell>
                  <TableCell className="text-airbnb-light">
                    {booking.booking_type}
                  </TableCell>
                  <TableCell className="text-airbnb-light">
                    ₹{booking.total_amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-500/20 text-green-500' 
                        : booking.status === 'pending' 
                        ? 'bg-yellow-500/20 text-yellow-500'
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-500/10"
                        onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                        onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-500/10"
                        onClick={() => handleWhatsAppMessage(booking)}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8 border border-dashed border-airbnb-gold/20 rounded-md">
          <p className="text-airbnb-gold/60">No bookings found</p>
        </div>
      )}
    </div>
  );
};

export { handleWhatsAppMessage };
export default BookingsManagement;
