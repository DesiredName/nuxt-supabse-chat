<template>
    <NuxtErrorBoundary>
        <!-- Main content -->
        <div class="w-screen h-screen flex flex-col">
            <div class="flex flex-row flex-grow-0 flex-shrink-0">
                <UHorizontalNavigation
                    :links="APP_SECTIONS_LIST"
                    class="border-b border-gray-200 dark:border-gray-800"
                />
            </div>
            <div class="flex flex-row justify-start">
                <div class="min-w-min px-4 grow-0 shrink-0">
                    <FriendsList />
                </div>
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
    import { APP_SECTIONS_LIST } from '../constants';

    const handle_error_and_redirect = () => clearError({ redirect: '/' });
</script>
