<template>
    <div>
        <div>Chats</div>
        <div>
            {{ chatsStore.chats }}
        </div>
    </div>
</template>

<script setup lang="ts">
    const chatsStore = useChats();

    onMounted(async () => {
        await chatsStore.refresh('client');
    });
</script>
