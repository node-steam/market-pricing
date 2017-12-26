/// <reference path="types.ts" />

/**
 * npm dependencies
 */
import * as enums    from '@node-steam/data';
import * as async    from 'async';
import * as bluebird from 'bluebird';
import * as request  from 'request';

/**
 * project dependencies
 */
import * as data  from './base';
import * as error from './error';
import * as util  from './utils';

import {
    codes as code,
    Exception,
} from './error';

/**
 * Make a request to the Steam API
 * @hidden
 */
const get = (options: NodeSteamHTTPRequestOptions): bluebird<NodeSteamRawItem> => {
    return new bluebird((resolve, reject) => {
        request({
            baseUrl: options.base || data.base,
            gzip: options.gzip || true,
            headers: {
                'User-Agent': options.useragent || data.useragent,
            },
            json: true,
            localAddress: options.address,
            qs: {
                appid: options.id,
                country: options.country,
                currency: options.currency,
                market_hash_name: options.name,
            },
            removeRefererHeader: true,
            strictSSL: options.strictSSL || true,
            time: options.timings,
            timeout: options.timeout,
            uri: options.path || data.path,
        }, (exception, response, body) => {
            if (response && response.statusCode === 429) {
                return reject(new Exception(code.RATELIMIT_EXCEEDED));
            } else if (response && response.statusCode === 500 || response && response.statusCode === 404) {
                return reject(new Exception(code.ITEM_NOT_FOUND, response.statusCode));
            } else if (!exception && response.statusCode === 200) {
                const result = body;
                if (options.timings) {
                    result.timings = {
                        phases: response.timings,
                        start: response.timingStart,
                        timestamps: response.timingPhases,
                    };
                }
                return resolve(result);
            } else if (exception) {
                switch (exception.message) {
                  case 'ETIMEDOUT':
                    return reject(new Exception(code.CONNECTION_RESET));
                  case 'ESOCKETTIMEDOUT':
                    return reject(new Exception(code.SOCKET_TIMED_OUT));
                  case 'ECONNRESET':
                    return reject(new Exception(code.CONNECTION_RESET));
                  default:
                    return reject(exception);
                }
            } else if (response) {
                return reject(new Exception(code.UNKNOWN_RESPONSE, response.statusCode));
            }

            return reject(new Exception(code.UNKNOWN));
        });
    }) as bluebird<NodeSteamRawItem>;
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
function getPrice(
    name:      string,
    options:   NodeSteamMarketOptions,
    callback?: NodeSteamCallback<any>,
) {
    const x = new bluebird((resolve, reject) => {
        const {
            address,
            base,
            country,
            gzip,
            id,
            path,
            raw,
            strictSSL,
            timeout,
            timings,
            useragent,
        } = options;

        let {
            currency,
        } = options;

        if (!id || typeof id !== 'number') {
            return reject(new Exception(code.INVALID_APPLICATION_ID));
        }

        if (typeof currency !== 'number') {
            currency = enums.Currency.USD;
        }

        get({
            address,
            base,
            country,
            currency,
            gzip,
            id,
            name,
            path,
            strictSSL,
            timeout,
            timings,
            useragent,
        })
        .then((body) => {
            if (raw) {
                const item = body;
                return resolve(item);
            } else {
                const item = util.generateItem(name, body, currency || enums.Currency.USD);
                return resolve(item);
            }
        })
        .catch((exception) => {
            return reject(exception);
        });
    });

    if (callback) return x.asCallback(callback);

    return x;
}

/**
 * Retrieve price for a array of items.
 *
 * @param  {Array}    names      - Array Of Hashed Item Names
 * @param  {Object}   options    - Options
 * @param  {Function} [callback] - Callback
 * @return {Promise<ItemArray>}
 *
 */
function getPrices(
    names:     string[],
    options:   NodeSteamMarketOptions,
    callback?: NodeSteamCallback<any>,
) {
    const x = new bluebird((resolve, reject) => {
        const {
            address,
            base,
            country,
            gzip,
            id,
            path,
            raw,
            strictSSL,
            timeout,
            timings,
            useragent,
        } = options;

        let {
            currency,
        } = options;

        if (!id || typeof id !== 'number') {
            return reject(new Exception(code.INVALID_APPLICATION_ID));
        }

        if (typeof currency !== 'number') {
            currency = enums.Currency.USD;
        }

        const i: any = {
            errors: [],
            results: [],
        };

        async.each(names, (name, cb) => {
            get({
                address,
                base,
                country,
                currency: currency || enums.Currency.USD,
                gzip,
                id,
                name,
                path,
                strictSSL,
                timeout,
                timings,
                useragent,
            })
            .then((body) => {
                if (raw) {
                    i.results.push(body as NodeSteamRawItem);
                } else {
                    const item = util.generateItem(name, body, currency || enums.Currency.USD);

                    if (util.type(item) === 'error') return reject(item);

                    i.results.push(item as NodeSteamCleanItem);
                }
                cb();
            })
            .catch((exception: Exception) => {
                if (exception.code === code.RATELIMIT_EXCEEDED) {
                    return reject(exception);
                }

                i.errors.push({ id: name, error: exception.message });
                cb();
            });
        }, () => {
            if (!i.results.length && i.errors.length) {
                return reject(i.errors);
            } else if (!i.results.length && !i.errors.length) {
                return reject(new Exception(code.UNKNOWN));
            }
            return resolve(i);
        });
    });

    if (callback) return x.asCallback(callback);

    return x;
}

/**
 * Market Class.
 */
export class Market {
    /**
     * Local interface to bind for network connections
     */
    public address?: string;
    /**
     * Application ID of the game you want to query skin/s for
     */
    public appid: number;
    /**
     * Base domain for the HTTP request
     */
    public base?: string;
    /**
     * Optional [ISO-3166](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code
     */
    public country?: string;
    /**
     * Optional currency integer
     */
    public currency?: number;
    /**
     * Use GZIP compression for the HTTP request
     */
    public gzip?: boolean;
    /**
     * Base path for the HTTP request
     */
    public path?: string;
    /**
     * Request the raw object
     */
    public raw?: boolean;
    /**
     * Force strict SSL for the HTTP request
     */
    public strictSSL?: boolean;
    /**
     * Number of milliseconds to wait for a server to send response headers
     */
    public timeout?: number;
    /**
     * Whether to return request timings
     */
    public timings?: boolean;
    /**
     * Custom user agent for the HTTP request
     */
    public useragent?: string;

    /**
     * All the settings in one object
     * @hidden
     */
    private settings: NodeSteamMarketOptions;

    /**
     * Create the API
     *
     * @param {Object} options - Options
     *
     */
    constructor(options: NodeSteamMarketOptions) {
        if (typeof options !== 'object') throw new Exception(code.INVALID_OPTIONS);

        this.address   = options.address;
        this.appid     = options.id;
        this.base      = options.base      || data.base;
        this.country   = options.country;
        this.currency  = options.currency  || enums.Currency.USD;
        this.gzip      = options.gzip      || true;
        this.path      = options.path      || data.path;
        this.raw       = options.raw       || false;
        this.strictSSL = options.strictSSL || true;
        this.timeout   = options.timeout;
        this.timings   = options.timings   || false;
        this.useragent = options.useragent || data.useragent;

        this.settings = {
            address:   this.address,
            base:      this.base,
            country:   this.country,
            currency:  this.currency,
            gzip:      this.gzip,
            id:        this.appid,
            path:      this.path,
            raw:       this.raw,
            strictSSL: this.strictSSL,
            timeout:   this.timeout,
            timings:   this.timings,
            useragent: this.useragent,
        };

        if (typeof this.appid !== 'number') throw new Exception(code.INVALID_APPLICATION_ID);
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
    public getPrice(name: string, options: NodeSteamOverwriteMarketOptionsWithRaw): bluebird<NodeSteamRawItem>;
    public getPrice(name: string, options: NodeSteamOverwriteMarketOptionsWithRaw, callback: NodeSteamCallback<NodeSteamRawItem>): void;

    public getPrice(name: string, callback: NodeSteamCallback<NodeSteamCleanItem>): void;
    public getPrice(name: string, options:  NodeSteamOverwriteMarketOptions, callback: NodeSteamCallback<NodeSteamCleanItem>): void;

    public getPrice(name: string, options?: NodeSteamOverwriteMarketOptions): bluebird<NodeSteamCleanItem>;

    public getPrice(
        name:      string,
        options?:  NodeSteamOverwriteMarketOptions | NodeSteamCallback<NodeSteamCleanItem> | NodeSteamCallback<NodeSteamRawItem>,
        callback?: NodeSteamCallback<NodeSteamCleanItem>    | NodeSteamCallback<NodeSteamRawItem>,
    ) {
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
    public getPrices(names: string[], options:  NodeSteamOverwriteMarketOptionsWithRaw): bluebird<NodeSteamRawItemArray>;
    public getPrices(names: string[], options:  NodeSteamOverwriteMarketOptionsWithRaw, callback: NodeSteamCallback<NodeSteamRawItemArray>): void;

    public getPrices(names: string[], callback: NodeSteamCallback<NodeSteamItemArray>): void;
    public getPrices(names: string[], options:  NodeSteamOverwriteMarketOptions, callback: NodeSteamCallback<NodeSteamItemArray>): void;

    public getPrices(names: string[], options?: NodeSteamOverwriteMarketOptions): bluebird<NodeSteamItemArray>;

    public getPrices(
        names:     string[],
        options?:  NodeSteamOverwriteMarketOptions | NodeSteamCallback<NodeSteamItemArray> | NodeSteamCallback<NodeSteamRawItemArray>,
        callback?: NodeSteamCallback<NodeSteamItemArray> | NodeSteamCallback<NodeSteamRawItemArray>,
    ) {
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

export { error };
