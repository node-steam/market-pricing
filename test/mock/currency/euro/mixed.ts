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

nock(base)

// Non-Existent Item With Status Code 500
.get(path)
.query({
    appid: Application.CSGO,
    currency: Currency.EUR,
    market_hash_name: 'DoesNotExist500',
})
.reply(500, {success: false})
// Non-Existent Item With Status Code 404
.get(path)
.query({
    appid: Application.CSGO,
    currency: Currency.EUR,
    market_hash_name: 'DoesNotExist404',
})
.reply(404, {success: false})

// First Valid Item Request
.get(path)
.query({
    appid: Application.CSGO,
    currency: Currency.EUR,
    market_hash_name: 'FirstItem',
})
.reply(200, {
    lowest_price: '1,00€',
    median_price: '1,30€',
    success: true,
    volume: '328',
})

// Second Valid Item Request
.get(path)
.query({
    appid: Application.CSGO,
    currency: Currency.EUR,
    market_hash_name: 'SecondItem',
})
.reply(200, {
    lowest_price: '2,00€',
    median_price: '1,70€',
    success: true,
    volume: '612',
});

const API = new Market({ id: Application.CSGO, currency: Currency.EUR });

test('Multiple Mixed Items That Do And Do Not Exist', async (t) => {
    const item = await API.getPrices([
        'DoesNotExist500',
        'DoesNotExist404',
        'FirstItem',
        'SecondItem',
    ]);
    const should = {
        errors: [
            {
                code: error.codes.ITEM_NOT_FOUND,
                error: 'Item Not Found! Status: 500',
                id: 'DoesNotExist500',
            },
            {
                code: error.codes.ITEM_NOT_FOUND,
                error: 'Item Not Found! Status: 404',
                id: 'DoesNotExist404',
            },
        ],
        results: [
            {
                id: 'FirstItem',
                price: {
                    code: 'EUR',
                    lowest: 1,
                    median: 1.3,
                    sign: '€',
                    type: 'euro',
                },
                volume: 328,
            },
            {
                id: 'SecondItem',
                price: {
                    code: 'EUR',
                    lowest: 2,
                    median: 1.7,
                    sign: '€',
                    type: 'euro',
                },
                volume: 612,
            },
        ],
    };
    t.deepEqual(item, should);
});
