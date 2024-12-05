<template>
    <div>
        <h2>Chats list</h2>
        <hr />
        {{ user }}
        <hr />
        {{ chats }}
        <hr />
        <NuxtLink to="/logout">Logout</NuxtLink>
    </div>
</template>

<script setup lang="ts">
    import type { User } from '@supabase/supabase-js';

    const user = useState<User | null>('user_data', () => null);
    const chats = useState<object[]>('chats_list', () => []);

    const refresh_data = async (from: string) => {
        const sp_user = useSupabaseUser();
        const client = useSupabaseClient();

        const { data } = await useAsyncData<object[]>(
            'chats_request',
            async () => {
                const { data } = await client
                    .from('chats')
                    .select<string, object>('*');
                return data ?? [];
            },
            {
                default: () => [],
            },
        );

        user.value = sp_user.value;
        chats.value = data.value;

        console.log(from);
    };

    onServerPrefetch(async () => {
        await refresh_data('server');
    });

    onMounted(async () => {
        if (user.value == null || chats.value.length === 0) {
            await refresh_data('client');
        }
    });
</script>
