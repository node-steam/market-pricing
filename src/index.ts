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
import * as data from './base';
import * as util from './utils';

/**
 * Make a request to the Steam API
 * @hidden
 */
const get = (options: HTTPRequestOptions): bluebird<RawItem> => {
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
        }, (error, response, body) => {
            if (response && response.statusCode === 429) {
                return reject(new Error('Steam API Rate Limit Exceeded!'));
            } else if (response && response.statusCode === 500 || response && response.statusCode === 404) {
                return reject(new Error(`Item Not Found! Status: ${response.statusCode}`));
            } else if (!error && response.statusCode === 200) {
                const result = body;
                if (options.timings) {
                    result.timings = {
                        phases: response.timings,
                        start: response.timingStart,
                        timestamps: response.timingPhases,
                    };
                }
                return resolve(result);
            } else if (error) {
                switch (error.message) {
                  case 'ETIMEDOUT':
                    return reject(new Error('Connection Timed Out!'));
                  case 'ESOCKETTIMEDOUT':
                    return reject(new Error('Socket Timed Out!'));
                  case 'ECONNRESET':
                    return reject(new Error('Connection Was Reset!'));
                  default:
                    return reject(error);
                }
            } else if (response) {
                return reject(new Error(`Unknown Error! Status: ${response.statusCode}`));
            }

            return reject(new Error('Unknown Error!'));
        });
    }) as bluebird<RawItem>;
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
    options:   MarketOptions,
    callback?: Callback<any>,
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
            return reject(new Error('Invalid Application ID'));
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
        .catch((error) => {
            return reject(error);
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
    options:   MarketOptions,
    callback?: Callback<any>,
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
            return reject(new Error('Invalid Application ID'));
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
                    i.results.push(body as RawItem);
                } else {
                    const item = util.generateItem(name, body, currency || enums.Currency.USD);

                    if (util.type(item) === 'error') return reject(item);

                    i.results.push(item as CleanItem);
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
    private settings: MarketOptions;

    /**
     * Create the API
     *
     * @param {Object} options - Options
     *
     */
    constructor(options: MarketOptions) {
        if (typeof options !== 'object') throw new Error('Invalid options passed to constructor!');

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
    public getPrice(name: string, options: OverwriteMarketOptionsWithRaw): bluebird<RawItem>;
    public getPrice(name: string, options: OverwriteMarketOptionsWithRaw, callback: Callback<RawItem>): void;

    public getPrice(name: string, callback: Callback<CleanItem>): void;
    public getPrice(name: string, options:  OverwriteMarketOptions, callback: Callback<CleanItem>): void;

    public getPrice(name: string, options?: OverwriteMarketOptions): bluebird<CleanItem>;

    public getPrice(
        name:      string,
        options?:  OverwriteMarketOptions | Callback<CleanItem> | Callback<RawItem>,
        callback?: Callback<CleanItem>    | Callback<RawItem>,
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
    public getPrices(names: string[], options:  OverwriteMarketOptionsWithRaw): bluebird<RawItemArray>;
    public getPrices(names: string[], options:  OverwriteMarketOptionsWithRaw, callback: Callback<RawItemArray>): void;

    public getPrices(names: string[], callback: Callback<ItemArray>): void;
    public getPrices(names: string[], options:  OverwriteMarketOptions, callback: Callback<ItemArray>): void;

    public getPrices(names: string[], options?: OverwriteMarketOptions): bluebird<ItemArray>;

    public getPrices(
        names:     string[],
        options?:  OverwriteMarketOptions | Callback<ItemArray> | Callback<RawItemArray>,
        callback?: Callback<ItemArray>    | Callback<RawItemArray>,
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
