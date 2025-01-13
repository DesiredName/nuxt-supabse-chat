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

export const APP_SECTION_LINKS = (args: {
    avatar_url: string;
    user_name: string;
}): HorizontalNavigationLink[][] => [
    [
        {
            label: args.user_name,
            avatar: { src: args.avatar_url },
            to: '/content/profile',
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
            label: 'Logout',
            icon: 'i-uil-signout',
            to: '/logout',
        },
    ],
];
