
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, DollarSign, MoreHorizontal } from 'lucide-react';

// Mock data for recent bookings
const bookings = [
  {
    id: 'B001',
    guest: 'Emma Watson',
    date: '2025-05-10',
    experience: 'Wine Tasting Tour',
    amount: '$120.00',
    status: 'confirmed'
  },
  {
    id: 'B002',
    guest: 'John Smith',
    date: '2025-05-12',
    experience: 'Cooking Class',
    amount: '$85.00',
    status: 'pending'
  },
  {
    id: 'B003',
    guest: 'Michael Johnson',
    date: '2025-05-15',
    experience: 'Fine Dining Menu',
    amount: '$210.00',
    status: 'confirmed'
  },
  {
    id: 'B004',
    guest: 'Sophia Martinez',
    date: '2025-05-18',
    experience: 'Private Event',
    amount: '$350.00',
    status: 'cancelled'
  },
  {
    id: 'B005',
    guest: 'Robert Brown',
    date: '2025-05-20',
    experience: 'Chef\'s Special Dinner',
    amount: '$175.00',
    status: 'confirmed'
  }
];

// Helper function to format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Helper function to generate status badge
const getStatusBadge = (status: string) => {
  switch(status) {
    case 'confirmed':
      return <Badge className="bg-airbnb-gold/20 text-airbnb-gold border border-airbnb-gold/20">Confirmed</Badge>;
    case 'pending':
      return <Badge className="bg-amber-500/20 text-amber-500 border border-amber-500/20">Pending</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-500/20 text-red-500 border border-red-500/20">Cancelled</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const DashboardTable = () => {
  return (
    <div className="rounded-md border border-airbnb-gold/20 overflow-hidden">
      <Table>
        <TableHeader className="bg-[#1A1A1A]">
          <TableRow className="hover:bg-[#1E1E1E] border-airbnb-gold/10">
            <TableHead className="text-airbnb-light/70">Booking ID</TableHead>
            <TableHead className="text-airbnb-light/70">Guest</TableHead>
            <TableHead className="text-airbnb-light/70">Date</TableHead>
            <TableHead className="text-airbnb-light/70">Experience</TableHead>
            <TableHead className="text-airbnb-light/70">Amount</TableHead>
            <TableHead className="text-airbnb-light/70">Status</TableHead>
            <TableHead className="text-airbnb-light/70 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id} className="hover:bg-[#1A1A1A] border-airbnb-gold/10">
              <TableCell className="font-medium text-airbnb-light">{booking.id}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-airbnb-gold/80" />
                  <span className="text-airbnb-light">{booking.guest}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-airbnb-gold/80" />
                  <span className="text-airbnb-light">{formatDate(booking.date)}</span>
                </div>
              </TableCell>
              <TableCell className="text-airbnb-light">{booking.experience}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1 text-airbnb-gold/80" />
                  <span className="text-airbnb-light">{booking.amount}</span>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(booking.status)}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="text-airbnb-light hover:bg-airbnb-gold/10">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardTable;
