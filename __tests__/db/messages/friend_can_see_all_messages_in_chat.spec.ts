import { afterAll, beforeAll, expect, test } from '@jest/globals';
import { chat_create } from '~~/server/api/modules/chats';
import { friend_add } from '~~/server/api/modules/friends';
import { message_add, messages_get } from '~~/server/api/modules/messages';
import { participant_add } from '~~/server/api/modules/participants';
import {
    MessageType_FILE,
    MessageType_IMAGE,
    MessageType_TEXT,
} from '~~/types/database.subtypes';
import type { UserCreds } from '../types';
import {
    create_admin_client,
    create_user,
    create_user_client,
    delete_user,
} from '../utils';

const user_credentials: UserCreds = {
    email: 'userFGHNJSDKOINJ@email.com',
    password: 'uiwbefoi9j34t9hu345gt',
};

const user_credentials_friend: UserCreds = {
    email: 'userSDINEWUHNCOKSD@gmail.com',
    password: 'sdoijmwefuihj243r98j',
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

test('friend can not see messages in chat if not participant', async () => {
    const friend = await user_client_friend.auth.getUser();
    const friend_id = friend!.data!.user!.id;

    await friend_add(user_client, friend_id);

    const chat = await chat_create(user_client, 'new test chat #1');
    const chat_id = chat!.id;

    await message_add(
        user_client,
        chat_id,
        'this is a message #1',
        MessageType_TEXT,
    );
    await message_add(
        user_client,
        chat_id,
        'this is a message #2',
        MessageType_FILE,
    );
    await message_add(
        user_client,
        chat_id,
        'this is a message #3',
        MessageType_IMAGE,
    );

    const messages = await messages_get({ client: user_client, chat_id });

    expect(messages.length).toBe(3);

    const messages_friend = await messages_get({
        client: user_client_friend,
        chat_id,
    });

    expect(messages_friend.length).toBe(0);
});

test('friend can see messages in chat if participant', async () => {
    const friend = await user_client_friend.auth.getUser();
    const friend_id = friend!.data!.user!.id;

    const chat = await chat_create(user_client, 'new test chat #1');
    const chat_id = chat!.id;

    await friend_add(user_client, friend_id);
    await participant_add({ client: user_client, chat_id, friend_id });
    await message_add(
        user_client,
        chat_id,
        'this is a message #1',
        MessageType_TEXT,
    );
    await message_add(
        user_client,
        chat_id,
        'this is a message #2',
        MessageType_FILE,
    );
    await message_add(
        user_client,
        chat_id,
        'this is a message #3',
        MessageType_IMAGE,
    );

    const messages = await messages_get({ client: user_client, chat_id });
    const messages_friend = await messages_get({
        client: user_client_friend,
        chat_id,
    });

    expect(messages.length).toBe(messages_friend.length);
});
