import { afterAll, beforeAll, expect, test } from '@jest/globals';
import {
    chat_create,
    chat_get,
    is_chat_participant,
} from '~~/server/api/modules/chats';
import { friend_add, friend_remove } from '~~/server/api/modules/friends';
import { participant_add } from '~~/server/api/modules/participants';
import type { UserCreds } from '../types';
import {
    create_admin_client,
    create_user,
    create_user_client,
    delete_user,
} from '../utils';

const user_credentials: UserCreds = {
    email: 'userLDKJNFDKLMCXSDSD@mail.com',
    password: 'z03igokr49v0ksdWD',
};

const user_credentials_friend: UserCreds = {
    email: 'userLPDLMEWPKCMENGFJA@mail.com',
    password: '86t5kjd9tnqwdpdi23r',
};

const admin_client = create_admin_client();
const user_client = create_user_client();
const user_client_friend = create_user_client();

beforeAll(async () => {
    await create_user(admin_client, user_credentials);
    await create_user(admin_client, user_credentials_friend);
    await user_client.auth.signInWithPassword(user_credentials);
    await user_client_friend.auth.signInWithPassword(user_credentials_friend);
});

afterAll(async () => {
    await delete_user(admin_client, user_client);
    await delete_user(admin_client, user_client_friend);
});

//
//
//

test('chat is not seen by another user if not added by owner to the chat participants', async () => {
    const chat = await chat_create(user_client, 'test chat not for sharing');

    const is_friend_participant = await is_chat_participant(
        user_client_friend,
        chat!.id,
    );
    const is_friend_has_chat_access = await chat_get(
        user_client_friend,
        chat!.id,
    );

    expect(is_friend_participant).toBeFalsy();
    expect(is_friend_has_chat_access).toBeNull();
});

test('user adds another user to friends list but this does not expose chats', async () => {
    const chat = await chat_create(
        user_client,
        'test chat for sharing, but nope',
    );

    const { data } = await user_client_friend.auth.getUser();
    const friend_id = data!.user!.id;

    await friend_add(user_client, friend_id);

    const is_friend_has_chat_access = await chat_get(
        user_client_friend,
        chat!.id,
    );

    expect(is_friend_has_chat_access).toBeNull();

    await friend_remove(user_client, friend_id);
});

test('user adds friend user to chat', async () => {
    const chat = await chat_create(user_client, 'test chat for sharing');
    const chat_id = chat!.id;

    const { data } = await user_client_friend.auth.getUser();
    const friend_id = data!.user!.id;

    await friend_add(user_client, friend_id);
    await participant_add({ client: user_client, chat_id, friend_id });

    const is_friend_participant = await is_chat_participant(
        user_client_friend,
        chat!.id,
    );
    const is_friend_has_chat_access = await chat_get(
        user_client_friend,
        chat!.id,
    );

    expect(is_friend_participant).toBeTruthy();
    expect(is_friend_has_chat_access).not.toBeNull();
});
