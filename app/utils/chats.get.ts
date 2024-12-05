import type { GetChatsListAPIResponse } from '~~/server/api/chats.get';

export const get_chats_list = () =>
    useFetch<GetChatsListAPIResponse>('/api/chats', {
        headers: useRequestHeaders(['cookie']),
        default: (): GetChatsListAPIResponse => ({
            chats: [],
        }),
    });
