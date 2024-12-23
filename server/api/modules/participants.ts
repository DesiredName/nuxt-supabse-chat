import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~~/types/database.types';

export const participant_add = async (args: {
    client: SupabaseClient<Database>;
    chat_id: string;
    friend_id: string;
}) => {
    const { client, chat_id, friend_id } = args;
    const { data: was_updated, error } = await client.rpc('participant_add', {
        chat_id,
        friend_id,
    });

    if (error != null) {
        throw new Error('Failed to add chat participant', {
            cause: error,
        });
    }

    return was_updated === true;
};
