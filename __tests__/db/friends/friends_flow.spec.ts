import { afterAll, beforeAll, expect, test } from '@jest/globals';
import {
    are_friends,
    friend_add,
    friend_remove,
    friends_get,
    is_friend,
} from '~~/server/api/modules/friends';
import type { UserCreds } from '../types';
import {
    create_admin_client,
    create_user,
    create_user_client,
    delete_user,
} from '../utils';

const user_credentials: UserCreds = {
    email: 'userUJWFIMC9SDM@email.com',
    password: 'plsnfiejedpgjsd',
};

const user_credentials_friend_1: UserCreds = {
    email: 'userUDIEJWFUEFUHF8ISWD@gmail.com',
    password: 'pqworejfaspqwirtjg93',
};

const user_credentials_friend_2: UserCreds = {
    email: 'userIWENKMJDFIJEUJND@gmail.com',
    password: 'dscdsf34r34t45y56g',
};

const admin_client = create_admin_client();
const user_client = create_user_client();
const user_client_friend_1 = create_user_client();
const user_client_friend_2 = create_user_client();

beforeAll(async () => {
    await create_user(admin_client, user_credentials);
    await create_user(admin_client, user_credentials_friend_1);
    await create_user(admin_client, user_credentials_friend_2);
    await user_client.auth.signInWithPassword(user_credentials);
    await user_client_friend_1.auth.signInWithPassword(
        user_credentials_friend_1,
    );
    await user_client_friend_2.auth.signInWithPassword(
        user_credentials_friend_2,
    );
});

afterAll(async () => {
    await delete_user(admin_client, user_client);
    await delete_user(admin_client, user_client_friend_1);
    await delete_user(admin_client, user_client_friend_2);
});

//
//
//

test('can add friend and flags are set', async () => {
    const { data: user_data } = await user_client.auth.getUser();
    const user_id = user_data!.user!.id;

    const { data: friend_data_1 } = await user_client_friend_1.auth.getUser();
    const friend_id_1 = friend_data_1!.user!.id;

    const { data: friend_data_2 } = await user_client_friend_2.auth.getUser();
    const friend_id_2 = friend_data_2!.user!.id;

    let expected_friends_list = 0;

    for await (const friend_id of [friend_id_1, friend_id_2]) {
        const was_added = await friend_add(user_client, friend_id);
        const check_is_friend = await is_friend(user_client, friend_id);
        const check_are_friends = await are_friends({
            client: user_client,
            user_id,
            friend_id,
        });

        expect(was_added).toBeTruthy();
        expect(check_is_friend).toBeTruthy();
        expect(check_are_friends).toBeTruthy();

        expected_friends_list++;
        const friends = await friends_get(user_client);
        expect(friends.length).toBe(expected_friends_list);
    }
});

test('can list all friends', async () => {
    const { data: friend_data_1 } = await user_client_friend_1.auth.getUser();
    const friend_id_1 = friend_data_1!.user!.id;

    const { data: friend_data_2 } = await user_client_friend_2.auth.getUser();
    const friend_id_2 = friend_data_2!.user!.id;

    const friends = await friends_get(user_client);
    const friend_ids = friends.map((f) => f.user_id);

    expect(friend_ids.length).toBe(2);
    expect(friend_ids).toContainEqual(friend_id_1);
    expect(friend_ids).toContainEqual(friend_id_2);
});

test('can remove friend', async () => {
    const { data: user_data } = await user_client.auth.getUser();
    const user_id = user_data!.user!.id;

    const { data: friend_data } = await user_client_friend_1.auth.getUser();
    const friend_id = friend_data!.user!.id;

    const was_removed = await friend_remove(user_client, friend_id);
    const check_is_friend = await is_friend(user_client, friend_id);
    const check_are_friends = await are_friends({
        client: user_client,
        user_id,
        friend_id,
    });

    expect(was_removed).toBeTruthy();
    expect(check_is_friend).toBeFalsy();
    expect(check_are_friends).toBeFalsy();

    const friends = await friends_get(user_client);
    expect(friends.length).toBe(1);
});
