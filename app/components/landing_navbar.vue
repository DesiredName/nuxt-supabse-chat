<template>
    <nav :class="$style.nav">
        <div>
            <ULink
                v-for="section of sections_list"
                :key="section.id"
                :to="section.to"
                :active="section.is_active()"
                :title="section.label"
                class="inline-block w-min-12 mr-2"
                active-class="font-bold"
                >{{ section.label }}</ULink
            >
        </div>
        <LocaleChange />
    </nav>
</template>

<script setup lang="ts">
    import { LANDING_SECTIONS_DATA } from '~/constants';

    const sections_list = LANDING_SECTIONS_DATA();
</script>

<style module>
    .nav {
        @apply px-2 py-3 sticky top-[0px] h-12 bg-azure-600 flex flex-row justify-between items-center;
    }
</style>
