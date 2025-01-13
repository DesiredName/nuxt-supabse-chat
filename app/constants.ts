import type { HorizontalNavigationLink } from '#ui/types';

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

export const APP_SECTIONS_LIST: HorizontalNavigationLink[][] = [
    [
        {
            label: 'Profile',
            avatar: {
                src: 'https://avatars.githubusercontent.com/u/739984?v=4',
            },
            to: '/content/profile?id=me',
            badge: 100,
        },
        {
            label: 'Friends',
            icon: 'i-ph-users-four-thin',
            to: '/content/friends',
        },
        {
            label: 'Chats',
            icon: 'i-ph-chats-fill',
            to: '/content/chats',
        },
    ],
    [
        {
            label: 'Help',
            icon: 'i-heroicons-question-mark-circle',
        },
        {
            label: 'Logout',
            icon: 'i-uil-signout',
            to: '/logout',
        },
    ],
];
