import 'app-module-path/cwd';

import test from 'ava';
import nock from 'nock';

import {
    Currency,
    Application,
} from '@node-steam/data';

import {
    Market,
} from 'lib';

import {
    base,
    path,
} from 'test/settings';

nock(base)

// Several Items Rate Limited Request
.get(path)
.query({
    appid: Application.CSGO,
    currency: Currency.USD,
    market_hash_name: 'TestRateLimitForSeveralItemsOne',
})
.reply(429)
.get(path)
.query({
    appid: Application.CSGO,
    currency: Currency.USD,
    market_hash_name: 'TestRateLimitForSeveralItemsTwo',
})
.reply(429);

const API = new Market({ id: Application.CSGO, currency: Currency.USD });

test('Steam API Rate Limiting For Several Items', async (t) => {
    const error = await t.throws(API.getPrices([
        'TestRateLimitForSeveralItemsOne',
        'TestRateLimitForSeveralItemsTwo',
    ]));
    t.is(error.message, 'Steam API Rate Limit Exceeded!');
});
