import { serverSupabaseClient } from '#supabase/server';
import type { ChatEntry, Database } from '~~/types/database';

export type GetChatsListAPIResponse = {
    chats: ChatEntry[];
};

export default eventHandler<Promise<GetChatsListAPIResponse>>(async (event) => {
    const client = await serverSupabaseClient<Database>(event);

    const { data } = await client.from('chats').select<'*', ChatEntry>('*');

    return { chats: data ?? [] };
});
