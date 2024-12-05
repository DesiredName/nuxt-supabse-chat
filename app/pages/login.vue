<template>
    <div>
        <h2>Please, login</h2>
        <hr />
        <div>
            <button @click="handle_signin('github')">GitHub</button>
            <br />
            <button @click="handle_signin('linkedin_oidc')">LinkedIn</button>
            <br />
            <button @click="handle_signin('google')">Google</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Provider } from '@supabase/auth-js/dist/module/lib/types';

    const { auth } = useSupabaseClient();

    const handle_signin = async (provider: Provider) => {
        const { origin } = new URL(window.location.href);
        const { error } = await auth.signInWithOAuth({
            provider,
            options: { redirectTo: `${origin}/confirm` },
        });

        if (error) {
            console.log(error);
        }
    };
</script>
