export const useGlobalStore = defineStore('global_store', () => {
    const use_user_store = useUserStore();
    const { user, user_name } = storeToRefs(use_user_store);
    const { refresh: refresh_user_store } = use_user_store;

    const use_chats_store = useChatsStore();
    const { chats } = storeToRefs(use_chats_store);
    const { refresh: refresh_chats_store } = use_chats_store;

    // actions
    async function refresh() {
        await Promise.allSettled([refresh_user_store(), refresh_chats_store()]);
    }

    return {
        //
        user,
        chats,
        //
        user_name,
        //
        refresh,
    };
});
