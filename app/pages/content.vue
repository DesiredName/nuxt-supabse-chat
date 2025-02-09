<template>
    <RouterView />
</template>

<script setup lang="ts">
    const userStore = useUserStore();

    definePageMeta({
        layout: 'content',
    });

    onServerPrefetch(async () => {
        await userStore.load_profile();
    });
</script>
