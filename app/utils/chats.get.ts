import type { GetChatsListAPIResponse } from '~~/server/api/chats.get';

export const get_chats_list = () =>
    $fetch<GetChatsListAPIResponse>('/api/chats', {
        headers: useRequestHeaders(['cookie']),
    });
