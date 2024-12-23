<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
    const {
        public: { app },
    } = useRuntimeConfig();

    useHead({
        title: app.name,
    });
</script>

<style>
    * {
        @apply font-sans !important;
    }
</style>
