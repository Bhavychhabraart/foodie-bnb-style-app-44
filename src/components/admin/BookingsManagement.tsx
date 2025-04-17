
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, Edit, Eye, Trash2, UserCog, Calendar, Clock, Phone, Mail, Users, FileText, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  status: string;
  booking_type: string;
  total_amount: number;
  special_requests: string | null;
  created_at: string;
  updated_at: string;
  guest_count?: number;
};

type BookingWithGuests = Booking & {
  guests: {
    id: string;
    name: string;
    gender: string;
    cover_charge: number;
  }[];
  tables: {
    id: string;
    table_number: number;
    location: string;
    capacity: number;
  }[];
};

const statusColors: Record<string, string> = {
  pending: 'bg-amber-500',
  confirmed: 'bg-green-500',
  cancelled: 'bg-red-500',
  completed: 'bg-blue-500',
  no_show: 'bg-gray-500'
};

const BookingsManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<BookingWithGuests | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editStatus, setEditStatus] = useState('');

  const itemsPerPage = 10;
  const { toast } = useToast();
  
  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [searchTerm, statusFilter, bookings]);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        // Get guest counts for each reservation
        const bookingsWithCounts = await Promise.all(
          data.map(async (booking) => {
            const { count } = await supabase
              .from('reservation_guests')
              .select('*', { count: 'exact', head: true })
              .eq('reservation_id', booking.id);

            return {
              ...booking,
              guest_count: count || 0
            };
          })
        );

        setBookings(bookingsWithCounts);
        setTotalPages(Math.ceil(bookingsWithCounts.length / itemsPerPage));
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error loading bookings",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = [...bookings];
    
    // Apply search filter
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(booking => 
        booking.name.toLowerCase().includes(lowercaseSearch) ||
        booking.email.toLowerCase().includes(lowercaseSearch) ||
        booking.phone.toLowerCase().includes(lowercaseSearch)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }
    
    // Update total pages based on filtered results
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    
    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBookings = filtered.slice(startIndex, startIndex + itemsPerPage);
    
    setFilteredBookings(paginatedBookings);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * itemsPerPage;
    let filtered = [...bookings];
    
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(booking => 
        booking.name.toLowerCase().includes(lowercaseSearch) ||
        booking.email.toLowerCase().includes(lowercaseSearch) ||
        booking.phone.toLowerCase().includes(lowercaseSearch)
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }
    
    const paginatedBookings = filtered.slice(startIndex, startIndex + itemsPerPage);
    setFilteredBookings(paginatedBookings);
  };

  const handleView = async (booking: Booking) => {
    try {
      setIsProcessing(true);
      
      // Get detailed information about this booking
      const [guestsResult, tablesResult] = await Promise.all([
        supabase
          .from('reservation_guests')
          .select('*')
          .eq('reservation_id', booking.id),
        supabase
          .from('reservation_tables')
          .select('table_id')
          .eq('reservation_id', booking.id)
      ]);

      let tables = [];
      if (tablesResult.data && tablesResult.data.length > 0) {
        const tableIds = tablesResult.data.map(t => t.table_id);
        const { data: tablesData } = await supabase
          .from('restaurant_tables')
          .select('*')
          .in('id', tableIds);
        
        tables = tablesData || [];
      }

      const bookingWithDetails: BookingWithGuests = {
        ...booking,
        guests: guestsResult.data || [],
        tables: tables
      };

      setSelectedBooking(bookingWithDetails);
      setEditStatus(booking.status);
      setViewDialogOpen(true);
    } catch (error) {
      console.error('Error fetching booking details:', error);
      toast({
        title: "Error",
        description: "Could not load booking details",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEdit = (booking: Booking) => {
    setSelectedBooking({
      ...booking,
      guests: [],
      tables: []
    });
    setEditStatus(booking.status);
    setEditDialogOpen(true);
  };

  const handleDelete = (booking: Booking) => {
    setSelectedBooking({
      ...booking,
      guests: [],
      tables: []
    });
    setDeleteDialogOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedBooking) return;
    
    try {
      setIsProcessing(true);
      
      const { error } = await supabase
        .from('reservations')
        .update({ status: editStatus })
        .eq('id', selectedBooking.id);
      
      if (error) throw error;
      
      // Update local state
      setBookings(bookings.map(booking => 
        booking.id === selectedBooking.id 
          ? { ...booking, status: editStatus } 
          : booking
      ));
      
      // Close the dialog
      setEditDialogOpen(false);
      
      toast({
        title: "Status Updated",
        description: `Booking status has been updated to ${editStatus}`
      });
      
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast({
        title: "Update Failed",
        description: "Could not update booking status",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteBooking = async () => {
    if (!selectedBooking) return;
    
    try {
      setIsProcessing(true);
      
      // Delete related records first
      await Promise.all([
        supabase
          .from('reservation_guests')
          .delete()
          .eq('reservation_id', selectedBooking.id),
        supabase
          .from('reservation_tables')
          .delete()
          .eq('reservation_id', selectedBooking.id)
      ]);
      
      // Then delete the booking
      const { error } = await supabase
        .from('reservations')
        .delete()
        .eq('id', selectedBooking.id);
      
      if (error) throw error;
      
      // Update local state
      setBookings(bookings.filter(booking => booking.id !== selectedBooking.id));
      
      // Close the dialog
      setDeleteDialogOpen(false);
      
      toast({
        title: "Booking Deleted",
        description: "The booking has been permanently deleted"
      });
      
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast({
        title: "Delete Failed",
        description: "Could not delete the booking",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const renderBookingStatusBadge = (status: string) => {
    const color = statusColors[status] || 'bg-gray-500';
    return (
      <Badge className={`${color} text-white`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'PPP');
    } catch (e) {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-8 w-8 animate-spin text-airbnb-gold" />
        <p className="ml-2 text-airbnb-light">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-col md:flex-row">
        <div className="flex items-center space-x-2 w-full md:w-auto mb-4 md:mb-0">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-airbnb-light h-4 w-4" />
            <Input 
              placeholder="Search by name, email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-airbnb-dark border-airbnb-gold/30"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-airbnb-dark border-airbnb-gold/30">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="no_show">No Show</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={fetchBookings} className="bg-airbnb-dark border-airbnb-gold/30 w-full md:w-auto">
          Refresh
        </Button>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-10 border border-dashed rounded-md border-airbnb-gold/30">
          <p className="text-airbnb-light">No bookings found</p>
        </div>
      ) : (
        <div className="rounded-md border border-airbnb-gold/30 overflow-hidden">
          <Table>
            <TableHeader className="bg-airbnb-dark/70">
              <TableRow className="hover:bg-airbnb-dark/90 border-airbnb-gold/30">
                <TableHead>Name</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-airbnb-dark/50 border-airbnb-gold/10">
                  <TableCell className="font-medium">
                    <div>{booking.name}</div>
                    <div className="text-sm text-airbnb-light">{booking.email}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{formatDate(booking.date)}</span>
                      <span className="text-sm text-airbnb-light">{booking.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-airbnb-gold/30 text-airbnb-gold">
                      {booking.booking_type}
                    </Badge>
                  </TableCell>
                  <TableCell>{booking.guest_count || '-'}</TableCell>
                  <TableCell>₹{booking.total_amount.toLocaleString()}</TableCell>
                  <TableCell>{renderBookingStatusBadge(booking.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => handleView(booking)}>
                        <Eye className="h-4 w-4 text-airbnb-gold" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(booking)}>
                        <Edit className="h-4 w-4 text-airbnb-gold" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(booking)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* View Booking Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-airbnb-dark border-airbnb-gold/30 text-airbnb-light">
          <DialogHeader>
            <DialogTitle className="text-airbnb-gold">Booking Details</DialogTitle>
            <DialogDescription>
              Complete information about this booking.
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <UserCog className="h-4 w-4 mr-2 text-airbnb-gold" />
                    <span className="font-medium">Customer</span>
                  </div>
                  <div className="pl-6 space-y-1">
                    <div>{selectedBooking.name}</div>
                    
                    <div className="flex items-center text-sm text-airbnb-light">
                      <Mail className="h-3 w-3 mr-1" />
                      <span>{selectedBooking.email}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-airbnb-light">
                      <Phone className="h-3 w-3 mr-1" />
                      <span>{selectedBooking.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-airbnb-gold" />
                    <span className="font-medium">Reservation</span>
                  </div>
                  <div className="pl-6 space-y-1">
                    <div>{formatDate(selectedBooking.date)}</div>
                    
                    <div className="flex items-center text-sm text-airbnb-light">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{selectedBooking.time}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-airbnb-light">
                      <Users className="h-3 w-3 mr-1" />
                      <span>{selectedBooking.guests.length} guests</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedBooking.tables.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Tables className="h-4 w-4 mr-2 text-airbnb-gold" />
                    <span className="font-medium">Table Information</span>
                  </div>
                  <div className="pl-6 space-y-1">
                    {selectedBooking.tables.map((table) => (
                      <div key={table.id}>
                        Table #{table.table_number} ({table.location}) - Capacity: {table.capacity}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedBooking.special_requests && (
                <div className="space-y-2">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-airbnb-gold" />
                    <span className="font-medium">Special Requests</span>
                  </div>
                  <div className="pl-6 bg-black/20 p-3 rounded-md">
                    {selectedBooking.special_requests}
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-center pt-4 border-t border-airbnb-gold/20">
                <div>
                  <span className="text-airbnb-light">Status: </span>
                  {renderBookingStatusBadge(selectedBooking.status)}
                </div>
                <div className="text-right">
                  <div className="text-airbnb-gold font-bold text-lg">₹{selectedBooking.total_amount.toLocaleString()}</div>
                  <div className="text-xs text-airbnb-light">Total Amount</div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Booking Status Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-airbnb-dark border-airbnb-gold/30 text-airbnb-light">
          <DialogHeader>
            <DialogTitle className="text-airbnb-gold">Update Booking Status</DialogTitle>
            <DialogDescription>
              Change the current status of this booking.
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="font-medium">{selectedBooking.name}</div>
                  <div className="text-sm text-airbnb-light">{formatDate(selectedBooking.date)} · {selectedBooking.time}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">₹{selectedBooking.total_amount.toLocaleString()}</div>
                  <div className="text-sm text-airbnb-light">{selectedBooking.booking_type}</div>
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <div className="font-medium">Current Status:</div>
                <div className="px-3 py-2 bg-black/20 rounded-md flex items-center">
                  {renderBookingStatusBadge(selectedBooking.status)}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="font-medium">New Status:</div>
                <Select value={editStatus} onValueChange={setEditStatus}>
                  <SelectTrigger className="w-full bg-black/20 border-airbnb-gold/30">
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="no_show">No Show</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <DialogFooter className="pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setEditDialogOpen(false)}
                  className="border-airbnb-gold/30"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleUpdateStatus}
                  className="bg-airbnb-red hover:bg-airbnb-red/90"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Update Status
                    </>
                  )}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-airbnb-dark border-airbnb-gold/30 text-airbnb-light">
          <DialogHeader>
            <DialogTitle className="text-destructive">Delete Booking</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The booking will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="grid gap-4 py-4">
              <div className="bg-black/20 p-4 rounded-md">
                <div className="font-medium">{selectedBooking.name}</div>
                <div className="text-sm text-airbnb-light">
                  {formatDate(selectedBooking.date)} · {selectedBooking.time}
                </div>
                <div className="text-sm text-airbnb-light mt-2">
                  {selectedBooking.booking_type} · ₹{selectedBooking.total_amount.toLocaleString()}
                </div>
              </div>
              
              <DialogFooter className="pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setDeleteDialogOpen(false)}
                  className="border-airbnb-gold/30"
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive"
                  onClick={handleDeleteBooking}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-2 h-4 w-4" />
                      Delete Permanently
                    </>
                  )}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingsManagement;
