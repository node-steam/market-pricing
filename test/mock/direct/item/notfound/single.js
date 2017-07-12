import 'app-module-path/cwd';

import test from 'ava';
import nock from 'nock';

import {
    getPrice,
    Currency,
    Application,
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
    currency: Currency.USD,
    market_hash_name: 'DoesNotExist500',
})
.reply(500, {success: false})
// Non-Existent Item With Status Code 404
.get(path)
.query({
    appid: Application.CSGO,
    currency: Currency.USD,
    market_hash_name: 'DoesNotExist404',
})
.reply(404, {success: false});

test(`One Item That Doesn't Exist | 500`, async (t) => {
    const item = await t.throws(getPrice('DoesNotExist500', { id: Application.CSGO, currency: Currency.USD }));
    t.deepEqual(item.message, 'Item Not Found! Status: 500');
});

test(`One Item That Doesn't Exist | 404`, async (t) => {
    const item = await t.throws(getPrice('DoesNotExist404', { id: Application.CSGO, currency: Currency.USD }));
    t.deepEqual(item.message, 'Item Not Found! Status: 404');
});
