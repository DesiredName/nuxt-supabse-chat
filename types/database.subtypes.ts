import type { Database } from './database.types';

export const MessageType_TEXT = 1;
export const MessageType_IMAGE = 2;
export const MessageType_FILE = 3;

export const MessageStatus_NEW = 1;
export const MessageStatus_DELIVERED = 2;
export const MessageStatus_READ = 3;

export type UserAuthID = string;
export type ProfileEntry = Database['public']['Tables']['profiles']['Row'];
export type ChatEntry = Database['public']['Tables']['chats']['Row'];
export type ChatUsersEntry =
    Database['public']['Tables']['participants']['Row'];
export type FriendEntry = Database['public']['Tables']['friends']['Row'];
export type MessageHistoryEntry =
    Database['public']['Tables']['message_history']['Row'];
export type MessageEntry = Database['public']['Tables']['messages']['Row'];
