import type { User } from '@supabase/supabase-js';
import { ProfileScheme } from '~/utils/validation/profile.update';

export const useUserStore = defineStore('user_store', () => {
    const user = ref<User | null>(null);

    const displayed_name = ref<string>('');
    const original_displayed_name = ref<string>('');

    const is_public = ref<boolean>(false);

    //

    function assign_displayed_name(
        profile_dispalyed_name?: string,
        profile_id?: string,
    ) {
        const val = user.value;
        const user_name_preferred_name: string =
            val?.user_metadata?.preferred_name ??
            val?.user_metadata?.user_name ??
            val?.user_metadata?.full_name;
        const user_email: string = val?.user_metadata?.email ?? val?.email;
        const user_email_name = user_email?.split?.('@')?.[0];

        set_displayed_name(
            profile_dispalyed_name ??
                user_name_preferred_name ??
                user_email_name ??
                profile_id,
        );

        original_displayed_name.value = displayed_name.value;
    }

    function set_displayed_name(new_displayed_name: string) {
        displayed_name.value = new_displayed_name;
    }

    function assign_is_public(profile_is_public?: boolean) {
        is_public.value = profile_is_public === true;
    }

    function set_is_public(new_is_public: boolean) {
        is_public.value = new_is_public;
    }

    //

    async function load_profile() {
        user.value = useSupabaseUser().value;

        await $fetch('/api/profile').then((profile) => {
            assign_is_public(profile?.is_public);
            assign_displayed_name(profile?.displayed_name, profile?.id);
        });
    }

    async function update_profile() {
        const body = {
            displayed_name: displayed_name.value,
            is_public: is_public.value,
        };

        const check = ProfileScheme.safeParse(body);

        if (check.success !== true) {
            return Promise.resolve(check.error.issues.map(({ code }) => code));
        }

        return await $fetch('/api/profile', {
            method: 'POST',
            body,
        }).then((profile) => {
            assign_is_public(profile?.is_public);
            assign_displayed_name(profile?.displayed_name, profile?.id);
        });
    }

    async function clear() {
        user.value = null;
    }

    return {
        displayed_name,
        original_displayed_name,

        is_public,

        set_displayed_name,
        set_is_public,

        load_profile,
        update_profile,
        clear,
    };
});
