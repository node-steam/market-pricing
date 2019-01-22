import test from 'ava';

import {
    Market,
} from 'lib';

test('Invalid Constructor', (t) => {
    const market = t.throws(() => {
        return new Market('null' as any);
    });
    t.deepEqual(market.message, 'Invalid Options Passed To Constructor!');
});
