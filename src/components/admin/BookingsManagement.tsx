
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface Booking {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  booking_type: string;
  status: string;
  special_requests?: string;
}

const BookingsManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const filteredBookings = bookings?.filter(booking => {
    const matchesSearch = 
      booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-500';
      case 'pending': return 'bg-yellow-500/20 text-yellow-500';
      case 'cancelled': return 'bg-red-500/20 text-red-500';
      case 'completed': return 'bg-blue-500/20 text-blue-500';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };

  const handleView = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by name, email or booking ID..."
            className="pl-8 bg-[#1E1E1E] border-airbnb-gold/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px] bg-[#1E1E1E] border-airbnb-gold/20">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-[#1E1E1E] border-airbnb-gold/20">
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        
        <Button className="bg-airbnb-gold text-airbnb-dark hover:bg-airbnb-gold/90">
          New Booking
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-airbnb-gold" />
        </div>
      ) : filteredBookings?.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No bookings found matching your filters
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-airbnb-gold/5 border-b border-airbnb-gold/20">
                <TableHead className="text-airbnb-light/70">ID</TableHead>
                <TableHead className="text-airbnb-light/70">Name</TableHead>
                <TableHead className="text-airbnb-light/70">Date</TableHead>
                <TableHead className="text-airbnb-light/70">Time</TableHead>
                <TableHead className="text-airbnb-light/70">Type</TableHead>
                <TableHead className="text-airbnb-light/70">Status</TableHead>
                <TableHead className="text-right text-airbnb-light/70">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings?.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-airbnb-gold/5 border-b border-airbnb-gold/20">
                  <TableCell className="text-sm text-airbnb-light">{booking.id.slice(0, 8)}</TableCell>
                  <TableCell className="font-medium text-airbnb-light">
                    <div>{booking.name}</div>
                    <div className="text-xs text-airbnb-light/70">{booking.email}</div>
                  </TableCell>
                  <TableCell className="text-airbnb-light">
                    {format(new Date(booking.date), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell className="text-airbnb-light">{booking.time}</TableCell>
                  <TableCell className="text-airbnb-light">{booking.booking_type}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-airbnb-gold/20 text-airbnb-light hover:bg-airbnb-gold/10 mr-2"
                      onClick={() => handleView(booking)}
                    >
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-airbnb-gold/20 text-airbnb-light hover:bg-airbnb-gold/10"
                      onClick={() => handleEdit(booking)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-airbnb-dark border border-airbnb-gold/20">
          <DialogHeader>
            <DialogTitle className="text-airbnb-light">Booking Details</DialogTitle>
            <DialogDescription className="text-airbnb-light/70">
              Viewing booking information for {selectedBooking?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-airbnb-light">
            <div>
              <p className="font-semibold">Booking ID</p>
              <p className="text-airbnb-light/70">{selectedBooking?.id}</p>
            </div>
            <div>
              <p className="font-semibold">Contact Information</p>
              <p className="text-airbnb-light/70">{selectedBooking?.email}</p>
            </div>
            <div>
              <p className="font-semibold">Date & Time</p>
              <p className="text-airbnb-light/70">
                {selectedBooking?.date && format(new Date(selectedBooking.date), 'MMM dd, yyyy')} at {selectedBooking?.time}
              </p>
            </div>
            <div>
              <p className="font-semibold">Booking Type</p>
              <p className="text-airbnb-light/70">{selectedBooking?.booking_type}</p>
            </div>
            <div>
              <p className="font-semibold">Status</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBooking?.status || '')}`}>
                {selectedBooking?.status.charAt(0).toUpperCase() + selectedBooking?.status.slice(1)}
              </span>
            </div>
            {selectedBooking?.special_requests && (
              <div>
                <p className="font-semibold">Special Requests</p>
                <p className="text-airbnb-light/70">{selectedBooking.special_requests}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-airbnb-dark border border-airbnb-gold/20">
          <DialogHeader>
            <DialogTitle className="text-airbnb-light">Edit Booking</DialogTitle>
            <DialogDescription className="text-airbnb-light/70">
              Update booking information for {selectedBooking?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Select
              value={selectedBooking?.status}
              onValueChange={(value) => setSelectedBooking(prev => ({ ...prev!, status: value }))}
            >
              <SelectTrigger className="w-full bg-[#1E1E1E] border-airbnb-gold/20">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              className="w-full bg-airbnb-gold text-airbnb-dark hover:bg-airbnb-gold/90"
              onClick={() => {
                // Handle update logic here
                setIsEditDialogOpen(false);
              }}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingsManagement;
