import type { User } from '@supabase/supabase-js';
import { ZodIssueCode } from 'zod';
import { ProfileScheme } from '~/schemes/profile.update';

export const useUserStore = defineStore('user_store', () => {
    const user = useState<User | null>('user_data', () => null);

    const displayed_name = useState<string>('user_displayed_name', () => '');
    const original_displayed_name = useState<string>(
        'user_original_displayed_name',
        () => '',
    );

    const is_public = useState<boolean>('profile_is_public', () => false);
    const original_is_public = useState<boolean>(
        'original_profile_is_public',
        () => false,
    );

    const has_changes = computed(() => {
        return (
            displayed_name.value != original_displayed_name.value ||
            is_public.value != original_is_public.value
        );
    });

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

        const displayed_name =
            profile_dispalyed_name ??
            user_name_preferred_name ??
            user_email_name ??
            profile_id;

        set_displayed_name(displayed_name);

        original_displayed_name.value = displayed_name;
    }

    function set_displayed_name(new_displayed_name: string) {
        displayed_name.value = new_displayed_name;
    }

    function assign_is_public(profile_is_public?: boolean) {
        is_public.value = profile_is_public === true;
        original_is_public.value = profile_is_public === true;
    }

    function set_is_public(new_is_public: boolean) {
        is_public.value = new_is_public;
    }

    //

    async function load_profile() {
        user.value = useSupabaseUser().value;

        await useAsyncData('user_profile_data', () =>
            $fetch('/api/profile', {
                headers: useRequestHeaders(['cookie']),
            }),
        ).then(({ data }) => {
            assign_is_public(data.value?.is_public);
            assign_displayed_name(data.value?.displayed_name, data.value?.id);
        });
    }

    async function update_profile() {
        const body = {
            displayed_name: displayed_name.value,
            is_public: is_public.value,
        };

        const check = ProfileScheme.safeParse(body);

        if (check.success !== true) {
            const code = check.error.issues.find(({ code }) => code);
            const default_code = ZodIssueCode.invalid_string;

            return Promise.resolve(code ?? default_code);
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
        has_changes,

        set_displayed_name,
        set_is_public,

        load_profile,
        update_profile,
        clear,
    };
});
