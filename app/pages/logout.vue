<template>
    <div>Processing...</div>
</template>

<script setup lang="ts">
    import { useGlobalStore } from '#build/imports';

    const { auth } = useSupabaseClient();
    const global_store = useGlobalStore();

    global_store
        .clear()
        .then(() => auth.signOut())
        .finally(() => navigateTo('/'));
</script>
