export const LANDING_SECTIONS_LIST = {
    home: {
        id: 'sec-home',
        to: '#sec-home',
    },
    features: {
        id: 'sec-features',
        to: '#sec-features',
    },
    footer: {
        id: 'sec-footer',
        to: '#sec-footer',
    },
};

export const APP_SECTIONS_LIST = [
    {
        label: 'Profile',
        avatar: {
            src: 'https://avatars.githubusercontent.com/u/739984?v=4',
        },
        badge: 100,
    },
    {
        label: 'Installation',
        icon: 'i-heroicons-home',
        to: '/getting-started/installation',
    },
    {
        label: 'Horizontal Navigation',
        icon: 'i-heroicons-chart-bar',
        to: '/components/horizontal-navigation',
    },
    {
        label: 'Command Palette',
        icon: 'i-heroicons-command-line',
        to: '/components/command-palette',
    },
];
