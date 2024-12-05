<template>
    <NuxtErrorBoundary>
        <!-- Main content -->
        <div class="w-full flex flex-col">
            <div>Navbar</div>
            <div class="flex flex-row justify-start">
                <div class="min-w-max px-4 grow-0 shrink-0">left menu</div>
                <br />
                <NuxtLink to="/">Home</NuxtLink>
                <br />
                <div class="w-full grow-1">
                    <slot />
                </div>
            </div>
        </div>

        <!-- Error slot -->
        <template #error>
            We hit an error while loading an app...
            <NuxtLink to="#" @click="handle_error_and_redirect">
                Go to main page
            </NuxtLink>
        </template>
    </NuxtErrorBoundary>
</template>

<script setup lang="ts">
    const handle_error_and_redirect = () => clearError({ redirect: '/' });
</script>
