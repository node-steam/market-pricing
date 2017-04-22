import 'app-module-path/cwd';

import test from 'ava';
import nock from 'nock';

import {
    Market,
    Currency,
    Application,
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
    const error = await t.throws(API.getPrice('TestRateLimitForOneItem'));
    t.is(error.message, 'Steam API Rate Limit Exceeded!');
});
