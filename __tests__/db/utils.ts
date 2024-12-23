import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '~~/types/database.types';
import type { UserCreds } from './types';

export const create_admin_client = () => {
    return createClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
};

export const create_user_client = () => {
    return createClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_KEY!,
    );
};

export const create_user = async (
    admin_client: SupabaseClient<Database>,
    credentials: UserCreds,
): Promise<string | null> => {
    const { data, error } = await admin_client.auth.admin.createUser({
        ...credentials,
        email_confirm: true,
    });

    if (error != null) {
        console.dir(credentials);
        throw new Error(`Failed to create user`, {
            cause: error,
        });
    }

    return data?.user?.id ?? null;
};

export const delete_user = async (
    admin_client: SupabaseClient<Database>,
    user_client: SupabaseClient<Database>,
) => {
    const { data, error } = await user_client.auth.getUser();

    if (error != null) {
        throw new Error('Failed to get client user', { cause: error });
    }

    await user_client.auth.signOut({ scope: 'global' });
    await admin_client.auth.admin.deleteUser(data.user.id, false);
};
