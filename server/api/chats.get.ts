import { serverSupabaseClient } from '#supabase/server';
import type { ChatEntry } from '~~/types/database.subtypes';
import type { Database } from '~~/types/database.types';

export type GetChatsListAPIResponse =
    | {
          error: Error;
          data: null;
      }
    | {
          error: null;
          data: ChatEntry[];
      };

export default eventHandler<Promise<GetChatsListAPIResponse>>(async (event) => {
    const client = await serverSupabaseClient<Database>(event);

    const { error, data } = await client
        .from('chats')
        .select<'*', ChatEntry>('*');

    if (error == null) {
        return { error, data };
    } else {
        return { error, data };
    }
});
