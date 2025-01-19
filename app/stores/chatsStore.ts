import type { ChatEntry } from '~~/types/database.subtypes';

export const useChats = defineStore('user_chats', () => {
    const chats = useState<ChatEntry[]>('chats', () => []);

    async function refresh(_: string) {
        console.log(_);
        chats.value = await $fetch('/api/chats');
    }

    return {
        chats,

        refresh,
    };
});
