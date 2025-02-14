import type { HorizontalNavigationLink } from '#ui/types';
import type { LandingSectionData } from '~~/types/landing_page';

export enum LANDING_SECTIONS {
    HOME = 'section-home',
    FEATURES = 'section-features',
    CONTACTS = 'section-contacts',
}

export const LANDING_SECTIONS_DATA = (): Record<
    keyof typeof LANDING_SECTIONS,
    LandingSectionData
> => {
    const i18n = useI18n();
    const route = useRoute();
    const locale_path = useLocalePath();

    return {
        HOME: {
            id: LANDING_SECTIONS.HOME,
            to: '#' + LANDING_SECTIONS.HOME,
            label: i18n.t('landing.home'),
            is_active: () =>
                route.fullPath === locale_path('/') ||
                route.hash === '#' + LANDING_SECTIONS.HOME,
        },
        FEATURES: {
            id: LANDING_SECTIONS.FEATURES,
            to: '#' + LANDING_SECTIONS.FEATURES,
            label: i18n.t('landing.features'),
            is_active: () => route.hash === '#' + LANDING_SECTIONS.FEATURES,
        },
        CONTACTS: {
            id: LANDING_SECTIONS.CONTACTS,
            to: '#' + LANDING_SECTIONS.CONTACTS,
            label: i18n.t('landing.contacts'),
            is_active: () => route.hash === '#' + LANDING_SECTIONS.CONTACTS,
        },
    };
};

export const APP_SECTION_LINKS = (): ComputedRef<
    HorizontalNavigationLink[][]
> => {
    const i18n = useI18n();

    const userStore = useUserStore();
    const { original_displayed_name } = storeToRefs(userStore);

    return computed(() => [
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
                label: (original_displayed_name.value ?? 'N/A') || 'N/A',
                icon: 'i-ph-user',
                to: '/content/my_profile',
            },
            {
                label: i18n.t('generic.logout'),
                icon: 'i-uil-signout',
                to: '/logout',
            },
        ],
    ]);
};
