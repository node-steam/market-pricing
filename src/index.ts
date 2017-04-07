import * as request  from 'request';
import * as type     from 'to-type';
import * as async    from 'async';
import * as bluebird from 'bluebird';

import {
    Currency,
    CurrencyType,
    CurrencySign,
    Application,
} from './enums';

const Bluebird = bluebird;

export {
    Currency,
    Application,
};

const base = 'https://steamcommunity.com';
const path = '/market/priceoverview';

export type Options = {
    id: number,
    country?: string,
    currency?: number,
};

export type Raw = {
    success: boolean,
    lowest_price: string,
    volume: string,
    median_price: string,
};

export type Item = {
    id: string,
    price: {
        type: string,
        code: string,
        sign: string,
        lowest: number,
        median: number,
    },
    volume: number,
};

export type ItemError = {
    id: string,
    error: string,
};

export type ItemArray = {
    errors: Array<ItemError>,
    results: Array<Item>,
};

const unformat = (value: string|number) => {
    // Fails silently (need decent errors):
    value = value || 0;

    // Return the value as-is if it's already a number:
    if (typeof value === 'number') return value;

    // Build regex to strip out everything except digits, decimal point and minus sign:
    const regex = new RegExp('[^0-9-]', 'g');
    const unformatted = parseInt(
        ('' + value)
        .replace(/\((?=\d+)(.*)\)/, '-$1')
        .replace(',--', '00')
        .replace(regex, '')
	) / 100;

    return !isNaN(unformatted) ? unformatted : 0;
};

const determineCurrencyCode = (currency: number): string => {
    return Currency[currency];
};

const determineCurrencyType = (currency: number): string => {
    return CurrencyType[Currency[currency]];
};

const determineCurrencySign = (currency: number): string => {
    return CurrencySign[Currency[currency]];
};

const generateItem = (name: string, response: Raw, currency: number): Item => {
    const result = {
        id: name,
        price: {
            type: determineCurrencyType(currency),
            code: determineCurrencyCode(currency),
            sign: determineCurrencySign(currency),
            lowest: unformat(response.lowest_price),
            median: unformat(response.median_price),
        },
        volume: parseInt(response.volume, 10),
    };

    return result;
};

/**
 * Retrieve price for a single item.
 *
 * @param {string} name Hashed Item Name
 * @param {Object} options Options
 * @param {Function} callback Callback
 * @return {Object} The item
 */
export const getPrice = (
    name: string,
    options: Options,
    callback?: Function,
): Promise<Item | Error> | Item | Error => {
    const x = new Bluebird((resolve, reject) => {
        let { id, country, currency } = options;

        if (!id || type(id) !== 'number') {
            return reject(new Error('Invalid Application ID'));
        }

        if (!currency || type(currency) !== 'number') {
            currency = Currency.USD;
        }

        request({
            uri: path,
            baseUrl: base,
            json: true,
            qs: {
                currency: currency,
                appid: id,
                market_hash_name: name,
                country: country,
            },
        }, (error, response, body) => {
            if (response.statusCode === 429) {
                return reject(new Error('Steam API Rate Limit Exceeded!'));
            } else if (response.statusCode === 500 || response.statusCode === 404) {
                return reject(new Error(`Item not found! Status: ${response.statusCode}`));
            } else if (!error && response.statusCode === 200) {
                const item = generateItem(name, body, currency);
                return resolve(item);
            } else if (error) {
                return reject(error);
            } else if (response) {
                return reject(new Error(`Unknown error! Status: ${response.statusCode}`));
            } else {
                return reject(new Error('Unknown error!'));
            }
        });
    });

    if (callback) return x.asCallback(callback);

    return x;
};

/**
 * Retrieve price for a array of items.
 *
 * @param {Array<string>} names Array Of Hashed Item Names
 * @param {Object} options Options
 * @param {Function} callback Callback
 * @return {Array} The items
 */
export const getPrices = (
    names: Array<string>,
    options: Options,
    callback?: Function,
): Promise<ItemArray | Error> | ItemArray | Error  => {
    const x = new Bluebird((resolve, reject) => {
        let { id, country, currency } = options;

        if (!id || type(id) !== 'number') {
            return reject(new Error('Invalid Application ID'));
        }

        if (!currency || type(currency) !== 'number') {
            currency = Currency.USD;
        }

        const x: ItemArray = {
            errors: [],
            results: [],
        };

        async.each(names, (name, callback) => {
            request({
                uri: path,
                baseUrl: base,
                json: true,
                qs: {
                    currency: currency,
                    appid: id,
                    market_hash_name: name,
                    country: country,
                },
            }, (error, response, body) => {
                if (response.statusCode === 429) {
                    return reject(new Error('Steam API Rate Limit Exceeded!'));
                } else if (response.statusCode === 500 || response.statusCode === 404) {
                    x.errors.push({ id: name, error: `Item not found! Status: ${response.statusCode}` });
                    callback();
                } else if (!error && response.statusCode === 200) {
                    const item = generateItem(name, body, currency);
                    x.results.push(item);
                    callback();
                } else if (error) {
                    x.errors.push({ id: name, error: error.toString() });
                    callback();
                } else if (response) {
                    x.errors.push({ id: name, error: `Unknown error! Status: ${response.statusCode}` });
                    callback();
                } else {
                    x.errors.push({ id: name, error: 'Unknown error!' });
                    callback();
                }
            });
        }, () => {
            if (!x.results.length && x.errors.length) {
                return reject(x.errors);
            } else if (!x.results.length && !x.errors.length) {
                return reject(new Error('Something really weird happened!'));
            }
            return resolve(x);
        });
    });

    if (callback) return x.asCallback(callback);

    return x;
};

/**
 * Market Class.
 */
export class Market {
    appid: number;
    currency: number;
    country: string;

    /**
     * Create the API
     *
     * @param {Object} options Options
     */
    constructor(options: Options) {
        this.appid = options.id;
        this.currency = options.currency;
        this.country = options.country;
    }

    /**
     * Get a item
     * @param {string} name The name of the skin
     * @return {Object} The item
     */
    getPrice(name: string, callback?: Function) {
        return getPrice(name, { id: this.appid, currency: this.currency, country: this.country }, callback);
    }

    /**
     * Get a array of items
     * @param {string} name Array with the names of the skins
     * @return {Array} The items
     */
    getPrices(names: Array<string>, callback?: Function) {
        return getPrices(names, { id: this.appid, currency: this.currency, country: this.country }, callback);
    }
};
