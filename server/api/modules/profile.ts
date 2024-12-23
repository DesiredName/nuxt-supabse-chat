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
    new_profile_data: Pick<ProfileEntry, 'displayed_name' | 'is_public'>,
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
