import test from 'ava';
import * as nock from 'nock';

import {
    Application,
    Currency,
} from '@node-steam/data';

import {
    Market,
} from 'lib';

import {
    base,
    path,
} from 'test/settings';

// One Item Rate Limited Request
nock(base)
.get(path)
.query({
    appid: Application.CSGO,
    currency: Currency.USD,
    market_hash_name: 'TestRateLimitForOneItem',
})
.reply(429);

const API = new Market({ id: Application.CSGO, currency: Currency.USD });

test('Steam API Rate Limiting For One Item', async (t) => {
    const error = await t.throwsAsync(API.getPrice('TestRateLimitForOneItem'));
    t.is(error.message, 'Steam API Rate Limit Exceeded!');
});
