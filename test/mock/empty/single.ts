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

// First Valid Item Request
nock(base)
.get(path)
.query({
    appid: Application.CSGO,
    currency: Currency.USD,
    market_hash_name: 'FirstEmptyItem',
})
.reply(200, {
    success: true,
});

const API = new Market({ id: Application.CSGO, currency: Currency.USD });

test('One Empty Item', async (t) => {
    const exception: error.Exception = await t.throwsAsync(API.getPrice('FirstEmptyItem')) as any;
    t.is(exception.code, error.codes.ITEM_NO_DATA);
    t.is(exception.message, error.messages.ITEM_NO_DATA);
});
