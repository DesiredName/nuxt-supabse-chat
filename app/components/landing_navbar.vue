<template>
    <nav :class="$style.nav">
        <ULink
            :to="SECTIONS_LIST.home.to"
            :active="is_active[SECTIONS_LIST.home.id]"
            class="inline-block w-12"
            active-class="font-bold"
            >Home</ULink
        >
        &nbsp;
        <ULink
            :to="SECTIONS_LIST.features.to"
            :active="is_active[SECTIONS_LIST.features.id]"
            class="inline-block w-16"
            active-class="font-bold"
            >Features</ULink
        >
        &nbsp;
        <ULink
            :to="SECTIONS_LIST.footer.to"
            :active="is_active[SECTIONS_LIST.footer.id]"
            class="inline-block w-20"
            active-class="font-bold"
            >Contacts</ULink
        >
    </nav>
</template>

<script setup lang="ts">
    import { SECTIONS_LIST } from '~/constants';

    const route = useRoute();
    const is_active = ref({
        [SECTIONS_LIST.home.id]: false,
        [SECTIONS_LIST.features.id]: false,
        [SECTIONS_LIST.footer.id]: false,
    });

    onMounted(() => {
        watch(
            route,
            () => {
                is_active.value[SECTIONS_LIST.home.id] =
                    route.fullPath === '/' ||
                    route.hash === SECTIONS_LIST.home.to;
                is_active.value[SECTIONS_LIST.features.id] =
                    route.hash === SECTIONS_LIST.features.to;
                is_active.value[SECTIONS_LIST.footer.id] =
                    route.hash === SECTIONS_LIST.footer.to;
            },
            { immediate: true },
        );
    });
</script>

<style module>
    .nav {
        @apply px-2 py-3 sticky top-[0px] min-h-min bg-azure-600;
    }
</style>
