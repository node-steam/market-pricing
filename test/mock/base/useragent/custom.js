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
    version,
} from 'test/settings';

// First Valid Request
nock(base, {
    reqheaders: {
        'User-Agent': `Custom User Agent v${version}`,
    },
})
.get(path)
.query({
    appid: Application.CSGO,
    currency: Currency.USD,
    market_hash_name: 'CustomUserAgent',
})
.reply(200, {
    success: true,
    lowest_price: '$1.00',
    volume: '328',
    median_price: '$1.30',
});

const API = new Market({
    id:        Application.CSGO,
    currency:  Currency.USD,
    useragent: `Custom User Agent v${version}`,
});

test('Custom User Agent', async (t) => {
    const item = await API.getPrice('CustomUserAgent');
    const should = {
        id: 'CustomUserAgent',
        price: {
            type: 'us-dollar',
            code: 'USD',
            sign: '$',
            lowest: 1,
            median: 1.3,
        },
        volume: 328,
    };
    t.deepEqual(item, should);
});
