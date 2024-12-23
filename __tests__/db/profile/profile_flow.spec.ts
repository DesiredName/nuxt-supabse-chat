import { afterAll, beforeAll, expect, test } from '@jest/globals';
import { profile_get, profile_update } from '~~/server/api/modules/profile';
import type { UserCreds } from '../types';
import {
    create_admin_client,
    create_user,
    create_user_client,
    delete_user,
} from '../utils';

const user_credentials: UserCreds = {
    email: 'userMSDNOSDLFS@mail.com',
    password: '234234525432',
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

test('test if user profile can be updated', async () => {
    const profile_before = await profile_get(user_client);

    const displayed_name = 'new user name';
    const is_public = !profile_before!.is_public;

    const was_updated = await profile_update(user_client, {
        displayed_name,
        is_public,
    });

    expect(was_updated).toBeTruthy();

    const profile_after = await profile_get(user_client);

    expect(profile_after?.displayed_name).toEqual(displayed_name);
    expect(profile_after?.displayed_name).not.toEqual(
        profile_before?.displayed_name,
    );
    expect(profile_after?.is_public).toEqual(is_public);
    expect(profile_after?.is_public).not.toEqual(profile_before?.is_public);
});
