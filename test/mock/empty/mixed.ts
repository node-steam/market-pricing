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

nock(base)

// First Valid Item Request
.get(path)
.query({
    appid: Application.CSGO,
    currency: Currency.USD,
    market_hash_name: 'FirstItem',
})
.reply(200, {
    lowest_price: '$1.00',
    median_price: '$1.30',
    success: true,
    volume: '328',
})

// Second Valid Item Request
.get(path)
.query({
    appid: Application.CSGO,
    currency: Currency.USD,
    market_hash_name: 'SecondItem',
})
.reply(200, {
    lowest_price: '$2.00',
    median_price: '$1.70',
    success: true,
    volume: '612',
})

// First Valid Item Request
.get(path)
.query({
    appid: Application.CSGO,
    currency: Currency.USD,
    market_hash_name: 'FirstEmptyItem',
})
.reply(200, {
    success: true,
})

// Second Valid Item Request
.get(path)
.query({
    appid: Application.CSGO,
    currency: Currency.USD,
    market_hash_name: 'SecondEmptyItem',
})
.reply(200, {
    success: true,
});

const API = new Market({ id: Application.CSGO, currency: Currency.USD });

test('Multiple Mixed Items That Are Empty And Are Not Empty', async (t) => {
    const item = await API.getPrices([
        'FirstEmptyItem',
        'SecondEmptyItem',
        'FirstItem',
        'SecondItem',
    ]);
    const should = {
        errors: [
            {
                code: 'ITEM_NO_DATA',
                error: 'Item Was Found But No Data Transmitted!',
                id: 'FirstEmptyItem',
            },
            {
                code: 'ITEM_NO_DATA',
                error: 'Item Was Found But No Data Transmitted!',
                id: 'SecondEmptyItem',
            },
        ],
        results: [
            {
                id: 'FirstItem',
                price: {
                    code: 'USD',
                    lowest: 1,
                    median: 1.3,
                    sign: '$',
                    type: 'us-dollar',
                },
                volume: 328,
            },
            {
                id: 'SecondItem',
                price: {
                    code: 'USD',
                    lowest: 2,
                    median: 1.7,
                    sign: '$',
                    type: 'us-dollar',
                },
                volume: 612,
            },
        ],
    };
    t.deepEqual(item, should);
});
