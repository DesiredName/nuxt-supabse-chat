<template>
    <div :class="$style.bckg">
        <LandingNavbar />

        <RouterView />

        <section
            :id="sections_list.HOME.id"
            :class="[$style.section, $style.home]"
        >
            <div :class="$style['section-content']">
                <div>
                    <h2 class="text-azure-100 font-bold text-6xl break-words">
                        {{ $t('landing.welcome', { app_name: app.name }) }}
                    </h2>
                    <h4
                        class="text-azure-100 font-bold text-4xl mt-[4rem] break-words"
                    >
                        {{ $t('landing.callout') }}
                    </h4>
                    <div class="flex justify-start mt-6">
                        <UButton
                            class="mr-6 py-4 px-6 font-semibold text-xl"
                            size="xl"
                            color="green"
                            variant="sign"
                            :label="$t('generic.signup')"
                            :to="localePath('/signin')"
                        />
                        <UButton
                            class="py-4 px-6 font-semibold text-xl"
                            size="xl"
                            color="yellow"
                            variant="sign"
                            :label="$t('generic.signin')"
                            :to="localePath('/signin')"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section :id="sections_list.FEATURES.id" :class="$style.section">
            <div :class="$style['section-content']">
                <div :class="$style.features">
                    <div
                        v-for="index in 6"
                        :key="index"
                        :class="$style.feature"
                    >
                        <div :class="$style['feature-title']">
                            {{ $t(`landing.feature_boxes.f${index}.title`) }}
                        </div>

                        <div :class="$style['feature-content']">
                            {{
                                $t(
                                    `landing.feature_boxes.f${index}.description`,
                                )
                            }}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section :id="sections_list.CONTACTS.id" :class="$style.footer">
            <a class="text-azure-500" :href="`mailto:${app.support_email}`">
                {{ app.support_email }}
            </a>
            <br />
            <span class="mt-4">
                &copy; {{ new Date().getFullYear() }}, all rights reserved.
            </span>
        </section>
    </div>
</template>

<script setup lang="ts">
    import { LANDING_SECTIONS_DATA } from '~/constants';

    const sections_list = LANDING_SECTIONS_DATA();

    const {
        public: { app },
    } = useRuntimeConfig();

    const localePath = useLocalePath();

    useHead({
        htmlAttrs: {
            style: 'scroll-snap-type: y mandatory;',
        },
    });
</script>

<style module>
    .bckg {
        @apply min-w-full bg-slate-200;
    }

    .section {
        scroll-snap-align: start;

        @apply min-w-full min-h-svh flex flex-col items-center justify-center;
    }

    .section-content {
        @apply pt-12 min-w-full flex flex-col items-center justify-center px-4 md:px-16;
    }

    .home {
        scroll-snap-align: start;

        @apply bg-gradient-to-r from-azure-600 to-azure-400;
    }

    .features {
        @apply grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-auto gap-4;
    }
    .feature {
        @apply p-2 max-w-96 sm:px-4 sm:py-6 sm:border-2 sm:rounded-md sm:shadow-lg sm:shadow-slate-300;
    }

    .feature-title {
        @apply text-azure-600 text-2xl text-center font-semibold;
    }

    .feature-content {
        @apply text-gray-900 text-lg text-center mt-3;
    }

    .footer {
        scroll-snap-align: start;

        @apply min-w-full min-h-min bg-gray-800 py-14 flex flex-col items-center justify-center;
    }
</style>
