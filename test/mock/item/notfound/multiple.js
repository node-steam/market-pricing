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
.get(`/market/priceoverview?appid=${Application.CSGO}&currency=${Currency.USD}&market_hash_name=DoesNotExist500-One`)
.reply(500, {success: false})
.get(`/market/priceoverview?appid=${Application.CSGO}&currency=${Currency.USD}&market_hash_name=DoesNotExist500-Two`)
.reply(500, {success: false})

// Non-Existent Item With Status Code 404
.get(`/market/priceoverview?appid=${Application.CSGO}&currency=${Currency.USD}&market_hash_name=DoesNotExist404-One`)
.reply(404, {success: false})
.get(`/market/priceoverview?appid=${Application.CSGO}&currency=${Currency.USD}&market_hash_name=DoesNotExist404-Two`)
.reply(404, {success: false});

const API = new Market({ id: Application.CSGO, currency: Currency.USD });

test('Multiple Items That Do Not Exist', async (t) => {
    const item = await t.throws(API.getPrices([
        'DoesNotExist500-One',
        'DoesNotExist500-Two',
        'DoesNotExist404-One',
        'DoesNotExist404-Two',
    ]));
    const should = [
        {
            error: 'Item Not Found! Status: 500',
            id: 'DoesNotExist500-One',
        },
        {
            error: 'Item Not Found! Status: 500',
            id: 'DoesNotExist500-Two',
        },
        {
            error: 'Item Not Found! Status: 404',
            id: 'DoesNotExist404-One',
        },
        {
            error: 'Item Not Found! Status: 404',
            id: 'DoesNotExist404-Two',
        },
    ];
    t.deepEqual(item, should);
});
