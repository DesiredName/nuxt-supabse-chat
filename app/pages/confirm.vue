<template>
    <div>
        <p>Verifying...</p>
    </div>
</template>

<script setup lang="ts">
    const user = useSupabaseUser();

    const handle_navigate_next = () => {
        const { query } = useRoute();
        const userStore = useUserStore();

        if ('error_code' in query) {
            const error_code = query['error_code'] as string;

            showError({
                status: Number(error_code),
                statusMessage: 'We can not authorize you request',
            });

            return;
        }

        if (user.value == null) {
            navigateTo('/signin');
        } else {
            userStore
                .load_profile()
                .then(() => {
                    navigateTo('/content/chats');
                })
                .catch(() => {
                    navigateTo('/logout');
                });
        }
    };

    watch(user, handle_navigate_next, { immediate: true });
</script>
