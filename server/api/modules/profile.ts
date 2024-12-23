import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProfileEntry } from '~~/types/database.subtypes';
import type { Database } from '~~/types/database.types';

export const profile_get = async (
    client: SupabaseClient<Database>,
): Promise<null | ProfileEntry> => {
    const { data: profiles, error } = await client.rpc('profile_get');

    if (error != null) {
        throw new Error('Failed to fetch profile data', {
            cause: error,
        });
    }

    return profiles[0] ?? null;
};

export const profile_update = async (
    client: SupabaseClient<Database>,
    new_profile_data: { displayed_name?: string; is_public?: boolean },
) => {
    const { data: was_updated, error } = await client.rpc('profile_update', {
        ...new_profile_data,
    });

    if (error != null) {
        throw new Error('Failed to update profile data', {
            cause: error,
        });
    }

    return was_updated === true;
};

export const profiles_search = async (
    client: SupabaseClient<Database>,
    pattern: string,
): Promise<ProfileEntry[]> => {
    const { data: profiles, error } = await client.rpc('profiles_search', {
        pattern,
    });

    if (error != null) {
        throw new Error('Failed to search for profile data', {
            cause: error,
        });
    }

    return profiles;
};
