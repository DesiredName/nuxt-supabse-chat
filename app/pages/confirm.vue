<template>
    <div>
        <p>Verifing...</p>
    </div>
</template>

<script setup lang="ts">
    const user = useSupabaseUser();

    watch(user, () => user.value && navigateTo('/chats'), { immediate: true });
</script>
