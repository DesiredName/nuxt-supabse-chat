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
    import type { LANDING_SECTIONS } from '~/constants';
    import { LANDING_SECTIONS_DATA } from '~/constants';

    const sections_list = LANDING_SECTIONS_DATA();

    onMounted(() => {
        document.addEventListener('scrollend', set_anchors);
        document.addEventListener('resize', set_anchors);
    });

    function set_anchors() {
        const window_bounds = window.visualViewport;

        if (window_bounds == null) {
            return;
        }

        for (const section_name in sections_list) {
            const section =
                sections_list[section_name as keyof typeof LANDING_SECTIONS];
            const html_element = document.getElementById(section.id);

            if (html_element == null) {
                continue;
            }

            const bounds = html_element.getBoundingClientRect();
            const is_selected =
                bounds.top === 0 || bounds.bottom - window.innerHeight === 0;

            if (is_selected) {
                window.location.href = '#' + section.id;

                return;
            }
        }
    }
</script>

<style module>
    .nav {
        @apply px-2 py-3 sticky top-[0px] h-12 bg-azure-600 flex flex-row justify-between items-center;
    }
</style>
