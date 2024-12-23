import type { SupabaseClient } from '@supabase/supabase-js';
import type { MessageEntry } from '~~/types/database.subtypes';
import type { Database } from '~~/types/database.types';

export const message_add = async (
    client: SupabaseClient<Database>,
    chat_id: string,
    content: string,
    type: number,
) => {
    const { data: message_id, error } = await client.rpc('message_add', {
        chat_id,
        content,
        type,
    });

    if (error != null) {
        throw new Error('Failed to add message to chat', {
            cause: error,
        });
    }

    return message_id as string | null;
};

export const message_edit = async (args: {
    client: SupabaseClient<Database>;
    message_id: string;
    chat_id: string;
    content: string;
}) => {
    const { client, chat_id, message_id, content } = args;
    const { data: was_edited, error } = await client.rpc('message_edit', {
        chat_id,
        message_id,
        content,
    });

    if (error != null) {
        throw new Error('Failed to edit message', {
            cause: error,
        });
    }

    return was_edited === true;
};

export const message_remove = async (args: {
    client: SupabaseClient<Database>;
    chat_id: string;
    message_id: string;
}) => {
    const { client, chat_id, message_id } = args;

    const { data: was_removed, error } = await client.rpc('message_remove', {
        chat_id,
        message_id,
    });

    if (error != null) {
        throw new Error('Failed to remove message from chat', {
            cause: error,
        });
    }

    return was_removed === true;
};

export const messages_get = async (args: {
    client: SupabaseClient<Database>;
    chat_id: string;
    last_message_ts?: string;
}): Promise<MessageEntry[]> => {
    const { client, chat_id, last_message_ts } = args;
    const { data: messages, error } = await client.rpc('messages_get', {
        chat_id,
        last_message_ts: last_message_ts ?? undefined,
    });

    if (error != null) {
        throw new Error('Failed to load messages from chat', {
            cause: error,
        });
    }

    return messages as MessageEntry[];
};
