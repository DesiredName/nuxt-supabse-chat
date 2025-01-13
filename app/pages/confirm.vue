<template>
    <div>
        <p>Verifying...</p>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'landing',
    });

    const user = useSupabaseUser();

    const handle_navigate_next = () => {
        const { query } = useRoute();

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
            navigateTo('/chats');
        }
    };

    watch(user, handle_navigate_next, { immediate: true });

    onMounted(() => {
        setTimeout(handle_navigate_next, 3000);
    });
</script>
