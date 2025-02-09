<template>
    <div>Processing...</div>
</template>

<script setup lang="ts">
    import type { Locale } from '#i18n';

    const { auth } = useSupabaseClient();
    const userStore = useUserStore();
    const localePath = useLocalePath();
    const cookie = useCookieLocale();

    Promise.allSettled([
        auth.signOut({ scope: 'local' }),
        userStore.clear(),
    ]).finally(() => {
        navigateTo(localePath('/', cookie.value as Locale));
    });
</script>
