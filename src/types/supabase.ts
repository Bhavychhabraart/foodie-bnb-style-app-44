
export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'canceled' | 'completed';
export type BookingType = 'standard' | 'corporate' | 'party';

export interface Booking {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  booking_type: BookingType;
  status: BookingStatus;
  special_requests: string | null;
  coupon_code: string | null;
  created_at: string;
  updated_at: string;
}

export interface CorporateEvent {
  id: string;
  booking_id: string;
  company_name: string;
  event_type: string;
  budget: number | null;
  catering_requirements: string | null;
  equipment_needed: string | null;
  created_at: string;
  updated_at: string;
}

export interface PrivateParty {
  id: string;
  booking_id: string;
  occasion: string;
  theme: string | null;
  cake_required: boolean;
  decoration_required: boolean;
  decoration_details: string | null;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  created_at: string;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  date_start: string | null;
  date_end: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChefSpecial {
  id: string;
  dish_name: string;
  description: string;
  price: number;
  image_url: string;
  chef_name: string;
  rating: number | null;
  is_vegetarian: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  coupon_code: string;
  discount_percentage: number | null;
  discount_amount: number | null;
  image_url: string | null;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface InstagramCollaboration {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram_handle: string;
  followers_count: number;
  message: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar_url: string | null;
  rating: number;
  review_text: string;
  is_approved: boolean;
  created_at: string;
}

export interface AdminUser {
  id: string;
  is_super_admin: boolean;
  created_at: string;
}
