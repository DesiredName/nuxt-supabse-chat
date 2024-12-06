// this is Supabase type
export type UserAuthID = string;

// custom types
export type UserProfileID = number;

export type ProfileEntry = {
    id: UserProfileID;
    user_id: UserAuthID;
    displayed_name: string | undefined;
    /** `true` if user wants it's profile to be visible by other users whens searched */
    is_public: boolean;
    /** `true` if user filled in profile data or skipped it */
    is_filled: boolean;
};

export type ChatEntry = {
    id: number;
    created_at: string | null;
    title: string;
    profile_id: UserProfileID;
};

export type ChatUsersEntry = {
    chat_id: number;
    profile_id: UserProfileID;
};

export type FriendEntry = {
    owner_id: UserProfileID;
    friend_id: UserProfileID;
};

export interface Database {
    public: {
        Tables: {
            chats: { Row: ChatEntry };
            chat_users: { Row: ChatUsersEntry };
            profiles: { Row: ProfileEntry };
            friends: { Row: FriendEntry };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}
