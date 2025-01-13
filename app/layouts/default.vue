<template>
    <NuxtErrorBoundary>
        <!-- Main content -->
        <div class="w-screen h-screen flex flex-col">
            <div class="flex flex-row flex-grow-0">
                <AppNavbar />
            </div>
            <div class="flex flex-row flex-grow">
                <div class="w-full grow-1">
                    <slot />
                </div>
            </div>
        </div>

        <!-- Error slot -->
        <template #error>
            Hit an error while loading an app...
            <NuxtLink to="#" @click="handle_error_and_redirect">
                Go to main page
            </NuxtLink>
        </template>
    </NuxtErrorBoundary>
</template>

<script setup lang="ts">
    const handle_error_and_redirect = () => clearError({ redirect: '/' });
</script>
