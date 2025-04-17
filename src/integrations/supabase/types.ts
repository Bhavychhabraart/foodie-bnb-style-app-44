export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chefs_specials: {
        Row: {
          chef: string
          created_at: string
          description: string
          id: string
          image_url: string | null
          is_new: boolean
          is_popular: boolean
          price: string
          rating: number
          title: string
          updated_at: string
        }
        Insert: {
          chef: string
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          is_new?: boolean
          is_popular?: boolean
          price: string
          rating?: number
          title: string
          updated_at?: string
        }
        Update: {
          chef?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          is_new?: boolean
          is_popular?: boolean
          price?: string
          rating?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          capacity: string | null
          category: string
          created_at: string
          date: string
          description: string | null
          featured: boolean
          host: string
          id: string
          image_url: string | null
          is_sold_out: boolean
          price: string
          rating: number
          reviews: number
          time: string
          title: string
          updated_at: string
          venue: string
        }
        Insert: {
          capacity?: string | null
          category?: string
          created_at?: string
          date: string
          description?: string | null
          featured?: boolean
          host: string
          id?: string
          image_url?: string | null
          is_sold_out?: boolean
          price: string
          rating?: number
          reviews?: number
          time: string
          title: string
          updated_at?: string
          venue: string
        }
        Update: {
          capacity?: string | null
          category?: string
          created_at?: string
          date?: string
          description?: string | null
          featured?: boolean
          host?: string
          id?: string
          image_url?: string | null
          is_sold_out?: boolean
          price?: string
          rating?: number
          reviews?: number
          time?: string
          title?: string
          updated_at?: string
          venue?: string
        }
        Relationships: []
      }
      offers: {
        Row: {
          coupon_code: string
          created_at: string
          description: string
          id: string
          image_url: string | null
          title: string
          updated_at: string
          valid_until: string
        }
        Insert: {
          coupon_code: string
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          title: string
          updated_at?: string
          valid_until: string
        }
        Update: {
          coupon_code?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          title?: string
          updated_at?: string
          valid_until?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          is_admin: boolean
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          is_admin?: boolean
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      reservation_guests: {
        Row: {
          cover_charge: number
          created_at: string
          gender: string
          id: string
          name: string | null
          reservation_id: string
          updated_at: string
        }
        Insert: {
          cover_charge?: number
          created_at?: string
          gender: string
          id?: string
          name?: string | null
          reservation_id: string
          updated_at?: string
        }
        Update: {
          cover_charge?: number
          created_at?: string
          gender?: string
          id?: string
          name?: string | null
          reservation_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservation_guests_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      reservation_tables: {
        Row: {
          created_at: string
          id: string
          reservation_id: string
          table_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          reservation_id: string
          table_id: string
        }
        Update: {
          created_at?: string
          id?: string
          reservation_id?: string
          table_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservation_tables_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservation_tables_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "restaurant_tables"
            referencedColumns: ["id"]
          },
        ]
      }
      reservations: {
        Row: {
          booking_type: string
          created_at: string
          date: string
          email: string
          id: string
          name: string
          phone: string
          special_requests: string | null
          status: string
          time: string
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          booking_type: string
          created_at?: string
          date: string
          email: string
          id?: string
          name: string
          phone: string
          special_requests?: string | null
          status?: string
          time: string
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          booking_type?: string
          created_at?: string
          date?: string
          email?: string
          id?: string
          name?: string
          phone?: string
          special_requests?: string | null
          status?: string
          time?: string
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      restaurant_tables: {
        Row: {
          capacity: number
          created_at: string
          id: string
          is_available: boolean
          location: string
          table_number: number
          updated_at: string
        }
        Insert: {
          capacity: number
          created_at?: string
          id?: string
          is_available?: boolean
          location: string
          table_number: number
          updated_at?: string
        }
        Update: {
          capacity?: number
          created_at?: string
          id?: string
          is_available?: boolean
          location?: string
          table_number?: number
          updated_at?: string
        }
        Relationships: []
      }
      spotlight: {
        Row: {
          capacity: string
          created_at: string
          date: string
          description: string
          featured: boolean
          id: string
          image_url: string | null
          price: string
          rating: number
          reviews: number
          time: string
          title: string
          updated_at: string
        }
        Insert: {
          capacity: string
          created_at?: string
          date: string
          description: string
          featured?: boolean
          id?: string
          image_url?: string | null
          price: string
          rating?: number
          reviews?: number
          time: string
          title: string
          updated_at?: string
        }
        Update: {
          capacity?: string
          created_at?: string
          date?: string
          description?: string
          featured?: boolean
          id?: string
          image_url?: string | null
          price?: string
          rating?: number
          reviews?: number
          time?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
