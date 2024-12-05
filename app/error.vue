<template>
    <div>
        <h1>An error occured! Sorry about that...</h1>
        <NuxtLink to="#" @click="handle_error_and_redirect"
            >Go back home</NuxtLink
        >
    </div>
</template>

<script setup lang="ts">
    import type { NuxtError } from '#app';

    defineProps({
        error: {
            type: Object as PropType<NuxtError>,
            required: true,
        },
    });

    const handle_error_and_redirect = () => clearError({ redirect: '/' });
</script>
