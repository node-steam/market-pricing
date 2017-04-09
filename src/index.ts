import * as async    from 'async';
import * as bluebird from 'bluebird';
import * as request  from 'request';
import * as type     from 'to-type';

/**
 * @hidden
 */
const Bluebird = bluebird;

import {
    Application,
    Currency,
} from './enums';

import {
    CleanItem,
    Item,
    ItemArray,
    ItemError,
    MarketOptions,
    RawItem,
} from './types';

import {
    generateItem,
} from './utils';

import {
    base,
    path,
} from './base';

/**
 * Retrieve price for a single item.
 *
 * @param {string} name Hashed Item Name
 * @param {Object} options Options
 * @param {Function} callback Callback
 */
export const getPrice = (
    name: string,
    options: MarketOptions,
    callback?: Function,
): Promise<Item | Error> | Item | Error => {
    const x = new Bluebird((resolve, reject) => {
        // tslint:disable-next-line:prefer-const
        let { id, country, currency, raw } = options;

        if (!id || type(id) !== 'number') {
            return reject(new Error('Invalid Application ID'));
        }

        if (!currency || type(currency) !== 'number') {
            currency = Currency.USD;
        }

        request({
            baseUrl: base,
            json: true,
            qs: {
                appid: id,
                country,
                currency,
                market_hash_name: name,
            },
            uri: path,
        }, (error, response, body) => {
            if (response.statusCode === 429) {
                return reject(new Error('Steam API Rate Limit Exceeded!'));
            } else if (response.statusCode === 500 || response.statusCode === 404) {
                return reject(new Error(`Item Not Found! Status: ${response.statusCode}`));
            } else if (!error && response.statusCode === 200) {
                const item  = body;
                const clean = generateItem(name, body, currency);
                if (raw) return resolve(item);
                return resolve(clean);
            } else if (error) {
                return reject(error);
            } else if (response) {
                return reject(new Error(`Unknown Error! Status: ${response.statusCode}`));
            } else {
                return reject(new Error('Unknown Error!'));
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
 */
export const getPrices = (
    names: string[],
    options: MarketOptions,
    callback?: Function,
): Promise<ItemArray | Error> | ItemArray | Error  => {
    const x = new Bluebird((resolve, reject) => {
        // tslint:disable-next-line:prefer-const
        let { id, country, currency, raw } = options;

        if (!id || type(id) !== 'number') {
            return reject(new Error('Invalid Application ID'));
        }

        if (!currency || type(currency) !== 'number') {
            currency = Currency.USD;
        }

        const i: ItemArray = {
            errors: [],
            results: [],
        };

        async.each(names, (name, cb) => {
            request({
                baseUrl: base,
                json: true,
                qs: {
                    appid: id,
                    country,
                    currency,
                    market_hash_name: name,
                },
                uri: path,
            }, (error, response, body) => {
                if (response.statusCode === 429) {
                    return reject(new Error('Steam API Rate Limit Exceeded!'));
                } else if (response.statusCode === 500 || response.statusCode === 404) {
                    i.errors.push({ id: name, error: `Item Not Found! Status: ${response.statusCode}` });
                    cb();
                } else if (!error && response.statusCode === 200) {
                    const item  = body;
                    const clean = generateItem(name, body, currency);
                    if (raw) {
                        i.results.push(item);
                    } else {
                        i.results.push(clean);
                    }
                    cb();
                } else if (error) {
                    i.errors.push({ id: name, error: error.toString() });
                    cb();
                } else if (response) {
                    i.errors.push({ id: name, error: `Unknown Error! Status: ${response.statusCode}` });
                    cb();
                } else {
                    i.errors.push({ id: name, error: 'Unknown Error!' });
                    cb();
                }
            });
        }, () => {
            if (!i.results.length && i.errors.length) {
                return reject(i.errors);
            } else if (!i.results.length && !i.errors.length) {
                return reject(new Error('Something Really Weird Happened!'));
            }
            return resolve(i);
        });
    });

    if (callback) return x.asCallback(callback);

    return x;
};

/**
 * Market Class.
 */
export class Market {
    /**
     * Application ID of the game you want to query skin/s for
     */
    public appid: number;
    /**
     * Optional [ISO-3166](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code
     */
    public country?: string;
    /**
     * Optional currency integer
     */
    public currency?: number;
    /**
     * Request the raw object
     */
    public raw?: boolean;

    /**
     * Create the API
     *
     * @param options Options
     */
    constructor(options: MarketOptions) {
        if (type(options) !== 'object') throw new Error('Invalid Options Passed To Constructor!');

        this.appid    = options.id;
        this.currency = options.currency || Currency.USD;
        this.country  = options.country;
        this.raw      = options.raw || false;

        if (type(this.appid) !== 'number') throw new Error('Invalid Application ID!');
    }

    /**
     * Get a item
     * @param name The name of the skin
     */
    public getPrice(name: string, callback?: Function) {
        return getPrice(name, { id: this.appid, currency: this.currency, country: this.country, raw: this.raw }, callback);
    }

    /**
     * Get a array of items
     * @param name Array with the names of the skins
     * @param callback The `callback` if you use it
     */
    public getPrices(names: string[], callback?: Function) {
        return getPrices(names, { id: this.appid, currency: this.currency, country: this.country, raw: this.raw }, callback);
    }
}

export {
    Currency,
    Application,
    MarketOptions,
    Item,
    ItemError,
    ItemArray,
};
