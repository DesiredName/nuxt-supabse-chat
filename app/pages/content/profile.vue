<template>
    <div>
        <div>
            {{ userStore.user_name }}
        </div>
    </div>
</template>

<script setup lang="ts">
    const userStore = useUserStore();
</script>
