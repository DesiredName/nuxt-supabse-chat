import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProfileEntry } from '~~/types/database.subtypes';
import type { Database } from '~~/types/database.types';

export const is_friend = async (
    client: SupabaseClient<Database>,
    user_id: string,
) => {
    const { data: is_friend, error } = await client.rpc('is_friend', {
        user_id,
    });

    if (error != null) {
        throw new Error('Failed to fetch is friend', {
            cause: error,
        });
    }

    return is_friend === true;
};

export const are_friends = async (args: {
    client: SupabaseClient<Database>;
    user_id: string;
    friend_id: string;
}) => {
    const { client, user_id, friend_id } = args;
    const { data: are_friends, error } = await client.rpc('are_friends', {
        user_id_1: user_id,
        user_id_2: friend_id,
    });

    if (error != null) {
        throw new Error('Failed to check are friends', {
            cause: error,
        });
    }

    return are_friends === true;
};

export const friend_add = async (
    client: SupabaseClient<Database>,
    friend_id: string,
) => {
    const { data: was_added, error } = await client.rpc('friend_add', {
        friend_id,
    });

    if (error != null) {
        throw new Error('Failed to add friend', {
            cause: error,
        });
    }

    return was_added === true;
};

export const friend_remove = async (
    client: SupabaseClient<Database>,
    friend_id: string,
) => {
    const { data: was_removed, error } = await client.rpc('friend_remove', {
        friend_id,
    });

    if (error != null) {
        throw new Error('Failed to remove friend', {
            cause: error,
        });
    }

    return was_removed === true;
};

export const friends_get = async (
    client: SupabaseClient<Database>,
): Promise<ProfileEntry[]> => {
    const { data, error } = await client.rpc('friends_get');

    if (error != null) {
        throw new Error('Failed to fetch chat data', {
            cause: error,
        });
    }

    return data as ProfileEntry[];
};
