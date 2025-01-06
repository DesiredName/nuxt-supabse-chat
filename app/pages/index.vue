<template>
    <div :class="$style.bckg">
        <LandingNavbar v-if="$route.path === '/'" />

        <RouterView />

        <section
            :id="SECTIONS_LIST.home.id"
            :class="[$style.section, $style.home]"
        >
            <div :class="$style['section-content']">
                <div>
                    <h2 class="text-azure-100 font-bold text-6xl break-words">
                        Welcome to {{ app.name }}
                    </h2>
                    <h4
                        class="text-azure-100 font-bold text-4xl mt-[4rem] break-words"
                    >
                        Your new way to chat online. Fast, Secure and Reliable.
                    </h4>
                    <div class="flex justify-start mt-6">
                        <UButton
                            class="mr-6 py-4 px-6 font-semibold text-xl"
                            size="xl"
                            color="green"
                            variant="sign"
                            label="Sign Up"
                            to="signup"
                        />
                        <UButton
                            class="py-4 px-6 font-semibold text-xl"
                            size="xl"
                            color="yellow"
                            variant="sign"
                            label="Sign In"
                            to="signin"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section :id="SECTIONS_LIST.features.id" :class="$style.section">
            <div :class="$style['section-content']">
                <div :class="$style.features">
                    <div :class="$style.feature">
                        <div :class="$style['feature-title']">
                            Fast & Reliable
                        </div>

                        <div :class="$style['feature-content']">
                            Experience lightning-fast message delivery with a
                            high level of reliability for your daily chats.
                        </div>
                    </div>
                    <div :class="$style.feature">
                        <div :class="$style['feature-title']">
                            Easy Communication
                        </div>

                        <div :class="$style['feature-content']">
                            Find friends, join groups, share files and documents
                            - all in one user-friendly interface.
                        </div>
                    </div>
                    <div :class="$style.feature">
                        <div :class="$style['feature-title']">
                            Security First
                        </div>

                        <div :class="$style['feature-content']">
                            End-to-end encryption ensures that your private
                            conversations stay just that – private.
                        </div>
                    </div>
                    <div :class="$style.feature">
                        <div :class="$style['feature-title']">
                            Customizable Themes
                        </div>

                        <div :class="$style['feature-content']">
                            Make {{ app.name }} yours with fully customizable
                            themes and layouts to match your personal style.
                        </div>
                    </div>
                    <div :class="$style.feature">
                        <div :class="$style['feature-title']">
                            Cross-Platform
                        </div>

                        <div :class="$style['feature-content']">
                            Chat on any device. We support all major platforms:
                            desktop, mobile, and web.
                        </div>
                    </div>
                    <div :class="$style.feature">
                        <div :class="$style['feature-title']">
                            Seamless Integration
                        </div>

                        <div :class="$style['feature-content']">
                            Easily integrate with other apps and services,
                            making your workflow smoother and more efficient.
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section :id="SECTIONS_LIST.footer.id" :class="$style.footer">
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
    import { SECTIONS_LIST } from '~/constants';

    const {
        public: { app },
    } = useRuntimeConfig();

    definePageMeta({
        layout: 'landing',
    });

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
