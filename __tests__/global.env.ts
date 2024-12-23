import * as dotenv from 'dotenv';

export default async function init_tests_env() {
    dotenv.config({
        path: './.env',
        encoding: 'utf-8',
        debug: true,
    });
}
