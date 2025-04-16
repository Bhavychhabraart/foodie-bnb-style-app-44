
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Sheet, SheetContent, SheetDescription, 
  SheetHeader, SheetTitle, SheetClose, SheetFooter 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Info, Pencil, Trash2, User, Users } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { formatDistance } from 'date-fns';
import BookingDetailView from './BookingDetailView';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  date: string;
  time: string;
  guests: number;
  booking_type: string;
  status: string;
  created_at: string;
  special_requests: string | null;
  event_type: string | null;
  number_of_tables: number | null;
  company_name: string | null;
  event_purpose: string | null;
  dietary_requirements: string | null;
  celebration_type: string | null;
  special_occasion: boolean | null;
  preferred_seating: string | null;
  reservation_notes: string | null;
}

const BookingsManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error",
        description: "Failed to load bookings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      // Get the previous status
      const booking = bookings.find(b => b.id === id);
      const previousStatus = booking?.status;
      
      // Update booking status
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      // Create history record
      await supabase
        .from('booking_history')
        .insert({
          booking_id: id,
          status_changed_from: previousStatus,
          status_changed_to: status,
          changed_by_user_id: user?.id,
          notes: `Status changed by admin from ${previousStatus} to ${status}`
        });
      
      toast({
        title: "Status Updated",
        description: `Booking status has been updated to ${status}`,
      });
      
      // Refresh bookings
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast({
        title: "Error",
        description: "Failed to update booking status. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsSheetOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch(status.toLowerCase()) {
      case 'confirmed':
        return <Badge className="bg-airbnb-gold/20 text-airbnb-gold border border-airbnb-gold/20">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500/20 text-amber-500 border border-amber-500/20">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500/20 text-red-500 border border-red-500/20">Cancelled</Badge>;
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-500 border border-green-500/20">Completed</Badge>;
      case 'no-show':
        return <Badge className="bg-gray-500/20 text-gray-500 border border-gray-500/20">No Show</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getBookingTypeLabel = (type: string) => {
    switch(type.toLowerCase()) {
      case 'standard':
        return "Standard Reservation";
      case 'private-party':
        return "Private Party";
      case 'corporate-event':
        return "Corporate Event";
      default:
        return type;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = statusFilter === "all" || booking.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesType = typeFilter === "all" || booking.booking_type.toLowerCase() === typeFilter.toLowerCase();
    return matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-airbnb-light">Reservation Management</h2>
        
        <div className="flex flex-col md:flex-row gap-3">
          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-[#1E1E1E] border-airbnb-gold/20">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-[#1E1E1E] border-airbnb-gold/20">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="no-show">No Show</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px] bg-[#1E1E1E] border-airbnb-gold/20">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent className="bg-[#1E1E1E] border-airbnb-gold/20">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="private-party">Private Party</SelectItem>
                <SelectItem value="corporate-event">Corporate Event</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={fetchBookings} 
            variant="outline" 
            size="sm" 
            className="border-airbnb-gold/20 text-airbnb-light hover:bg-airbnb-gold/10"
          >
            Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="flex flex-col items-center">
            <Clock className="h-8 w-8 animate-spin text-airbnb-gold mb-4" />
            <p className="text-airbnb-light">Loading bookings...</p>
          </div>
        </div>
      ) : (
        <div className="rounded-md border border-airbnb-gold/20 overflow-hidden">
          <div className="overflow-x-auto w-full">
            <Table>
              <TableCaption>A list of all reservations</TableCaption>
              <TableHeader className="bg-[#1A1A1A]">
                <TableRow className="hover:bg-[#1E1E1E] border-airbnb-gold/10">
                  <TableHead className="text-airbnb-light/70">Guest</TableHead>
                  <TableHead className="text-airbnb-light/70">Date & Time</TableHead>
                  <TableHead className="text-airbnb-light/70">Party</TableHead>
                  <TableHead className="text-airbnb-light/70">Type</TableHead>
                  <TableHead className="text-airbnb-light/70">Status</TableHead>
                  <TableHead className="text-airbnb-light/70">Created</TableHead>
                  <TableHead className="text-airbnb-light/70 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-[#1A1A1A] border-airbnb-gold/10">
                      <TableCell>
                        <div>
                          <p className="font-medium text-airbnb-light">{booking.name}</p>
                          <p className="text-sm text-airbnb-light/70">{booking.email}</p>
                          {booking.phone && <p className="text-sm text-airbnb-light/70">{booking.phone}</p>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1.5 text-airbnb-gold/80" />
                            <span className="text-airbnb-light">{booking.date}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <Clock className="h-3.5 w-3.5 mr-1.5 text-airbnb-gold/80" />
                            <span className="text-airbnb-light">{booking.time}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="h-3.5 w-3.5 mr-1.5 text-airbnb-gold/80" />
                          <span className="text-airbnb-light">{booking.guests} guests</span>
                        </div>
                        {booking.number_of_tables && (
                          <p className="text-xs text-airbnb-light/70 mt-1">
                            {booking.number_of_tables} tables
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-airbnb-light">{getBookingTypeLabel(booking.booking_type)}</span>
                        {booking.event_type && (
                          <p className="text-xs text-airbnb-light/70 mt-1">{booking.event_type}</p>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell>
                        <span className="text-sm text-airbnb-light/70">
                          {formatDistance(new Date(booking.created_at), new Date(), { addSuffix: true })}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewDetails(booking)}
                            title="View Details"
                            className="text-airbnb-light hover:bg-airbnb-gold/10"
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                          <Select
                            value={booking.status.toLowerCase()}
                            onValueChange={(value) => updateBookingStatus(booking.id, value)}
                          >
                            <SelectTrigger className="w-[110px] h-8 border-airbnb-gold/20 bg-transparent">
                              <SelectValue placeholder="Change status" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1E1E1E] border-airbnb-gold/20">
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirm</SelectItem>
                              <SelectItem value="cancelled">Cancel</SelectItem>
                              <SelectItem value="completed">Complete</SelectItem>
                              <SelectItem value="no-show">No Show</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-airbnb-light/70">
                        <Calendar className="h-10 w-10 mb-2 text-airbnb-gold/30" />
                        <p>No reservations found</p>
                        {(statusFilter !== "all" || typeFilter !== "all") && (
                          <p className="text-sm mt-1">Try changing your filters</p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-airbnb-light">Reservation Details</SheetTitle>
            <SheetDescription className="text-airbnb-light/70">
              View and manage reservation information.
            </SheetDescription>
          </SheetHeader>
          {selectedBooking && (
            <BookingDetailView booking={selectedBooking} onStatusUpdate={updateBookingStatus} />
          )}
          <SheetFooter className="mt-6">
            <SheetClose asChild>
              <Button className="w-full bg-airbnb-gold text-white hover:bg-airbnb-gold/90">
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BookingsManagement;
