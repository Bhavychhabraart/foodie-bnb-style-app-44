
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string
          is_super_admin: boolean
          created_at: string
        }
        Insert: {
          id: string
          is_super_admin?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          is_super_admin?: boolean
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string | null
          name: string
          email: string
          phone: string
          date: string
          time: string
          guests: number
          booking_type: string
          status: string
          special_requests: string | null
          coupon_code: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          email: string
          phone: string
          date: string
          time: string
          guests: number
          booking_type?: string
          status?: string
          special_requests?: string | null
          coupon_code?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          email?: string
          phone?: string
          date?: string
          time?: string
          guests?: number
          booking_type?: string
          status?: string
          special_requests?: string | null
          coupon_code?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      chef_specials: {
        Row: {
          id: string
          dish_name: string
          description: string
          price: number
          image_url: string
          chef_name: string
          rating: number | null
          is_vegetarian: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          dish_name: string
          description: string
          price: number
          image_url: string
          chef_name: string
          rating?: number | null
          is_vegetarian?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          dish_name?: string
          description?: string
          price?: number
          image_url?: string
          chef_name?: string
          rating?: number | null
          is_vegetarian?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      corporate_events: {
        Row: {
          id: string
          booking_id: string
          company_name: string
          event_type: string
          budget: number | null
          catering_requirements: string | null
          equipment_needed: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          company_name: string
          event_type: string
          budget?: number | null
          catering_requirements?: string | null
          equipment_needed?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          company_name?: string
          event_type?: string
          budget?: number | null
          catering_requirements?: string | null
          equipment_needed?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      experiences: {
        Row: {
          id: string
          title: string
          description: string
          price: number
          image_url: string
          date_start: string | null
          date_end: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          price: number
          image_url: string
          date_start?: string | null
          date_end?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          price?: number
          image_url?: string
          date_start?: string | null
          date_end?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      gallery: {
        Row: {
          id: string
          url: string
          alt: string
          created_at: string
        }
        Insert: {
          id?: string
          url: string
          alt: string
          created_at?: string
        }
        Update: {
          id?: string
          url?: string
          alt?: string
          created_at?: string
        }
      }
      instagram_collaborations: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          instagram_handle: string
          followers_count: number
          message: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          instagram_handle: string
          followers_count: number
          message?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          instagram_handle?: string
          followers_count?: number
          message?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      offers: {
        Row: {
          id: string
          title: string
          description: string
          coupon_code: string
          discount_percentage: number | null
          discount_amount: number | null
          image_url: string | null
          valid_from: string
          valid_until: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          coupon_code: string
          discount_percentage?: number | null
          discount_amount?: number | null
          image_url?: string | null
          valid_from: string
          valid_until: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          coupon_code?: string
          discount_percentage?: number | null
          discount_amount?: number | null
          image_url?: string | null
          valid_from?: string
          valid_until?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      private_parties: {
        Row: {
          id: string
          booking_id: string
          occasion: string
          theme: string | null
          cake_required: boolean
          decoration_required: boolean
          decoration_details: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          occasion: string
          theme?: string | null
          cake_required?: boolean
          decoration_required?: boolean
          decoration_details?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          occasion?: string
          theme?: string | null
          cake_required?: boolean
          decoration_required?: boolean
          decoration_details?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          email: string | null
          phone: string | null
          created_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          phone?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          phone?: string | null
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          avatar_url: string | null
          rating: number
          review_text: string
          is_approved: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          avatar_url?: string | null
          rating: number
          review_text: string
          is_approved?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          avatar_url?: string | null
          rating?: number
          review_text?: string
          is_approved?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      booking_status: "pending" | "confirmed" | "canceled" | "completed"
      booking_type: "standard" | "corporate" | "party"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          id: string
          name: string
          owner: string | null
          created_at: string | null
          updated_at: string | null
          public: boolean | null
        }
        Insert: {
          id: string
          name: string
          owner?: string | null
          created_at?: string | null
          updated_at?: string | null
          public?: boolean | null
        }
        Update: {
          id?: string
          name?: string
          owner?: string | null
          created_at?: string | null
          updated_at?: string | null
          public?: boolean | null
        }
      }
      objects: {
        Row: {
          id: string
          bucket_id: string
          name: string
          owner: string | null
          created_at: string | null
          updated_at: string | null
          last_accessed_at: string | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          bucket_id: string
          name: string
          owner?: string | null
          created_at?: string | null
          updated_at?: string | null
          last_accessed_at?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          bucket_id?: string
          name?: string
          owner?: string | null
          created_at?: string | null
          updated_at?: string | null
          last_accessed_at?: string | null
          metadata?: Json | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
