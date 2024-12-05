import type { User } from '@supabase/supabase-js';

export const useUserStore = defineStore('user_store', () => {
    // state
    const user = ref<User | null>(null);

    // getters
    const user_name = computed(() => {
        const val = user.value;

        return (
            val?.user_metadata?.user_name ??
            val?.user_metadata?.full_name ??
            val?.user_metadata?.email ??
            val?.email
        );
    });

    // actions
    async function refresh() {
        user.value = useSupabaseUser().value;
    }

    return {
        user,
        user_name,
        refresh,
    };
});
