// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    future: { compatibilityVersion: 4 },
    modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxtjs/supabase', '@pinia/nuxt'],
    router: {
        options: { scrollBehaviorType: 'smooth' },
    },
    runtimeConfig: {
        public: {
            app: {
                name: 'ChatApp',
                support_email: 'support@chatapp.com',
            },
            supabaseKey: '',
            supabaseUrl: '',
        },
    },
    supabase: {
        redirect: true,
        redirectOptions: {
            login: '/signin',
            callback: '/confirm',
            exclude: ['/', '/signup', '/logout', '/confirm'],
        },
    },
});
