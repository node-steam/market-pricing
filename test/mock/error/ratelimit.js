import 'app-module-path/cwd';

import test from 'ava';
import nock from 'nock';

import {
    Currency,
    Application,
} from '@node-steam/data';

import {
    Market,
    error,
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
    const exception = await t.throws(API.getPrice('TestRateLimitError'));
    t.is(exception.code, error.codes.RATELIMIT_EXCEEDED);
    t.is(exception.message, error.messages.RATELIMIT_EXCEEDED);
});
