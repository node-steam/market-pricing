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
.get(`/market/priceoverview?appid=${Application.CSGO}&currency=${Currency.GBP}&market_hash_name=FirstItem`)
.reply(200, {
    success: true,
    lowest_price: '£1.00',
    volume: '328',
    median_price: '£1.30',
});

const API = new Market({ id: Application.CSGO, currency: Currency.GBP });

test('One Item', async (t) => {
    const item = await API.getPrice('FirstItem');
    const should = {
        id: 'FirstItem',
        price: {
            type: 'pound',
            code: 'GBP',
            sign: '£',
            lowest: 1,
            median: 1.3,
        },
        volume: 328,
    };
    t.deepEqual(item, should);
});
