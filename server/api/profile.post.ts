import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { ProfileSchemeObject } from '~/schemes/profile.update';
import type { Database } from '~~/types/database.types';
import type { UserProfile } from './profile.get';

export default eventHandler<Promise<UserProfile>>(async (event) => {
    try {
        const client = await serverSupabaseClient<Database>(event);
        const user = await serverSupabaseUser(event);

        if (user == null) {
            return null;
        }

        const body = await readValidatedBody(event, (body) =>
            ProfileSchemeObject.safeParse(body),
        );

        if (body.success !== true) {
            return null;
        }

        const { data, error } = await client
            .from('profiles')
            .update(body.data)
            .eq('user_id', user.id)
            .select('id, is_public, is_filled, displayed_name, user_avatar')
            .single();

        return error == null ? data : null;
    } catch (ex) {
        console.log(ex);
        return null;
    }
});
