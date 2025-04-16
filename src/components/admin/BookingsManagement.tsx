
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Search } from 'lucide-react';

// Define booking type
type Booking = {
  id: string;
  name: string;
  date: string;
  time: string;
  party_size: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  contact_email: string;
  contact_phone: string;
};

const BookingsManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data for bookings since we're not connecting to database yet
  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      const mockBookings: Booking[] = [
        {
          id: '1',
          name: 'John Doe',
          date: '2025-04-20',
          time: '19:00',
          party_size: 4,
          status: 'confirmed',
          contact_email: 'john@example.com',
          contact_phone: '555-123-4567'
        },
        {
          id: '2',
          name: 'Jane Smith',
          date: '2025-04-21',
          time: '20:00',
          party_size: 2,
          status: 'pending',
          contact_email: 'jane@example.com',
          contact_phone: '555-987-6543'
        },
        {
          id: '3',
          name: 'Alex Johnson',
          date: '2025-04-22',
          time: '18:30',
          party_size: 6,
          status: 'completed',
          contact_email: 'alex@example.com',
          contact_phone: '555-456-7890'
        },
        {
          id: '4',
          name: 'Sarah Williams',
          date: '2025-04-23',
          time: '19:30',
          party_size: 3,
          status: 'cancelled',
          contact_email: 'sarah@example.com',
          contact_phone: '555-789-0123'
        }
      ];
      
      setBookings(mockBookings);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter bookings based on search query and status
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.contact_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Get status color based on booking status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-500';
      case 'pending': return 'bg-yellow-500/20 text-yellow-500';
      case 'cancelled': return 'bg-red-500/20 text-red-500';
      case 'completed': return 'bg-blue-500/20 text-blue-500';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      <CardHeader className="px-0">
        <CardTitle className="text-xl font-semibold text-airbnb-light">Reservations Management</CardTitle>
      </CardHeader>
      
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
        
        <Button className="bg-airbnb-gold text-airbnb-light hover:bg-airbnb-gold/90">
          New Booking
        </Button>
      </div>
      
      <Card className="bg-[#1E1E1E] border border-airbnb-gold/20 shadow-md overflow-hidden">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-airbnb-gold" />
            </div>
          ) : filteredBookings.length === 0 ? (
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
                    <TableHead className="text-airbnb-light/70">Party</TableHead>
                    <TableHead className="text-airbnb-light/70">Status</TableHead>
                    <TableHead className="text-right text-airbnb-light/70">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-airbnb-gold/5 border-b border-airbnb-gold/20">
                      <TableCell className="text-sm text-airbnb-light">{booking.id}</TableCell>
                      <TableCell className="font-medium text-airbnb-light">
                        <div>{booking.name}</div>
                        <div className="text-xs text-airbnb-light/70">{booking.contact_email}</div>
                      </TableCell>
                      <TableCell className="text-airbnb-light">{booking.date}</TableCell>
                      <TableCell className="text-airbnb-light">{booking.time}</TableCell>
                      <TableCell className="text-airbnb-light">{booking.party_size}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="border-airbnb-gold/20 text-airbnb-light hover:bg-airbnb-gold/10 mr-2">
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="border-airbnb-gold/20 text-airbnb-light hover:bg-airbnb-gold/10">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingsManagement;
