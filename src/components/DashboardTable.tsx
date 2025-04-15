
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
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const DashboardTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Booking ID</TableHead>
          <TableHead>Guest</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Experience</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell className="font-medium">{booking.id}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-400" />
                {booking.guest}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                {formatDate(booking.date)}
              </div>
            </TableCell>
            <TableCell>{booking.experience}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                {booking.amount}
              </div>
            </TableCell>
            <TableCell>{getStatusBadge(booking.status)}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DashboardTable;
