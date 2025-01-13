<template>
    <div>Processing...</div>
</template>

<script setup lang="ts">
    const { auth } = useSupabaseClient();
    const userStore = useUserStore();

    Promise.allSettled([
        auth.signOut({ scope: 'local' }),
        userStore.clear(),
    ]).finally(() => {
        navigateTo('/');
    });
</script>
