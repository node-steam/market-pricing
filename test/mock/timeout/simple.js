import 'app-module-path/cwd';

import test from 'ava';
import nock from 'nock';

import {
    Market,
    Currency,
    Application,
} from 'lib';

import {
    base,
    path,
} from 'test/settings';

// Timeout
nock(base)
.get(path)
.query({
    appid: Application.CSGO,
    currency: Currency.USD,
    market_hash_name: 'TestTimeout',
})
.socketDelay(1000)
.reply(200, { success: true });

const API = new Market({ id: Application.CSGO, currency: Currency.USD, timeout: 500 });

test('Steam API Timeout', async (t) => {
    const error = await t.throws(API.getPrice('TestTimeout'));
    t.is(error.message, 'Socket Timed Out!');
});
