import 'app-module-path/cwd';

import test from 'ava';
import nock from 'nock';

import {
    Market,
    Currency,
    Application,
} from 'lib';

nock('https://steamcommunity.com')

// First Valid Item Request
.get(`/market/priceoverview?currency=${Currency.GBP}&appid=${Application.CSGO}&market_hash_name=FirstItem`)
.reply(200, {
    success: true,
    lowest_price: '£1.00',
    volume: '328',
    median_price: '£1.30',
})

// Second Valid Item Request
.get(`/market/priceoverview?currency=${Currency.GBP}&appid=${Application.CSGO}&market_hash_name=SecondItem`)
.reply(200, {
    success: true,
    lowest_price: '£2.00',
    volume: '612',
    median_price: '£1.70',
});

const API = new Market({ id: Application.CSGO, currency: Currency.GBP });

test('Multiple Items', async (t) => {
    const item = await API.getPrices(['FirstItem', 'SecondItem']);
    const should = [
        {
            id: 'FirstItem',
            price: {
                type: 'pound',
                code: 'GBP',
                sign: '£',
                lowest: 1,
                median: 1.3,
            },
            volume: 328,
        },
        {
            id: 'SecondItem',
            price: {
                type: 'pound',
                code: 'GBP',
                sign: '£',
                lowest: 2,
                median: 1.7,
            },
            volume: 612,
        },
    ];
    t.deepEqual(item.results, should);
});
