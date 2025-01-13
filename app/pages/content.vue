<template>
    <RouterView />
</template>

<script setup lang="ts">
    const store = useGlobalStore();
    const { chats } = storeToRefs(store);

    onServerPrefetch(async () => {
        await store.refresh();
    });

    onMounted(async () => {
        if (chats.value.length === 0) {
            await store.refresh();
        }
    });
</script>
