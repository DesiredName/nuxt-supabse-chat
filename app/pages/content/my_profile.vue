<template>
    <UContainer>
        <div class="py-3 text-lg font-bold">
            Hi, {{ original_displayed_name }}!
        </div>
        <UCard :ui="{ background: 'dark:bg-transparent' }">
            <template #header>
                <div class="flex flex-row justify-between items-center">
                    <div>Account settings</div>

                    <UButton color="red" variant="outline">
                        Delete profile
                    </UButton>
                </div>
            </template>

            <UFormGroup label="Displayed name">
                <UInput
                    :model-value="displayed_name"
                    @input="handle_displayed_name_change"
                />
            </UFormGroup>

            <UFormGroup label="This profile is public?">
                <UCheckbox
                    :model-value="is_public"
                    @click="handle_is_public_change"
                />
            </UFormGroup>

            <template #footer>
                <UFormGroup :error="update_error_code">
                    <UButton
                        color="green"
                        variant="outline"
                        :disabled="!has_changes"
                        @click="handle_update_profile"
                    >
                        Save changes
                    </UButton>
                </UFormGroup>
            </template>
        </UCard>
    </UContainer>
</template>

<script setup lang="ts">
    const userStore = useUserStore();
    const { displayed_name, original_displayed_name, is_public } =
        storeToRefs(userStore);
    const { load_profile, update_profile, set_displayed_name, set_is_public } =
        userStore;
    const has_changes = ref(true);
    const update_error_code = ref<string | undefined>(undefined);

    onMounted(async () => {
        await load_profile().finally(() => (has_changes.value = false));
    });

    function handle_displayed_name_change(event: InputEvent) {
        const input = event.target as HTMLInputElement;

        has_changes.value = true;

        set_displayed_name(input.value);
    }

    function handle_is_public_change(event: InputEvent) {
        const input = event.target as HTMLInputElement;

        has_changes.value = true;

        set_is_public(input.checked === true);
    }

    function handle_update_profile() {
        update_profile()
            .then((result) => {
                if (typeof result === 'string') {
                    update_error_code.value = result;
                } else {
                    has_changes.value = false;
                }
            })
            .catch(() => {});
    }
</script>
