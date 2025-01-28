<template>
    <div>
        <p>Redirecting...</p>
    </div>
</template>

<script setup lang="ts">
    const cookie = useCookieLocale();
    const localePath = useLocalePath();

    navigateTo(localePath('/' + cookie.value));
</script>
