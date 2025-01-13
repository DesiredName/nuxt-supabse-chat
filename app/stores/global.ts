export const useGlobalStore = defineStore('global_store', () => {
    const use_user_store = useUserStore();
    const { user, user_name } = storeToRefs(use_user_store);

    const use_chats_store = useChatsStore();
    const { chats } = storeToRefs(use_chats_store);

    // actions
    async function refresh() {
        if (user == null) {
            await use_user_store.refresh();
        }

        if (chats.value.length === 0 && user != null) {
            await use_chats_store.refresh();
        }
    }

    async function clear() {
        await Promise.allSettled([
            use_user_store.clear(),
            use_chats_store.clear(),
        ]);
    }

    return {
        //
        user,
        chats,
        //
        user_name,
        //
        refresh,
        clear,
    };
});
