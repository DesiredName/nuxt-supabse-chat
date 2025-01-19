import { serverSupabaseClient } from '#supabase/server';
import type { ChatEntry } from '~~/types/database.subtypes';
import type { Database } from '~~/types/database.types';
import { chats_get } from './modules/chats';

export default eventHandler<Promise<ChatEntry[]>>(async (event) => {
    const client = await serverSupabaseClient<Database>(event);
    const chats = await chats_get(client);

    return chats;
});
