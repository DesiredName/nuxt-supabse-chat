import { afterAll, beforeAll, expect, test } from '@jest/globals';
import {
    chat_create,
    chat_get,
    chat_remove,
    chat_update,
    chats_get,
    is_chat_owner,
    is_chat_participant,
} from '~~/server/api/modules/chats';
import type { UserCreds } from '../types';
import {
    create_admin_client,
    create_user,
    create_user_client,
    delete_user,
} from '../utils';

const user_credentials: UserCreds = {
    email: 'userNMCIEOGLSDF@mail.com',
    password: '90SDFKMER89F',
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

test('can create chat', async () => {
    const title = 'new chat';
    const chat = await chat_create(user_client, title);

    expect(chat).not.toBeNull();
    expect(chat?.title).toEqual(title);
});

test('user is owner and participant of the chat', async () => {
    const title = 'new chat 2';
    const chat = await chat_create(user_client, title);
    const is_owner = await is_chat_owner(user_client, chat!.id);
    const is_participant = await is_chat_participant(user_client, chat!.id);

    expect(is_owner).toBeTruthy();
    expect(is_participant).toBeTruthy();
});

test('can update chat', async () => {
    const title = 'new chat 3';
    const new_title = 'new chat 4';
    const chat = await chat_create(user_client, title);
    const was_updated = await chat_update(user_client, chat!.id, new_title);

    expect(was_updated).toBeTruthy();
});

test('can remove chat', async () => {
    const title = 'new chat 5';
    const chat = await chat_create(user_client, title);
    const was_deleted = await chat_remove(user_client, chat!.id);
    const chat_2 = await chat_get(user_client, chat!.id);

    expect(was_deleted).toBeTruthy();
    expect(chat_2).toBeNull();
});

test('can list all chats', async () => {
    const chats = await chats_get(user_client);

    expect(chats.length).toBeGreaterThan(0);
});
