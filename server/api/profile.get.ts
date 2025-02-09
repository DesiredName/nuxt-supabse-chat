import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import type { EventHandlerRequest, H3Event } from 'h3';
import type { Database } from '~~/types/database.types';

export type UserProfile = Awaited<ReturnType<typeof execute>>;

export default eventHandler<Promise<UserProfile>>(async (event) => {
    return execute(event) as Promise<UserProfile>;
});

async function execute(event: H3Event<EventHandlerRequest>) {
    try {
        const client = await serverSupabaseClient<Database>(event);
        const user = await serverSupabaseUser(event);

        if (user == null) {
            return null;
        }

        const { data, error } = await client
            .from('profiles')
            .select('id, is_public, is_filled, displayed_name, user_avatar')
            .eq('user_id', user.id)
            .single();

        return error == null ? data : null;
    } catch (ex) {
        console.log(ex);
        return null;
    }
}
