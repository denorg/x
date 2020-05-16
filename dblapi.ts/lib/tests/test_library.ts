import DBL from '../mod.ts';
import * as config from '../config.ts';
import { botIds, userIds } from '../tests/test_constants.ts';
// @ts-ignore
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

const dbl = new DBL('api key', { clientId: 'client_id' });

Deno.test(async function getBot() {
    for (const bot of botIds) {
        let data = await dbl.getBot(bot);
        assertEquals(data.id, bot);
    };
});

Deno.test(async function getUser() {
    for (const user of userIds) {
        let data = await dbl.getUser(user);
        assertEquals(data.id, user);
    }
});

Deno.test(async function getStats() {
    for (const bot of botIds) {
        let data = await dbl.getStats(bot);
        if (data.error) {
            throw new Error(data.error);
        }
    }
});

Deno.test(async function checkVotes() {
    for (const user of userIds) {
        let data = await dbl.checkVotes(user);
        if (data.error) {
            throw new Error(data.error);
        }
    }
});

Deno.test(async function getVotes() {
    for (const bot of botIds) {
        let data = await dbl.getVotes(bot);
        if (data.error !== 'Forbidden') {
            throw new Error(data.error);
        }
    }
})

Deno.test(async function getBots() {
    let data = await dbl.getBots({ limit: 50 });
    if (data.error) {
        throw new Error(data.error);
    }
});