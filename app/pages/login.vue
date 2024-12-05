<template>
    <div>
        <h2>Please, login</h2>
        <hr />
        <div>
            <button @click="handle_oauth_signin('github')">GitHub</button>
            <br />
            <button @click="handle_oauth_signin('linkedin_oidc')">
                LinkedIn
            </button>
            <br />
            <button @click="handle_oauth_signin('google')">Google</button>
            <br />
            <div>
                <input
                    v-model="email"
                    type="text"
                    placeholder="you@email.com"
                />
                <button @click="handle_otp_signin()">One time password</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type {
        AuthOtpResponse,
        OAuthResponse,
        Provider,
    } from '@supabase/auth-js/dist/module/lib/types';

    const { auth } = useSupabaseClient();
    const email = ref<string>('');

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
                options: { emailRedirectTo: `${origin}/confirm` },
            }),
        );

    const handle_signin = async (
        method: (origin: string) => Promise<AuthOtpResponse | OAuthResponse>,
    ) => {
        const { origin } = new URL(window.location.href);
        const { error } = await method(origin);

        if (error) {
            createError({
                fatal: false,
                status: 404,
                statusMessage: 'Failed to authorize',
            });
        }
    };
</script>
