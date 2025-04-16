
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Mail, Phone, User, Users, MapPin, Clipboard, FileText, CalendarClock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

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

interface BookingHistory {
  id: string;
  status_changed_from: string | null;
  status_changed_to: string | null;
  changed_at: string;
  notes: string | null;
}

interface BookingDetailViewProps {
  booking: Booking;
  onStatusUpdate: (id: string, status: string) => void;
}

const BookingDetailView: React.FC<BookingDetailViewProps> = ({ booking, onStatusUpdate }) => {
  const [history, setHistory] = useState<BookingHistory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('booking_history')
          .select('*')
          .eq('booking_id', booking.id)
          .order('changed_at', { ascending: false });
          
        if (error) throw error;
        
        setHistory(data || []);
      } catch (error) {
        console.error('Error fetching booking history:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (booking.id) {
      fetchBookingHistory();
    }
  }, [booking.id]);

  const getStatusBadge = (status: string | null) => {
    if (!status) return null;
    
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

  return (
    <div className="mt-6 space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-airbnb-light">Reservation Information</h3>
          <Select
            value={booking.status.toLowerCase()}
            onValueChange={(value) => onStatusUpdate(booking.id, value)}
          >
            <SelectTrigger className="w-[120px] border-airbnb-gold/20">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-[#1E1E1E] border-airbnb-gold/20">
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="no-show">No Show</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 py-4">
          {/* Booking Type */}
          <div className="flex items-start gap-3">
            <Clipboard className="h-5 w-5 mt-0.5 text-airbnb-gold" />
            <div>
              <h4 className="text-sm font-medium text-airbnb-light">Booking Type</h4>
              <p className="text-sm text-airbnb-light/70">{getBookingTypeLabel(booking.booking_type)}</p>
              {booking.event_type && (
                <p className="text-xs text-airbnb-light/70 mt-1">{booking.event_type}</p>
              )}
            </div>
          </div>
          
          {/* Current Status */}
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 mt-0.5 text-airbnb-gold" />
            <div>
              <h4 className="text-sm font-medium text-airbnb-light">Current Status</h4>
              <div className="mt-1">{getStatusBadge(booking.status)}</div>
            </div>
          </div>
          
          {/* Guest Information */}
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 mt-0.5 text-airbnb-gold" />
            <div>
              <h4 className="text-sm font-medium text-airbnb-light">Guest Information</h4>
              <p className="text-sm text-airbnb-light">{booking.name}</p>
              <div className="flex items-center gap-1 mt-1">
                <Mail className="h-3.5 w-3.5 text-airbnb-light/70" />
                <p className="text-xs text-airbnb-light/70">{booking.email}</p>
              </div>
              {booking.phone && (
                <div className="flex items-center gap-1 mt-0.5">
                  <Phone className="h-3.5 w-3.5 text-airbnb-light/70" />
                  <p className="text-xs text-airbnb-light/70">{booking.phone}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Date and Time */}
          <div className="flex items-start gap-3">
            <CalendarClock className="h-5 w-5 mt-0.5 text-airbnb-gold" />
            <div>
              <h4 className="text-sm font-medium text-airbnb-light">Date & Time</h4>
              <div className="flex items-center mt-1">
                <Calendar className="h-3.5 w-3.5 mr-1 text-airbnb-light/70" />
                <p className="text-sm text-airbnb-light">{booking.date}</p>
              </div>
              <div className="flex items-center mt-1">
                <Clock className="h-3.5 w-3.5 mr-1 text-airbnb-light/70" />
                <p className="text-sm text-airbnb-light">{booking.time}</p>
              </div>
            </div>
          </div>
          
          {/* Party Details */}
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 mt-0.5 text-airbnb-gold" />
            <div>
              <h4 className="text-sm font-medium text-airbnb-light">Party Details</h4>
              <p className="text-sm text-airbnb-light">{booking.guests} guests</p>
              {booking.number_of_tables && (
                <p className="text-sm text-airbnb-light/70 mt-0.5">{booking.number_of_tables} tables reserved</p>
              )}
            </div>
          </div>
          
          {/* Seating Preference */}
          {booking.preferred_seating && (
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 mt-0.5 text-airbnb-gold" />
              <div>
                <h4 className="text-sm font-medium text-airbnb-light">Seating Preference</h4>
                <p className="text-sm text-airbnb-light/70">{booking.preferred_seating}</p>
              </div>
            </div>
          )}
          
          {/* Corporate Event Details */}
          {booking.booking_type === 'corporate-event' && booking.company_name && (
            <div className="flex items-start gap-3">
              <Clipboard className="h-5 w-5 mt-0.5 text-airbnb-gold" />
              <div>
                <h4 className="text-sm font-medium text-airbnb-light">Corporate Details</h4>
                <p className="text-sm text-airbnb-light">{booking.company_name}</p>
                {booking.event_purpose && (
                  <p className="text-xs text-airbnb-light/70 mt-0.5">Purpose: {booking.event_purpose}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Private Party Details */}
          {booking.booking_type === 'private-party' && booking.celebration_type && (
            <div className="flex items-start gap-3">
              <Clipboard className="h-5 w-5 mt-0.5 text-airbnb-gold" />
              <div>
                <h4 className="text-sm font-medium text-airbnb-light">Celebration Details</h4>
                <p className="text-sm text-airbnb-light">{booking.celebration_type}</p>
                {booking.special_occasion && (
                  <p className="text-xs text-airbnb-light/70 mt-0.5">Special Occasion</p>
                )}
              </div>
            </div>
          )}
          
          {/* Dietary Requirements */}
          {booking.dietary_requirements && (
            <div className="flex items-start gap-3">
              <Clipboard className="h-5 w-5 mt-0.5 text-airbnb-gold" />
              <div>
                <h4 className="text-sm font-medium text-airbnb-light">Dietary Requirements</h4>
                <p className="text-sm text-airbnb-light/70">{booking.dietary_requirements}</p>
              </div>
            </div>
          )}
          
          {/* Special Requests */}
          {booking.special_requests && (
            <div className="flex items-start gap-3">
              <Clipboard className="h-5 w-5 mt-0.5 text-airbnb-gold" />
              <div>
                <h4 className="text-sm font-medium text-airbnb-light">Special Requests</h4>
                <p className="text-sm text-airbnb-light/70">{booking.special_requests}</p>
              </div>
            </div>
          )}
          
          {/* Notes */}
          {booking.reservation_notes && (
            <div className="flex items-start gap-3">
              <Clipboard className="h-5 w-5 mt-0.5 text-airbnb-gold" />
              <div>
                <h4 className="text-sm font-medium text-airbnb-light">Additional Notes</h4>
                <p className="text-sm text-airbnb-light/70">{booking.reservation_notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Booking History */}
      <div className="pt-4 border-t border-airbnb-gold/20">
        <h3 className="text-lg font-medium text-airbnb-light mb-4">Booking History</h3>
        {loading ? (
          <p className="text-airbnb-light/70 text-center py-4">Loading history...</p>
        ) : history.length > 0 ? (
          <div className="space-y-3">
            {history.map((item) => (
              <div key={item.id} className="border-l-2 border-airbnb-gold/30 pl-4 py-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs text-airbnb-light/50">
                    {formatDistanceToNow(new Date(item.changed_at), { addSuffix: true })}
                  </p>
                </div>
                <div className="flex gap-2 mt-1">
                  {item.status_changed_from && getStatusBadge(item.status_changed_from)}
                  {item.status_changed_from && <span className="text-airbnb-light/50">→</span>}
                  {item.status_changed_to && getStatusBadge(item.status_changed_to)}
                </div>
                {item.notes && (
                  <p className="text-sm text-airbnb-light/70 mt-1">{item.notes}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-airbnb-light/70 text-center py-4">No history available</p>
        )}
      </div>
    </div>
  );
};

export default BookingDetailView;
