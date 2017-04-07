import 'app-module-path/cwd';

import test from 'ava';
import nock from 'nock';

import {
    Market,
    Currency,
    Application,
} from 'lib';

nock('https://steamcommunity.com')

// Non-Existent Item With Status Code 500
.get(`/market/priceoverview?currency=${Currency.USD}&appid=${Application.CSGO}&market_hash_name=DoesNotExist500`)
.reply(500, {success: false})
// Non-Existent Item With Status Code 404
.get(`/market/priceoverview?currency=${Currency.USD}&appid=${Application.CSGO}&market_hash_name=DoesNotExist404`)
.reply(404, {success: false});

const API = new Market({ id: Application.CSGO, currency: Currency.USD });

test(`One Item That Doesn't Exist | 500`, async (t) => {
    const item = await t.throws(API.getPrice('DoesNotExist500'));
    t.deepEqual(item.message, 'Item not found! Status: 500');
});

test(`One Item That Doesn't Exist | 404`, async (t) => {
    const item = await t.throws(API.getPrice('DoesNotExist404'));
    t.deepEqual(item.message, 'Item not found! Status: 404');
});
