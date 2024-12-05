<template>
    <div>
        <h2>Chats list</h2>
        <hr />
        {{ user_name }}
        <hr />
        {{ chats }}
        <hr />
        <NuxtLink to="/logout">Logout</NuxtLink>
    </div>
</template>

<script setup lang="ts">
    const store = useGlobalStore();
    const { user_name, chats } = storeToRefs(store);

    const refresh_data = async (_from: string) => store.refresh();

    onServerPrefetch(async () => {
        await refresh_data('server');
    });

    onMounted(async () => {
        if (chats.value.length === 0) {
            await refresh_data('client');
        }
    });
</script>
