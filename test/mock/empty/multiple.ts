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

test('Multiple Empty Items', async (t) => {
    const exception = await API.getPrices(['FirstEmptyItem', 'SecondEmptyItem']).catch((e) => e);
    const should = [
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
    ] as any as nodesteam.ItemArray;
    t.deepEqual(should, exception);
});
