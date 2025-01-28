<template>
    <div>
        <UButton
            v-for="{ code, name, icon } of available_locales"
            :id="code"
            :key="code"
            :label="code"
            :to="switchLocalePath(code)"
            :color="locale === code ? 'white' : 'primary'"
            :title="name ?? code"
            :icon="icon"
            class="ml-2"
            variant="outline"
        />
    </div>
</template>

<script setup lang="ts">
    import type { LocaleObject } from '@nuxtjs/i18n';

    const switchLocalePath = useSwitchLocalePath();
    const i18n = useI18n();
    const { locale, locales } = i18n;
    const available_locales = locales.value as Array<LocaleObject>;
</script>
