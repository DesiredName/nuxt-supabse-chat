<template>
    <UModal
        :model-value="true"
        :fullscreen="true"
        :overlay="true"
        @close="() => $router.push(localePath('/'))"
    >
        <div class="min-h-svh flex items-center justify-center">
            <UCard
                class="min-w-full md:min-w-80"
                :ui="{
                    ring: 'ring-0 md:ring-1',
                    shadow: 'shadow-none md:shadow',
                }"
            >
                <template #header>
                    <div class="flex items-center justify-between">
                        <h1 class="text-center font-semibold text-lg">
                            Welcome!
                        </h1>
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1"
                            :to="localePath('/')"
                        />
                    </div>
                </template>

                <UButton
                    color="white"
                    leading-icon="i-mdi-github"
                    size="xl"
                    :block="true"
                    @click="handle_oauth_signin('github')"
                >
                    GitHub
                </UButton>
                <br />
                <UButton
                    color="white"
                    leading-icon="i-mdi-linkedin"
                    size="xl"
                    :block="true"
                    @click="handle_oauth_signin('linkedin_oidc')"
                >
                    LinkedIn
                </UButton>
                <br />
                <UButton
                    color="white"
                    leading-icon="i-mdi-google"
                    size="xl"
                    :block="true"
                    @click="handle_oauth_signin('google')"
                >
                    Google
                </UButton>
                <br />
                <hr />
                <br />
                <div>
                    <UInput
                        v-model="email"
                        type="text"
                        placeholder="you@email.com"
                    />
                    <br />
                    <UButton
                        color="white"
                        size="md"
                        :block="true"
                        @click="handle_otp_signin()"
                    >
                        Get Magic Link
                    </UButton>
                </div>
            </UCard>
        </div>
    </UModal>
</template>

<script setup lang="ts">
    import type {
        AuthOtpResponse,
        OAuthResponse,
        Provider,
    } from '@supabase/auth-js/dist/module/lib/types';

    const { auth } = useSupabaseClient();
    const email = ref<string>('');

    const localePath = useLocalePath();

    const handle_oauth_signin = (provider: Provider) =>
        handle_signin((origin) =>
            auth.signInWithOAuth({
                provider,
                options: { redirectTo: `${origin}/confirm` },
            }),
        );

    const handle_otp_signin = () =>
        handle_signin((origin) =>
            auth.signInWithOtp({
                email: email.value,
                options: {
                    emailRedirectTo: `${origin}/confirm`,
                },
            }),
        );

    const handle_signin = async (
        method: (origin: string) => Promise<AuthOtpResponse | OAuthResponse>,
    ) => {
        const { origin } = new URL(window.location.href);

        method(origin).catch((_error) =>
            createError({
                fatal: false,
                status: 404,
                statusMessage: 'Failed to authorize',
            }),
        );
    };
</script>
