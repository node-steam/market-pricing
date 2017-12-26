import 'app-module-path/cwd';

import test from 'ava';
import nock from 'nock';

import {
    Currency,
    Application,
} from '@node-steam/data';

import {
    Market,
    error,
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
    const exception = await t.throws(API.getPrice('FirstEmptyItem'));
    t.is(exception.code, error.codes.ITEM_NO_DATA);
    t.is(exception.message, error.messages.ITEM_NO_DATA);
});
