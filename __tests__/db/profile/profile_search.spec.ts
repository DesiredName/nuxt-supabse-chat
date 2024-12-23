import { afterAll, beforeAll, expect, test } from '@jest/globals';
import { friend_add, friend_remove } from '~~/server/api/modules/friends';
import { profile_update, profiles_search } from '~~/server/api/modules/profile';
import type { UserCreds } from '../types';
import {
    create_admin_client,
    create_user,
    create_user_client,
    delete_user,
} from '../utils';

const user_credentials: UserCreds = {
    email: 'userFRTYUIOLKMNB67@email.com',
    password: 'gft6789edfghJI*&^Tghj',
};
const user_displayed_name = 'user for search';

const user_credentials_friend_1: UserCreds = {
    email: 'userFTGYUIJKMNBFTGYU@gmail.com',
    password: 'tyeuikfjhyu849oel',
};

const admin_client = create_admin_client();
const user_client = create_user_client();
const user_client_friend_1 = create_user_client();

beforeAll(async () => {
    await create_user(admin_client, user_credentials);
    await create_user(admin_client, user_credentials_friend_1);

    await user_client.auth.signInWithPassword(user_credentials);
    await user_client_friend_1.auth.signInWithPassword(
        user_credentials_friend_1,
    );
});

afterAll(async () => {
    await delete_user(admin_client, user_client);
    await delete_user(admin_client, user_client_friend_1);
});

//
//
//

test('profile is visible if public', async () => {
    await profile_update(user_client, {
        displayed_name: user_displayed_name,
        is_public: true,
    });

    const found = await profiles_search(
        user_client_friend_1,
        user_displayed_name,
    );

    expect(found.length).toBe(1);
});

test('profile is NOT visible if NOT a public', async () => {
    await profile_update(user_client, {
        displayed_name: user_displayed_name,
        is_public: false,
    });

    const found = await profiles_search(
        user_client_friend_1,
        user_displayed_name,
    );

    expect(found.length).toBe(0);
});

test('profile is visible for a friend', async () => {
    const { data } = await user_client.auth.getUser();
    const user_id = data!.user!.id;

    const was_added = await friend_add(user_client_friend_1, user_id);

    expect(was_added).toBeTruthy();

    const found = await profiles_search(
        user_client_friend_1,
        user_displayed_name,
    );

    expect(found.length).toBe(1);
});

test('profile is NOT visible if not friends any more', async () => {
    const { data } = await user_client_friend_1.auth.getUser();
    const friend_id = data!.user!.id;

    const was_removed = await friend_remove(user_client, friend_id);

    expect(was_removed).toBeTruthy();

    const found = await profiles_search(
        user_client_friend_1,
        user_displayed_name,
    );

    expect(found.length).toBe(0);
});
