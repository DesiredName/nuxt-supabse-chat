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
      chats: {
        Row: {
          created_at: string
          id: string
          title: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string | null
          user_id?: string
        }
        Relationships: []
      }
      friends: {
        Row: {
          friend_id: string
          owner_id: string
        }
        Insert: {
          friend_id: string
          owner_id: string
        }
        Update: {
          friend_id?: string
          owner_id?: string
        }
        Relationships: []
      }
      message_history: {
        Row: {
          message_id: string
          state: number | null
          user_id: string
        }
        Insert: {
          message_id: string
          state?: number | null
          user_id: string
        }
        Update: {
          message_id?: string
          state?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_history_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          chat_id: string
          content: string
          created_at: string
          id: string
          type: number | null
          user_id: string
        }
        Insert: {
          chat_id: string
          content?: string
          created_at?: string
          id?: string
          type?: number | null
          user_id: string
        }
        Update: {
          chat_id?: string
          content?: string
          created_at?: string
          id?: string
          type?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
        ]
      }
      participants: {
        Row: {
          chat_id: string
          user_id: string
        }
        Insert: {
          chat_id: string
          user_id: string
        }
        Update: {
          chat_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_users_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          displayed_name: string | null
          id: string
          is_filled: boolean
          is_public: boolean
          user_avatar: string | null
          user_id: string
        }
        Insert: {
          displayed_name?: string | null
          id?: string
          is_filled?: boolean
          is_public?: boolean
          user_avatar?: string | null
          user_id: string
        }
        Update: {
          displayed_name?: string | null
          id?: string
          is_filled?: boolean
          is_public?: boolean
          user_avatar?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      are_friends: {
        Args: {
          user_id_1: string
          user_id_2: string
        }
        Returns: boolean
      }
      chat_create: {
        Args: {
          title: string
        }
        Returns: {
          created_at: string
          id: string
          title: string | null
          user_id: string
        }
      }
      chat_get: {
        Args: {
          chat_id: string
        }
        Returns: {
          created_at: string
          id: string
          title: string | null
          user_id: string
        }[]
      }
      chat_remove: {
        Args: {
          chat_id: string
        }
        Returns: boolean
      }
      chat_update: {
        Args: {
          chat_id: string
          new_title: string
        }
        Returns: boolean
      }
      chats_get: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          id: string
          title: string | null
          user_id: string
        }[]
      }
      friend_add: {
        Args: {
          friend_id: string
        }
        Returns: boolean
      }
      friend_remove: {
        Args: {
          friend_id: string
        }
        Returns: boolean
      }
      friends_get: {
        Args: Record<PropertyKey, never>
        Returns: {
          displayed_name: string | null
          id: string
          is_filled: boolean
          is_public: boolean
          user_avatar: string | null
          user_id: string
        }[]
      }
      is_chat_owner: {
        Args: {
          chat_id: string
          user_id?: string
        }
        Returns: boolean
      }
      is_chat_participant: {
        Args: {
          chat_id: string
        }
        Returns: boolean
      }
      is_friend: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      message_add: {
        Args: {
          chat_id: string
          content: string
          type: number
        }
        Returns: string
      }
      message_edit: {
        Args: {
          chat_id: string
          message_id: string
          content: string
        }
        Returns: boolean
      }
      message_remove: {
        Args: {
          chat_id: string
          message_id: string
        }
        Returns: boolean
      }
      messages_get: {
        Args: {
          chat_id: string
          last_message_ts?: string
        }
        Returns: {
          chat_id: string
          content: string
          created_at: string
          id: string
          type: number | null
          user_id: string
        }[]
      }
      participant_add: {
        Args: {
          chat_id: string
          friend_id: string
        }
        Returns: boolean
      }
      profile_get: {
        Args: Record<PropertyKey, never>
        Returns: {
          displayed_name: string | null
          id: string
          is_filled: boolean
          is_public: boolean
          user_avatar: string | null
          user_id: string
        }[]
      }
      profile_update: {
        Args: {
          displayed_name?: string
          is_public?: boolean
        }
        Returns: boolean
      }
      profiles_search: {
        Args: {
          pattern: string
        }
        Returns: {
          displayed_name: string | null
          id: string
          is_filled: boolean
          is_public: boolean
          user_avatar: string | null
          user_id: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
