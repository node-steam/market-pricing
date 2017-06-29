import * as async    from 'async';
import * as Bluebird from 'bluebird';
import * as request  from 'request';

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
    OverwriteMarketOptions,
    RawItem,
} from './types';

import {
    generateItem,
    type,
} from './utils';

import {
    base,
    path,
    version,
} from './base';

/**
 * Make a request to the Steam API
 * @hidden
 */
const get = (name: string, id: number, currency: number, country?: string, address?: string, timeout?: number, timings?: boolean): Bluebird<RawItem> => {
    return new Bluebird((resolve, reject) => {
        request({
            baseUrl: base,
            gzip: true,
            headers: {
                'User-Agent': `N|Steam Market-Pricing v${version} (https://github.com/node-steam/market-pricing)`,
            },
            json: true,
            localAddress: address,
            qs: {
                appid: id,
                country,
                currency,
                market_hash_name: name,
            },
            removeRefererHeader: true,
            strictSSL: true,
            time: timings,
            timeout,
            uri: path,
        }, (error, response, body) => {
            if (response && response.statusCode === 429) {
                return reject(new Error('Steam API Rate Limit Exceeded!'));
            } else if (response && response.statusCode === 500 || response && response.statusCode === 404) {
                return reject(new Error(`Item Not Found! Status: ${response.statusCode}`));
            } else if (!error && response.statusCode === 200) {
                const result = body;
                if (timings) {
                    result.timings = {
                        phases: response.timings,
                        start: response.timingStart,
                        timestamps: response.timingPhases,
                    };
                }
                return resolve(result);
            } else if (error && error.message === 'ETIMEDOUT') {
                return reject(new Error('Connection Timed Out!'));
            } else if (error && error.message === 'ESOCKETTIMEDOUT') {
                return reject(new Error('Socket Timed Out!'));
            } else if (error && error.message === 'ECONNRESET') {
                return reject(new Error('Connection Was Reset!'));
            } else if (error) {
                return reject(error);
            } else if (response) {
                return reject(new Error(`Unknown Error! Status: ${response.statusCode}`));
            }

            return reject(new Error('Unknown Error!'));
        });
    }) as Bluebird<RawItem>;
};

/**
 * Retrieve price for a single item.
 *
 * @param  {String}   name       - Hashed Item Name
 * @param  {Object}   options    - Options
 * @param  {Function} [callback] - Callback
 * @return {Promise<Item>}
 *
 */
export const getPrice = (
    name: string,
    options: MarketOptions,
    callback?: (error: Error, result: Item) => void,
): Bluebird<Item> => {
    const x = new Bluebird((resolve, reject) => {
        const {
            id,
            country,
            raw,
            address,
            timeout,
            timings,
        } = options;

        let {
            currency,
        } = options;

        if (!id || typeof id !== 'number') {
            return reject(new Error('Invalid Application ID'));
        }

        if (typeof currency !== 'number') {
            currency = Currency.USD;
        }

        currency = currency || Currency.USD;

        get(name, id, currency, country, address, timeout, timings)
        .then((body) => {
            if (raw) {
                const item = body;
                return resolve(item);
            } else {
                const item = generateItem(name, body, currency);
                return resolve(item);
            }
        })
        .catch((error) => {
            return reject(error);
        });
    });

    if (callback) return x.asCallback(callback) as Bluebird<Item>;

    return x as Bluebird<Item>;
};

/**
 * Retrieve price for a array of items.
 *
 * @param  {Array}    names      - Array Of Hashed Item Names
 * @param  {Object}   options    - Options
 * @param  {Function} [callback] - Callback
 * @return {Promise<ItemArray>}
 *
 */
export const getPrices = (
    names: string[],
    options: MarketOptions,
    callback?: (error: Error, result: ItemArray) => void,
): Bluebird<ItemArray> => {
    const x = new Bluebird((resolve, reject) => {
        const {
            id,
            country,
            raw,
            address,
            timeout,
            timings,
        } = options;

        let {
            currency,
        } = options;

        if (!id || typeof id !== 'number') {
            return reject(new Error('Invalid Application ID'));
        }

        if (typeof currency !== 'number') {
            currency = Currency.USD;
        }

        currency = currency || Currency.USD;

        const i: ItemArray = {
            errors: [],
            results: [],
        };

        async.each(names, (name, cb) => {
            get(name, id, currency, country, address, timeout, timings)
            .then((body) => {
                if (raw) {
                    i.results.push(body);
                } else {
                    const item = generateItem(name, body, currency);

                    if (type(item) === 'error') return reject(item);

                    i.results.push(item as Item);
                }
                cb();
            })
            .catch((error) => {
                if (error.message === 'Steam API Rate Limit Exceeded!') {
                    return reject(error);
                }

                i.errors.push({ id: name, error: error.message });
                cb();
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

    if (callback) return x.asCallback(callback) as Bluebird<ItemArray>;

    return x as Bluebird<ItemArray>;
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
     * Local interface to bind for network connections
     */
    public address?: string;
    /**
     * Whether to return request timings
     */
    public timings?: boolean;
    /**
     * Number of milliseconds to wait for a server to send response headers
     */
    public timeout?: number;
    /**
     * All the settings in one object
     * @hidden
     */
    private settings: MarketOptions;

    /**
     * Create the API
     *
     * @param {Object} options - Options
     *
     */
    constructor(options: MarketOptions) {
        if (typeof options !== 'object') throw new Error('Invalid Options Passed To Constructor!');

        this.appid    = options.id;
        this.currency = options.currency || Currency.USD;
        this.country  = options.country;
        this.address  = options.address;
        this.timings  = options.timings || false;
        this.timeout  = options.timeout;
        this.raw      = options.raw || false;

        this.settings = {
            address:  this.address,
            country:  this.country,
            currency: this.currency,
            id:       this.appid,
            raw:      this.raw,
            timeout:  this.timeout,
            timings:  this.timings,
        };

        if (typeof this.appid !== 'number') throw new Error('Invalid Application ID!');
    }

    /**
     * Get a item
     *
     * @param  {String}   name       - The name of the skin
     * @param  {Object}   [options]  - Options
     * @param  {Function} [callback] - Callback
     * @return {Promise<Item>}
     *
     */
    public getPrice(name: string, options?: OverwriteMarketOptions, callback?: (error: Error, result: Item) => void): Bluebird<Item> {
        if (typeof options === 'object') {
            const settings = {
                ...this.settings,
                ...options,
            };
            return getPrice(name, settings, callback);
        } else if (typeof options === 'function') {
            return getPrice(name, this.settings, options);
        }
        return getPrice(name, this.settings, callback);
    }

    /**
     * Get a array of items
     *
     * @param  {Array}    names      - Array with the names of the skins
     * @param  {Object}   [options]  - Options
     * @param  {Function} [callback] - Callback
     * @return {Promise<Item>}
     *
     */
    public getPrices(names: string[], options?: OverwriteMarketOptions, callback?: (error: Error, result: ItemArray) => void): Bluebird<ItemArray> {
        if (typeof options === 'object') {
            const settings = {
                ...this.settings,
                ...options,
            };
            return getPrices(names, settings, callback);
        } else if (typeof options === 'function') {
            return getPrices(names, this.settings, options);
        }
        return getPrices(names, this.settings, callback);
    }
}

export {
    Application,
    CleanItem,
    Currency,
    ItemArray,
    ItemError,
    MarketOptions,
    RawItem,
};
