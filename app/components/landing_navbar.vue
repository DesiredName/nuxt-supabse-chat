<template>
    <nav :class="$style.nav">
        <ULink
            :to="LANDING_SECTIONS_LIST.home.to"
            :active="is_active[LANDING_SECTIONS_LIST.home.id]"
            class="inline-block w-12"
            active-class="font-bold"
            >Home</ULink
        >
        &nbsp;
        <ULink
            :to="LANDING_SECTIONS_LIST.features.to"
            :active="is_active[LANDING_SECTIONS_LIST.features.id]"
            class="inline-block w-16"
            active-class="font-bold"
            >Features</ULink
        >
        &nbsp;
        <ULink
            :to="LANDING_SECTIONS_LIST.footer.to"
            :active="is_active[LANDING_SECTIONS_LIST.footer.id]"
            class="inline-block w-20"
            active-class="font-bold"
            >Contacts</ULink
        >
    </nav>
</template>

<script setup lang="ts">
    import { LANDING_SECTIONS_LIST } from '~/constants';

    const route = useRoute();
    const is_active = ref({
        [LANDING_SECTIONS_LIST.home.id]: false,
        [LANDING_SECTIONS_LIST.features.id]: false,
        [LANDING_SECTIONS_LIST.footer.id]: false,
    });

    onMounted(() => {
        watch(
            route,
            () => {
                is_active.value[LANDING_SECTIONS_LIST.home.id] =
                    route.fullPath === '/' ||
                    route.hash === LANDING_SECTIONS_LIST.home.to;
                is_active.value[LANDING_SECTIONS_LIST.features.id] =
                    route.hash === LANDING_SECTIONS_LIST.features.to;
                is_active.value[LANDING_SECTIONS_LIST.footer.id] =
                    route.hash === LANDING_SECTIONS_LIST.footer.to;
            },
            { immediate: true },
        );
    });
</script>

<style module>
    .nav {
        @apply px-2 py-3 sticky top-[0px] h-12 bg-azure-600;
    }
</style>
