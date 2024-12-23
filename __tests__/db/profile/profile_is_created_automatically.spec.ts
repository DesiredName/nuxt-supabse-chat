import { afterAll, beforeAll, expect, test } from '@jest/globals';
import { profile_get } from '~~/server/api/modules/profile';
import type { UserCreds } from '../types';
import {
    create_admin_client,
    create_user,
    create_user_client,
    delete_user,
} from '../utils';

const user_credentials: UserCreds = {
    email: 'user123123@mail.com',
    password: 'aszxcasdasda',
};

const admin_client = create_admin_client();
const user_client = create_user_client();

beforeAll(async () => {
    await create_user(admin_client, user_credentials);
    await user_client.auth.signInWithPassword(user_credentials);
});

afterAll(async () => {
    await delete_user(admin_client, user_client);
});

//
//
//

test('test if user profile is created automatically when new user registers', async () => {
    const { data, error } = await user_client.auth.getUser();

    if (error != null) {
        throw new Error('Failed to get user id', { cause: error });
    }

    const user_id = data.user.id;

    expect(user_id).not.toBeNull();

    const profile = await profile_get(user_client);

    expect(profile).not.toBeNull();
});
