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
    currency: Currency.USD,
    market_hash_name: 'DoesNotExist500-One',
})
.reply(500, {success: false})
.get(path)
.query({
    appid: Application.CSGO,
    currency: Currency.USD,
    market_hash_name: 'DoesNotExist500-Two',
})
.reply(500, {success: false})

// Non-Existent Item With Status Code 404
.get(path)
.query({
    appid: Application.CSGO,
    currency: Currency.USD,
    market_hash_name: 'DoesNotExist404-One',
})
.reply(404, {success: false})
.get(path)
.query({
    appid: Application.CSGO,
    currency: Currency.USD,
    market_hash_name: 'DoesNotExist404-Two',
})
.reply(404, {success: false});

const API = new Market({ id: Application.CSGO, currency: Currency.USD });

test('Multiple Items That Do Not Exist', async (t) => {
    const item: nodesteam.ItemArray = await API.getPrices([
        'DoesNotExist500-One',
        'DoesNotExist500-Two',
        'DoesNotExist404-One',
        'DoesNotExist404-Two',
    ])
    .catch((e) => e);
    const should = [
        {
            code: error.codes.ITEM_NOT_FOUND,
            error: 'Item Not Found! Status: 500',
            id: 'DoesNotExist500-One',
        },
        {
            code: error.codes.ITEM_NOT_FOUND,
            error: 'Item Not Found! Status: 500',
            id: 'DoesNotExist500-Two',
        },
        {
            code: error.codes.ITEM_NOT_FOUND,
            error: 'Item Not Found! Status: 404',
            id: 'DoesNotExist404-One',
        },
        {
            code: error.codes.ITEM_NOT_FOUND,
            error: 'Item Not Found! Status: 404',
            id: 'DoesNotExist404-Two',
        },
    ] as any as nodesteam.ItemArray;
    t.deepEqual(item, should);
});
