<template>
    <div>Processing...</div>
</template>

<script setup lang="ts">
    const { auth } = useSupabaseClient();
    const user = useState<unknown | null>('user_data', () => null);
    const chats = useState<object[]>('chats_list', () => []);

    user.value = null;
    chats.value = [];

    await auth
        .signOut({
            scope: 'global',
        })
        .finally(() => navigateTo('/'));
</script>
