import { afterAll, beforeAll, expect, test } from '@jest/globals';
import { chat_create, chat_remove } from '~~/server/api/modules/chats';
import {
    message_add,
    message_edit,
    message_remove,
    messages_get,
} from '~~/server/api/modules/messages';
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
    email: 'userSDUHFROIADSDASDSADMFSD@email.com',
    password: 'sdij390jtgniewdplgf',
};

const user_credentials_friend_1: UserCreds = {
    email: 'userOQOWEOSDSDADASDASDRMCXKS@gmail.com',
    password: 'opwekmrfsdfsd',
};

const user_credentials_friend_2: UserCreds = {
    email: 'userMVNBEUGOWFCSXZSCSADSAOLSNFN@gmail.com',
    password: 'kmfplkmsfdkjdhirejgf',
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

test('can add message to the chat', async () => {
    const title = 'new chat 6';
    const message_content = 'this is a test message';
    const chat = await chat_create(user_client, title);
    const message_id = await message_add(
        user_client,
        chat!.id,
        message_content,
        MessageType_TEXT,
    );

    expect(message_id).not.toBeNull();

    const messages = await messages_get({
        client: user_client,
        chat_id: chat!.id,
    });

    expect(messages.length).toBe(1);
    expect(messages[0]!.content).toEqual(message_content);
    expect(messages[0]!.type).toEqual(MessageType_TEXT);
});

test('owner can edit messages of TEXT type', async () => {
    const title = 'new chat 7';
    const message_content = 'this is a test message #2';
    const message_content_edited = 'this is a test message #2 - edited content';
    const chat = await chat_create(user_client, title);
    const message_id = await message_add(
        user_client,
        chat!.id,
        message_content,
        MessageType_TEXT,
    );
    const was_edited = await message_edit({
        client: user_client,
        message_id: message_id!,
        chat_id: chat!.id,
        content: message_content_edited,
    });

    expect(was_edited).toBeTruthy();

    const messages = await messages_get({
        client: user_client,
        chat_id: chat!.id,
    });
    const message = messages.find(({ id }) => id === message_id);

    expect(message).not.toBeUndefined();
    expect(message?.content).toEqual(message_content_edited);
});

test('owner can not edit messages of FILE / IMAGE type', async () => {
    const title = 'new chat 8';
    const message_content = 'this is message';
    const message_content_edited = 'this is new mesage content';
    const chat = await chat_create(user_client, title);

    for await (const message_type of [MessageType_FILE, MessageType_IMAGE]) {
        const message_id = await message_add(
            user_client,
            chat!.id,
            message_content,
            message_type,
        );
        const was_edited = await message_edit({
            client: user_client,
            message_id: message_id!,
            chat_id: chat!.id,
            content: message_content_edited,
        });

        expect(was_edited).toBeFalsy();

        const messages = await messages_get({
            client: user_client,
            chat_id: chat!.id,
        });
        const message = messages.find(({ id }) => id === message_id);

        expect(message).not.toBeUndefined();
        expect(message?.content).toEqual(message_content);
    }
});

test('can remove any type of message', async () => {
    const title = 'new chat 9';
    const message_content = 'this is message to be deleted';
    const chat = await chat_create(user_client, title);

    for await (const message_type of [
        MessageType_TEXT,
        MessageType_FILE,
        MessageType_IMAGE,
    ]) {
        const message_id = await message_add(
            user_client,
            chat!.id,
            message_content,
            message_type,
        );

        expect(message_id).not.toBeNull();

        const was_removed = await message_remove({
            client: user_client,
            chat_id: chat!.id,
            message_id: message_id!,
        });

        expect(was_removed).toBeTruthy();
    }

    const messages = await messages_get({
        client: user_client,
        chat_id: chat!.id,
    });

    expect(messages.length).toBe(0);
});

test('if chat is removed, all messages are removed too', async () => {
    const title = 'new chat 10';
    const message_content = 'this is message in the deleted chat';
    const chat = await chat_create(user_client, title);

    for await (const message_type of [
        MessageType_TEXT,
        MessageType_FILE,
        MessageType_IMAGE,
    ]) {
        const message_id = await message_add(
            user_client,
            chat!.id,
            message_content,
            message_type,
        );

        expect(message_id).not.toBeNull();
    }

    const was_removed = await chat_remove(user_client, chat!.id);

    expect(was_removed).toBeTruthy();

    const messages = await messages_get({
        client: user_client,
        chat_id: chat!.id,
    });

    expect(messages.length).toBe(0);
});
