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
      bookings: {
        Row: {
          booking_type: string
          coupon_code: string | null
          created_at: string
          date: string
          email: string
          guests: number
          id: string
          name: string
          phone: string | null
          special_requests: string | null
          status: string
          time: string
          user_id: string | null
        }
        Insert: {
          booking_type?: string
          coupon_code?: string | null
          created_at?: string
          date: string
          email: string
          guests: number
          id?: string
          name: string
          phone?: string | null
          special_requests?: string | null
          status?: string
          time: string
          user_id?: string | null
        }
        Update: {
          booking_type?: string
          coupon_code?: string | null
          created_at?: string
          date?: string
          email?: string
          guests?: number
          id?: string
          name?: string
          phone?: string | null
          special_requests?: string | null
          status?: string
          time?: string
          user_id?: string | null
        }
        Relationships: []
      }
      chef_specials: {
        Row: {
          chef: string
          created_at: string
          description: string | null
          id: string
          image_url: string
          is_featured: boolean | null
          price: string
          rating: number | null
          title: string
        }
        Insert: {
          chef: string
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          is_featured?: boolean | null
          price: string
          rating?: number | null
          title: string
        }
        Update: {
          chef?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          is_featured?: boolean | null
          price?: string
          rating?: number | null
          title?: string
        }
        Relationships: []
      }
      experiences: {
        Row: {
          created_at: string
          date: string
          description: string | null
          host: string
          id: string
          image_url: string
          is_featured: boolean | null
          is_sold_out: boolean | null
          price: string
          rating: number | null
          reviews: number | null
          title: string
        }
        Insert: {
          created_at?: string
          date: string
          description?: string | null
          host?: string
          id?: string
          image_url: string
          is_featured?: boolean | null
          is_sold_out?: boolean | null
          price: string
          rating?: number | null
          reviews?: number | null
          title: string
        }
        Update: {
          created_at?: string
          date?: string
          description?: string | null
          host?: string
          id?: string
          image_url?: string
          is_featured?: boolean | null
          is_sold_out?: boolean | null
          price?: string
          rating?: number | null
          reviews?: number | null
          title?: string
        }
        Relationships: []
      }
      gallery: {
        Row: {
          alt_text: string | null
          caption: string | null
          created_at: string
          id: string
          image_url: string
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          id?: string
          image_url: string
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          id?: string
          image_url?: string
        }
        Relationships: []
      }
      instagram_collaborations: {
        Row: {
          created_at: string
          email: string
          followers_count: number
          id: string
          instagram_handle: string
          message: string | null
          name: string
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          followers_count: number
          id?: string
          instagram_handle: string
          message?: string | null
          name: string
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          followers_count?: number
          id?: string
          instagram_handle?: string
          message?: string | null
          name?: string
          status?: string
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
      testimonials: {
        Row: {
          avatar_url: string
          created_at: string
          date: string
          id: string
          name: string
          rating: number
          text: string
        }
        Insert: {
          avatar_url: string
          created_at?: string
          date: string
          id?: string
          name: string
          rating: number
          text: string
        }
        Update: {
          avatar_url?: string
          created_at?: string
          date?: string
          id?: string
          name?: string
          rating?: number
          text?: string
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
