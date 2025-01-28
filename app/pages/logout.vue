<template>
    <div>Processing...</div>
</template>

<script setup lang="ts">
    const { auth } = useSupabaseClient();
    const userStore = useUserStore();
    const localePath = useLocalePath();
    const cookie = useCookieLocale();

    Promise.allSettled([
        auth.signOut({ scope: 'local' }),
        userStore.clear(),
    ]).finally(() => {
        navigateTo(localePath('/' + cookie.value));
    });
</script>
