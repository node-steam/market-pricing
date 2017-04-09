import 'app-module-path/cwd';

import test from 'ava';
import nock from 'nock';

import {
    Market,
    Currency,
    Application,
} from 'lib';

nock('https://steamcommunity.com')

// Several Items Rate Limited Request
.get(`/market/priceoverview?appid=${Application.CSGO}&currency=${Currency.USD}&market_hash_name=TestRateLimitForSeveralItemsOne`)
.reply(429)
.get(`/market/priceoverview?appid=${Application.CSGO}&currency=${Currency.USD}&market_hash_name=TestRateLimitForSeveralItemsTwo`)
.reply(429);

const API = new Market({ id: Application.CSGO, currency: Currency.USD });

test('Steam API Rate Limiting For Several Items', async (t) => {
    const error = await t.throws(API.getPrices([
        'TestRateLimitForSeveralItemsOne',
        'TestRateLimitForSeveralItemsTwo',
    ]));
    t.is(error.message, 'Steam API Rate Limit Exceeded!');
});
