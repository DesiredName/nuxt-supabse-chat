<template>
    <UContainer>
        <div class="py-3 text-lg font-bold">Hi, {{ user_name }}!</div>
        <UCard :ui="{ background: 'dark:bg-transparent' }">
            <template #header>
                <div class="flex flex-row justify-between items-center">
                    <div>Account settings</div>

                    <UButton
                        color="red"
                        variant="outline"
                        leading-icon="i-heroicons-trash"
                    >
                        Delete profile
                    </UButton>
                </div>
            </template>

            <UFormGroup label="Displayed name">
                <UInput v-model="user_name" />
            </UFormGroup>

            <template #footer>
                <UFormGroup>
                    <UButton color="green" variant="outline">
                        Save changes
                    </UButton>
                </UFormGroup>
            </template>
        </UCard>
    </UContainer>
</template>

<script setup lang="ts">
    const userStore = useUserStore();
    const user_name = ref<string>(userStore.user_name);
</script>
