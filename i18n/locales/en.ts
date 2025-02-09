import type { LocaleData } from '~~/types/locale';

export default {
    landing: {
        welcome: 'Welcome to {app_name}',
        callout: 'Your new way to chat online. Fast, Secure and Reliable.',
        home: 'Home',
        features: 'Features',
        contacts: 'Contacts',
        feature_boxes: {
            f1: {
                title: 'Fast & Reliable',
                description:
                    'Experience lightning-fast message delivery with a high level of reliability for your daily chats.',
            },
            f2: {
                title: 'Easy Communication',
                description:
                    'Find friends, join groups, share files and documents - all in one user-friendly interface.',
            },
            f3: {
                title: 'Security First',
                description:
                    'End-to-end encryption ensures that your private conversations stay just that – private.',
            },
            f4: {
                title: 'Customizable Themes',
                description:
                    'Make {app_name} yours with fully customizable themes and layouts to match your personal style.',
            },
            f5: {
                title: 'Cross-Platform',
                description:
                    'Chat on any device. We support all major platforms: desktop, mobile, and web.',
            },
            f6: {
                title: 'Seamless Integration',
                description:
                    'Easily integrate with other apps and services, making your workflow smoother and more efficient.',
            },
        },
    },
    generic: {
        friends: 'Friends',
        chats: 'Chats',
        signin: 'Sign In',
        signup: 'Sign Up',
        logout: 'Logout',
    },
} satisfies LocaleData;
