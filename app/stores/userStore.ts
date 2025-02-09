import { ZodIssueCode } from 'zod';
import {
    ProfileSchemeObject,
    type ProfileScheme,
} from '~/schemes/profile.update';
import type { UserProfile } from '~~/server/api/profile.get';

export const useUserStore = defineStore('user_store', () => {
    const profile = useState<UserProfile>('user assigned profile', () => null);

    //

    const displayed_name = computed(() => {
        const user = useSupabaseUser().value;
        const user_name_preferred_name: string =
            user?.user_metadata?.preferred_name ??
            user?.user_metadata?.user_name ??
            user?.user_metadata?.full_name;
        const user_email: string = user?.user_metadata?.email ?? user?.email;
        const user_email_name = user_email?.split?.('@')?.[0];

        return (
            profile.value?.displayed_name ??
            user_name_preferred_name ??
            user_email_name ??
            profile.value?.id
        );
    });

    const displayed_avatar = computed(() => {
        return profile.value?.user_avatar;
    });

    //

    async function load_profile() {
        if (import.meta.server && profile.value == null) {
            await useAsyncData('user_profile_data', () =>
                $fetch('/api/profile', {
                    headers: useRequestHeaders(['cookie']),
                }),
            ).then(({ data }) => {
                if (data.value) {
                    profile.value = data.value;
                }
            });
        } else if (profile.value == null) {
            await $fetch('/api/profile', {
                headers: useRequestHeaders(['cookie']),
            }).then((data) => {
                profile.value = data;
            });
        }
    }

    async function update_profile(body: ProfileScheme) {
        const check = ProfileSchemeObject.safeParse(body);

        if (check.success !== true) {
            const code = check.error.issues.find(({ code }) => code)?.code;
            const default_code = ZodIssueCode.invalid_string;

            return code ?? default_code;
        } else {
            await $fetch('/api/profile', {
                method: 'POST',
                body,
            }).then((data) => {
                profile.value = data;
            });

            return null;
        }
    }

    async function delete_profile() {
        console.log('delete');
    }

    return {
        profile,

        displayed_name,
        displayed_avatar,

        load_profile,
        update_profile,
        delete_profile,
    };
});
