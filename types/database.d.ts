export type ChatEntry = {
    id: number;
    created_at: string | null;
    title: string;
    user_id: string;
};

export interface Database {
    public: {
        Tables: {
            chats: {
                Row: ChatEntry;
            };
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
