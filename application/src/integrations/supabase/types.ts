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
      profiles: {
        Row: {
          created_at: string | null
          default_buy_amount: number
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          default_buy_amount?: number
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          default_buy_amount?: number
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tokens: {
        Row: {
          category: Database["public"]["Enums"]["token_category"]
          created_at: string | null
          description: string
          id: string
          image_url: string
          market_cap: number
          name: string
          price: number
          price_change_24h: number
          risk_level: number
          symbol: string
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["token_category"]
          created_at?: string | null
          description: string
          id: string
          image_url: string
          market_cap: number
          name: string
          price: number
          price_change_24h: number
          risk_level: number
          symbol: string
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["token_category"]
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string
          market_cap?: number
          name?: string
          price?: number
          price_change_24h?: number
          risk_level?: number
          symbol?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_token_preferences: {
        Row: {
          created_at: string | null
          id: string
          preference: string
          token_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          preference: string
          token_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          preference?: string
          token_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_token_preferences_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "tokens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_token_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_tokens: {
        Row: {
          amount: number
          bought_at: number
          bought_date: string
          created_at: string | null
          id: string
          token_id: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          bought_at: number
          bought_date?: string
          created_at?: string | null
          id?: string
          token_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          bought_at?: number
          bought_date?: string
          created_at?: string | null
          id?: string
          token_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_tokens_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "tokens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      token_category: "meme" | "risky" | "new" | "bluechip" | "ai"
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
    Enums: {
      token_category: ["meme", "risky", "new", "bluechip", "ai"],
    },
  },
} as const
