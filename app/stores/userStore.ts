import type { User } from '@supabase/supabase-js';

export const useUserStore = defineStore('user_store', () => {
    const user = useState<User | null>('user_data', () => useSupabaseUser());

    const user_name = computed(() => {
        const val = user.value;
        const user_name =
            val?.user_metadata?.preferred_name ??
            val?.user_metadata?.user_name ??
            val?.user_metadata?.full_name ??
            val?.user_metadata?.email ??
            val?.email;

        return user_name;
    });

    async function clear() {
        user.value = null;
    }

    return {
        user,
        user_name,

        clear,
    };
});
