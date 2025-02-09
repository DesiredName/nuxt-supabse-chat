import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { ProfileScheme } from '~/utils/validation/profile.update';
import type { Database } from '~~/types/database.types';

export default eventHandler(async (event) => {
    const client = await serverSupabaseClient<Database>(event);
    const user = await serverSupabaseUser(event);

    if (user == null) {
        return null;
    }

    const body = await readValidatedBody(event, (body) =>
        ProfileScheme.safeParse(body),
    );

    if (body.success !== true) {
        return null;
    }

    const { data, error } = await client
        .from('profiles')
        .update(body.data)
        .eq('user_id', user.id)
        .select('id, is_public, is_filled, displayed_name')
        .single();

    return error == null ? data : null;
});
