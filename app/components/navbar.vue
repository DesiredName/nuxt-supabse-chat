<template>
    <nav :class="$style.nav">
        <ULink
            :to="SECTIONS_LIST.home.to"
            class="inline-block w-12"
            active-class="font-bold"
            >{{ SECTIONS_LIST.home.label }}</ULink
        >
        &nbsp;
        <ULink
            :to="SECTIONS_LIST.features.to"
            class="inline-block w-16"
            active-class="font-bold"
            >{{ SECTIONS_LIST.features.label }}</ULink
        >
        &nbsp;
        <ULink
            :to="SECTIONS_LIST.footer.to"
            class="inline-block w-20"
            active-class="font-bold"
            >{{ SECTIONS_LIST.footer.label }}</ULink
        >
    </nav>
</template>

<script setup lang="ts">
    import { SECTIONS_LIST } from '~/constants';

    onMounted(() => {});
</script>

<style module>
    .nav {
        @apply px-2 py-3 sticky top-[0px] min-h-min bg-azure-600;
    }
</style>
