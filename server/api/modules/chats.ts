import type { SupabaseClient } from '@supabase/supabase-js';
import type { ChatEntry } from '~~/types/database.subtypes';
import type { Database } from '~~/types/database.types';

export const chat_create = async (
    client: SupabaseClient<Database>,
    chat_title: string,
): Promise<ChatEntry | null> => {
    const { data: chat, error } = await client.rpc('chat_create', {
        title: chat_title,
    });

    if (error != null) {
        throw new Error('Failed to create chat', { cause: error });
    }

    return chat;
};

export async function chat_get(
    client: SupabaseClient<Database>,
    chat_id: string,
): Promise<null | ChatEntry> {
    const { data: chats, error } = await client.rpc('chat_get', { chat_id });

    if (error != null) {
        throw new Error('Failed to fetch chat data', {
            cause: error,
        });
    }

    return chats[0] ?? null;
}

export const chat_update = async (
    client: SupabaseClient<Database>,
    chat_id: string,
    new_title: string,
) => {
    const { data: was_updated, error } = await client.rpc('chat_update', {
        chat_id,
        new_title,
    });

    if (error != null) {
        throw new Error('Failed to update chat', { cause: error });
    }

    return was_updated === true;
};

export const chat_remove = async (
    client: SupabaseClient<Database>,
    chat_id: string,
) => {
    const { data: was_deleted, error } = await client.rpc('chat_remove', {
        chat_id,
    });

    if (error != null) {
        throw new Error('Failed to remvoe chat', { cause: error });
    }

    return was_deleted === true;
};

export async function chats_get(
    client: SupabaseClient<Database>,
): Promise<ChatEntry[]> {
    const { data: chats, error } = await client.rpc('chats_get');

    if (error != null) {
        throw new Error('Failed to fetch list of users chats', {
            cause: error,
        });
    }

    if (chats == null) {
        throw new Error('Failed to fetch list of users chats');
    }

    return chats as ChatEntry[];
}

export async function is_chat_owner(
    client: SupabaseClient<Database>,
    chat_id: string,
) {
    const { data: is_owned, error } = await client.rpc('is_chat_owner', {
        chat_id,
    });

    if (error != null) {
        throw new Error('Failed to check if chat belongs to user', {
            cause: error,
        });
    }

    return is_owned === true;
}

export async function is_chat_participant(
    client: SupabaseClient<Database>,
    chat_id: string,
) {
    const { data: is_participant, error } = await client.rpc(
        'is_chat_participant',
        { chat_id },
    );

    if (error != null) {
        throw new Error('Failed to check if user is chat participant', {
            cause: error,
        });
    }

    return is_participant === true;
}
