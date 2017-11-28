import 'app-module-path/cwd';

import test from 'ava';

import {
    Market,
} from 'lib';

test('Invalid Constructor', (t) => {
    const market = t.throws(() => {
        return new Market('null');
    });
    t.deepEqual(market.message, 'Invalid options passed to constructor!');
});
