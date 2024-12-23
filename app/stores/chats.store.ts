import { get_chats_list } from '~/utils/chats.get';
import type { ChatEntry } from '~~/types/database.subtypes';

export const useChatsStore = defineStore('chats_store', () => {
    // state
    const chats = useState<ChatEntry[]>('chats_list', () => []);

    // getters
    // actions
    async function refresh() {
        const { data, error } = await get_chats_list();

        if (error.value != null) {
            createError({
                fatal: false,
                statusMessage: 'failed to fetch chats data...',
            });
        } else {
            chats.value = data.value.chats;
        }
    }

    return {
        chats,
        refresh,
    };
});
