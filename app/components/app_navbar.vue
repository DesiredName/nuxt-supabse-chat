<template>
    <UHorizontalNavigation
        :links="section_links"
        :ui="{ label: 'hidden md:inline' }"
        class="border-b border-gray-200 dark:border-gray-800"
    />
</template>

<script setup lang="ts">
    import type { HorizontalNavigationLink } from '#ui/types';

    const i18n = useI18n();
    const userStore = useUserStore();
    const { profile, displayed_avatar, displayed_name } =
        storeToRefs(userStore);
    const icon_or_avatar = computed<Partial<HorizontalNavigationLink>>(() => {
        return displayed_avatar.value
            ? {
                  avatar: {
                      src: displayed_avatar.value,
                  },
              }
            : { icon: 'i-ph-user' };
    });
    const section_links = ref<HorizontalNavigationLink[][]>([]);

    watch(
        profile,
        () => {
            console.log(1);
            section_links.value = [
                [
                    {
                        label: i18n.t('generic.chats'),
                        icon: 'i-ph-chats-fill',
                        to: '/content/chats',
                    },
                    {
                        label: i18n.t('generic.friends'),
                        icon: 'i-ph-users-four-thin',
                        to: '/content/friends',
                    },
                ],
                [
                    {
                        label: displayed_name.value,
                        ...icon_or_avatar.value,
                        to: '/content/my_profile',
                    },
                    {
                        label: i18n.t('generic.logout'),
                        icon: 'i-uil-signout',
                        to: '/logout',
                    },
                ],
            ];
        },
        {
            deep: true,
            immediate: true,
        },
    );
</script>
