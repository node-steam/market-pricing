import test from 'ava';
import * as nock from 'nock';

import {
    Application,
    Currency,
} from '@node-steam/data';

import {
    error,
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
    market_hash_name: 'TestRateLimitError',
})
.reply(429);

const API = new Market({ id: Application.CSGO, currency: Currency.USD });

test('Error Code For Ratelimit', async (t) => {
    const exception: error.Exception = await t.throwsAsync(API.getPrice('TestRateLimitError')) as any;
    t.is(exception.code, error.codes.RATELIMIT_EXCEEDED);
    t.is(exception.message, error.messages.RATELIMIT_EXCEEDED);
});
