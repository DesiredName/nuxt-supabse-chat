import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import type { Database } from '~~/types/database.types';

export default eventHandler(async (event) => {
    try {
        const client = await serverSupabaseClient<Database>(event);
        const user = await serverSupabaseUser(event);

        if (user == null) {
            return null;
        }

        const { data, error } = await client
            .from('profiles')
            .select('id, is_public, is_filled, displayed_name')
            .eq('user_id', user.id)
            .single();

        return error == null ? data : null;
    } catch (ex) {
        console.log(ex);
        return null;
    }
});
