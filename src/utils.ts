import {
    Currency,
    CurrencySign,
    CurrencyType,
} from './enums';

import {
    CleanItem,
    RawItem,
} from './types';

/**
 * Determines the type of a variable.
 * Useful for e.g. checking if a object is an error
 * @hidden
 */
export const type = (variable: any):
'boolean'  |
'date'     |
'error'    |
'function' |
'json'     |
'math'     |
'number'   |
'object'   |
'string'   |
'symbol' => {
    return ({}).toString.call(variable).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};

/**
 * Clean the currency string we get from the Steam API into a integer
 * @hidden
 */
const unformat = (value: string): number | Error => {
    if (type(value) !== 'string') return new TypeError(`Supplied value isn't a string!`);

    const x = parseInt(('' + value)
    .replace(/\((?=\d+)(.*)\)/, '-$1')
    .replace(',--', '00')
    .replace(/[^0-9-]/g, ''), 10 ) / 100;

    if (isNaN(x) || x <= 0) {
        return new Error(`Something went wrong when trying to parse the value: ${value}`);
    }

    return x;
};

/**
 * Determine Currency Code by Steam Currency ID
 * @hidden
 */
const determineCurrencyCode = (currency: number): string => {
    return Currency[currency];
};

/**
 * Determine Currency Type by Steam Currency ID
 * @hidden
 */
const determineCurrencyType = (currency: number): string => {
    return CurrencyType[Currency[currency]];
};

/**
 * Determine Currency Sign by Steam Currency ID
 * @hidden
 */
const determineCurrencySign = (currency: number): string => {
    return CurrencySign[Currency[currency]];
};

/**
 * Generates the cleaned price item
 * @hidden
 */
export const generateItem = (name: string, response: RawItem, currency: number): CleanItem | Error => {
    const lowest = unformat(response.lowest_price);

    if (type(lowest) === 'error') return lowest as Error;

    const result: CleanItem = {
        id: name,
        price: {
            code: determineCurrencyCode(currency),
            lowest: lowest as number,
            sign: determineCurrencySign(currency),
            type: determineCurrencyType(currency),
        },
    };

    if (response.median_price) {
        const median = unformat(response.median_price);

        if (type(median) === 'error') return median as Error;

        result.price.median = median as number;
    }

    if (response.volume) {
        result.volume = parseInt(response.volume, 10);
    }

    if (response.timings) {
        result.timings = response.timings;
    }

    return result;
};
