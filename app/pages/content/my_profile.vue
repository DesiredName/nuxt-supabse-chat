<template>
    <UContainer>
        <div class="py-3 text-lg font-bold">Hi, {{ displayed_name }}!</div>
        <UCard :ui="{ background: 'dark:bg-transparent' }">
            <template #header>
                <div class="flex flex-row justify-between items-center">
                    <div>Account settings</div>

                    <UButton color="red" variant="outline">
                        Delete profile
                    </UButton>
                </div>
            </template>

            <UForm
                ref="formRef"
                class="space-y-4"
                :schema="ProfileSchemeObject"
                :state="state"
                @submit="handle_update_profile"
            >
                <UFormGroup label="Displayed Name" name="displayed_name">
                    <UInput v-model="state.displayed_name" />
                </UFormGroup>

                <UFormGroup label="Public Profile" name="is_public">
                    <UToggle v-model="state.is_public" />
                </UFormGroup>

                <UFormGroup label="User Avatar" name="user_avatar">
                    <UInput
                        v-model="state.user_avatar"
                        type="file"
                        @change="handle_avatar_upload"
                    />
                </UFormGroup>

                <UButton
                    color="green"
                    variant="outline"
                    type="submit"
                    :disabled="!can_submit_changes"
                >
                    Save changes
                </UButton>
            </UForm>
        </UCard>
    </UContainer>
</template>

<script setup lang="ts">
    import type { Form, FormSubmitEvent } from '#ui/types';
    import type { ProfileScheme } from '~/schemes/profile.update';
    import { ProfileSchemeObject } from '~/schemes/profile.update';

    const userStore = useUserStore();
    const { profile, displayed_name } = storeToRefs(userStore);
    const { update_profile } = userStore;

    const state = ref<ProfileScheme>({
        displayed_name: '',
        is_public: false,
        user_avatar: undefined,
    });

    const formRef = ref<Form<typeof ProfileSchemeObject> | null>(null);

    const can_submit_changes = computed(
        () =>
            (displayed_name.value != state.value.displayed_name ||
                profile.value?.is_public != state.value.is_public ||
                profile.value?.user_avatar != state.value.user_avatar) &&
            formRef.value?.errors?.length === 0,
    );

    watch(
        profile,
        () => {
            state.value.displayed_name = displayed_name.value ?? 'N/A';
            state.value.is_public = profile.value?.is_public === true;
            state.value.user_avatar = profile.value?.user_avatar ?? undefined;
        },
        {
            deep: true,
            immediate: true,
        },
    );

    function handle_avatar_upload(files: FileList) {
        const file = files.item(0);

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                if (
                    profile.value != null &&
                    typeof e.target?.result === 'string'
                ) {
                    profile.value.user_avatar = e.target.result;
                }
            };

            reader.readAsDataURL(file);
        } else {
            if (profile.value != null) {
                profile.value.user_avatar = null;
            }
        }
    }

    function handle_update_profile(event: FormSubmitEvent<ProfileScheme>) {
        update_profile({
            ...event.data,
        });
    }
</script>
