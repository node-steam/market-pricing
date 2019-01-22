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
    lowest_price: '$1.00',
    median_price: '$1.30',
    success: true,
    volume: '328',
});

const API = new Market({
    currency:  Currency.USD,
    id:        Application.CSGO,
    useragent: `Custom User Agent v${version}`,
});

test('Custom User Agent', async (t) => {
    const item = await API.getPrice('CustomUserAgent');
    const should = {
        id: 'CustomUserAgent',
        price: {
            code: 'USD',
            lowest: 1,
            median: 1.3,
            sign: '$',
            type: 'us-dollar',
        },
        volume: 328,
    };
    t.deepEqual(item, should);
});
