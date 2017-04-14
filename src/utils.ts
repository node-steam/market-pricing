import {
    Currency,
    CurrencySign,
    CurrencyType,
} from './enums';

import {
    Item,
    RawItem,
} from './types';

/**
 * Clean the currency string we get from the Steam API into a integer
 * @hidden
 */
const unformat = (value: string|number): number => {
    // Fails silently (need decent errors):
    value = value || 0;

    // Return the value as-is if it's already a number:
    if (typeof value === 'number') return value;

    // Build regex to strip out everything except digits, decimal point and minus sign:
    const regex = new RegExp('[^0-9-]', 'g');
    const unformatted = parseInt(('' + value)
    .replace(/\((?=\d+)(.*)\)/, '-$1')
    .replace(',--', '00')
    .replace(regex, ''), 10 ) / 100;

    return !isNaN(unformatted) ? unformatted : 0;
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
 * Determine type of variable
 * @hidden
 */
export const type = (variable: any): string => {
  return ({}).toString.call(variable).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};

/**
 * Generates the cleaned price item
 * @hidden
 */
export const generateItem = (name: string, response: RawItem, currency: number): Item => {
    const result = {
        id: name,
        price: {
            code: determineCurrencyCode(currency),
            lowest: unformat(response.lowest_price),
            median: unformat(response.median_price),
            sign: determineCurrencySign(currency),
            type: determineCurrencyType(currency),
        },
        volume: parseInt(response.volume, 10),
    };

    return result;
};
