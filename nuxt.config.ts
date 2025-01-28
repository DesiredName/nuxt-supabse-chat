const base_url = 'https://chat-app.com';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    future: { compatibilityVersion: 4 },
    i18n: {
        baseUrl: base_url,
        defaultLocale: 'en',
        defaultDirection: 'ltr',
        lazy: true,
        locales: [
            {
                code: 'en',
                language: 'en-US',
                file: 'en.ts',
                name: 'English',
                icon: 'i-cif-us',
            },
            {
                code: 'cz',
                language: 'cs-CZ',
                file: 'cs.ts',
                name: 'Czech',
                icon: 'i-cif-cz',
            },
        ],
        customRoutes: 'config',
        pages: {
            confirm: false,
            content: false,
            login: false,
            logout: false,
        },
        strategy: 'prefix_except_default',
    },
    modules: [
        '@nuxt/ui',
        '@nuxt/eslint',
        '@nuxtjs/supabase',
        '@pinia/nuxt',
        '@nuxtjs/i18n',
    ],
    router: {
        options: { scrollBehaviorType: 'smooth' },
    },
    runtimeConfig: {
        public: {
            app: {
                name: 'ChatApp',
                support_email: 'support@chatapp.com',
                base_url,
            },
            supabaseKey: '',
            supabaseUrl: '',
        },
    },
    supabase: {
        redirect: true,
        redirectOptions: {
            login: '/',
            callback: '/confirm',
            include: ['/content(/*)?', '/logout(/*)?'],
        },
    },
    ui: {
        safelistColors: ['white'],
    },
});
