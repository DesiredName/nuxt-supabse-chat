<template>
    <UHorizontalNavigation
        :links="section_links"
        :ui="{ label: 'hidden md:inline' }"
        class="border-b border-gray-200 dark:border-gray-800"
    />
</template>

<script setup lang="ts">
    import { APP_SECTION_LINKS } from '../constants';
    const { user } = useUserStore();
    const section_links = APP_SECTION_LINKS({
        user_name: user?.user_metadata?.user_name,
        avatar_url: user?.user_metadata?.avatar_url,
    });
</script>
