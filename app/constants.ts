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
