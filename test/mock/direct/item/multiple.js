import 'app-module-path/cwd';

import test from 'ava';
import nock from 'nock';

import {
    getPrices,
    Currency,
    Application,
} from 'lib';

import {
    base,
    path,
} from 'test/settings';

nock(base)

// First Valid Item Request
.get(path)
.query({
    appid: Application.CSGO,
    currency: Currency.USD,
    market_hash_name: 'FirstItem',
})
.reply(200, {
    success: true,
    lowest_price: '$1.00',
    volume: '328',
    median_price: '$1.30',
})

// Second Valid Item Request
.get(path)
.query({
    appid: Application.CSGO,
    currency: Currency.USD,
    market_hash_name: 'SecondItem',
})
.reply(200, {
    success: true,
    lowest_price: '$2.00',
    volume: '612',
    median_price: '$1.70',
});

test('Multiple Items', async (t) => {
    const item = await getPrices(['FirstItem', 'SecondItem'], { id: Application.CSGO, currency: Currency.USD });
    const should = [
        {
            id: 'FirstItem',
            price: {
                type: 'us-dollar',
                code: 'USD',
                sign: '$',
                lowest: 1,
                median: 1.3,
            },
            volume: 328,
        },
        {
            id: 'SecondItem',
            price: {
                type: 'us-dollar',
                code: 'USD',
                sign: '$',
                lowest: 2,
                median: 1.7,
            },
            volume: 612,
        },
    ];
    t.deepEqual(item.results, should);
});
