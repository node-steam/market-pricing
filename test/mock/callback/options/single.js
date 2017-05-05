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

// First Valid Item Request
nock(base)
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
});

const API = new Market({ id: Application.CSGO, currency: Currency.EUR });

test('Callback Support For Single Item', (t) => {
    const should = {
        id: 'FirstItem',
        price: {
            type: 'us-dollar',
            code: 'USD',
            sign: '$',
            lowest: 1,
            median: 1.3,
        },
        volume: 328,
    };
    return API.getPrice('FirstItem', { currency: Currency.USD }, (error, item) => {
        t.deepEqual(item, should);
    });
});
