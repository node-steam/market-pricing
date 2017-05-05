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
    RawItem,
} from './types';

import {
    generateItem,
} from './utils';

import {
    base,
    path,
    version,
} from './base';

/**
 * Retrieve price for a single item.
 *
 * @param {string}   name       - Hashed Item Name
 * @param {object}   options    - Options
 * @param {function} [callback] - Callback
 */
export const getPrice = (
    name: string,
    options: MarketOptions,
    callback?: Function,
): Promise<Item | Error> | Item | Error => {
    const x = new Bluebird((resolve, reject) => {
        const {
            id,
            country,
            raw,
            address,
            timeout,
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
            timeout,
            uri: path,
        }, (error, response, body) => {
            if (response && response.statusCode === 429) {
                return reject(new Error('Steam API Rate Limit Exceeded!'));
            } else if (response && response.statusCode === 500 || response && response.statusCode === 404) {
                return reject(new Error(`Item Not Found! Status: ${response.statusCode}`));
            } else if (!error && response.statusCode === 200) {
                if (raw) return resolve(body);
                return resolve(generateItem(name, body, currency));
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
 * @param {array}    names      - Array Of Hashed Item Names
 * @param {object}   options    - Options
 * @param {function} [callback] - Callback
 */
export const getPrices = (
    names: string[],
    options: MarketOptions,
    callback?: Function,
): Promise<ItemArray | Error> | ItemArray | Error  => {
    const x = new Bluebird((resolve, reject) => {
        const {
            id,
            country,
            raw,
            address,
            timeout,
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
                timeout,
                uri: path,
            }, (error, response, body) => {
                if (response && response.statusCode === 429) {
                    return reject(new Error('Steam API Rate Limit Exceeded!'));
                } else if (response && response.statusCode === 500 || response && response.statusCode === 404) {
                    i.errors.push({ id: name, error: `Item Not Found! Status: ${response.statusCode}` });
                    cb();
                } else if (!error && response.statusCode === 200) {
                    if (raw) {
                        i.results.push(body);
                    } else {
                        i.results.push(generateItem(name, body, currency));
                    }
                    cb();
                } else if (error && error.message === 'ETIMEDOUT') {
                    i.errors.push({ id: name, error: 'Connection Timed Out!' });
                } else if (error && error.message === 'ESOCKETTIMEDOUT') {
                    i.errors.push({ id: name, error: 'Socket Timed Out!' });
                } else if (error && error.message === 'ECONNRESET') {
                    i.errors.push({ id: name, error: 'Connection Was Reset!' });
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
     * Local interface to bind for network connections
     */
    public address?: string;
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
     * @param {object} options - Options
     */
    constructor(options: MarketOptions) {
        if (typeof options !== 'object') throw new Error('Invalid Options Passed To Constructor!');

        this.appid    = options.id;
        this.currency = options.currency || Currency.USD;
        this.country  = options.country;
        this.address  = options.address;
        this.timeout  = options.timeout;
        this.raw      = options.raw || false;

        this.settings = {
            address:  this.address,
            country:  this.country,
            currency: this.currency,
            id:       this.appid,
            raw:      this.raw,
            timeout:  this.timeout,
        };

        if (typeof this.appid !== 'number') throw new Error('Invalid Application ID!');
    }

    /**
     * Get a item
     *
     * @param {string}   name       - The name of the skin
     * @param {object}   [options]  - Options
     * @param {function} [callback] - Callback
     */
    public getPrice(name: string, options?: MarketOptions, callback?: Function) {
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
     * @param {array}    names      - Array with the names of the skins
     * @param {object}   [options]  - Options
     * @param {function} [callback] - Callback
     */
    public getPrices(names: string[], options?: MarketOptions | Function, callback?: Function) {
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
