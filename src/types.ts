/**
 * Constructor options
 */
declare interface NodeSteamStandardMarketOptions {
    /**
     * [ISO-3166](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code
     */
    country?: string;
    /**
     * Currency integer
     */
    currency?: number;
    /**
     * Local interface to bind for network connections
     */
    address?: string;
    /**
     * Number of milliseconds to wait for a server to send response headers
     */
    timeout?: number;
    /**
     * Whether to return request timings
     */
    timings?: boolean;
    /**
     * Request the raw object
     */
    raw?: boolean;
    /**
     * Custom user agent for the HTTP request
     */
    useragent?: string;
    /**
     * Base domain for the HTTP request
     */
    base?: string;
    /**
     * Use GZIP compression for the HTTP request
     */
    gzip?: boolean;
    /**
     * Force strict SSL for the HTTP request
     */
    strictSSL?: boolean;
    /**
     * Base path for the HTTP request
     */
    path?: string;
}

declare interface NodeSteamMarketOptions extends NodeSteamStandardMarketOptions {
    /**
     * Application ID of the game to query skin/s for
     */
    id: number;
}

declare interface NodeSteamOverwriteMarketOptions extends NodeSteamStandardMarketOptions {
    /**
     * Application ID of the game to query skin/s for
     */
    id?: number;
}

declare interface NodeSteamMarketOptionsWithRaw extends NodeSteamMarketOptions {
    /**
     * Request the raw object
     */
    raw: true;
}

declare interface NodeSteamOverwriteMarketOptionsWithRaw extends NodeSteamOverwriteMarketOptions {
    /**
     * Request the raw object
     */
    raw: true;
}

/**
 * Options for the raw HTTP request
 * @hidden
 */
declare interface NodeSteamHTTPRequestOptions {
    address?:   string;
    base?:      string;
    country?:   string;
    currency:   number;
    gzip?:      boolean;
    id:         number;
    name:       string;
    path?:      string;
    strictSSL?: boolean;
    timeout?:   number;
    timings?:   boolean;
    useragent?: string;
}

/**
 * Price object
 */
declare interface NodeSteamPrice {
    /**
     * Type of currency
     * @see {@link https://node-steam.github.io/data/enums/currencytype.html CurrencyType}
     */
    type: string;
    /**
     * [ISO-4217 Currency code](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)
     * @see {@link https://node-steam.github.io/data/enums/currency.html Currency}
     */
    code: string;
    /**
     * [Currency symbol](https://en.wikipedia.org/wiki/Currency_symbol#List_of_presently-circulating_currency_symbols)
     * @see {@link https://node-steam.github.io/data/enums/currencysign.html CurrencySign}
     */
    sign: string;
    /**
     * Lowest price on the [Steam Community Market](https://steamcommunity.com/market/)
     */
    lowest?: number;
    /**
     * Median price on the [Steam Community Market](https://steamcommunity.com/market/)
     */
    median?: number;
}

/**
 * Request timings object
 */
declare interface NodeSteamTiming {
    start: number;
    timestamps: {
        socket: number;
        lookup: number;
        connect: number;
        response: number;
        end: number;
    };
    phases: {
        wait: number;
        dns: number;
        tcp: number;
        firstByte: number;
        download: number;
        total: number;
    };
}

/**
 * Clean item object
 */
declare interface NodeSteamCleanItem {
    /**
     * Market hash name of the skin
     */
    id: string;
    /**
     * Price object
     */
    price: NodeSteamPrice;
    /**
     * Number of available skins on the steam market
     */
    volume?: number;
    /**
     * Optional request timings
     */
    timings?: NodeSteamTiming;
}

/**
 * Raw item object
 */
declare interface NodeSteamRawItem {
    /**
     * Lowest price on the [Steam Community Market](https://steamcommunity.com/market/)
     */
    lowest_price: string;
    /**
     * Median price on the [Steam Community Market](https://steamcommunity.com/market/)
     */
    median_price?: string;
    /**
     * Wether the request was successful or not
     */
    success: boolean;
    /**
     * Number of available skins on the steam market
     */
    volume?: string;
    /**
     * Optional request timings
     */
    timings?: NodeSteamTiming;
}

/**
 * Thrown error when item was queried
 */
declare interface NodeSteamItemError {
    /**
     * Market hash name of the skin
     */
    id: string;
    /**
     * Error message
     */
    error: string;
    /**
     * Error code
     */
    code: string;
}

/**
 * Object with arrays of item objects and/or errors
 */
declare interface NodeSteamItemArray {
    /**
     * Array of thrown errors
     */
    errors: NodeSteamItemError[];
    /**
     * Array of item objects
     */
    results: NodeSteamCleanItem[];
}

/**
 * Object with arrays of raw item objects and/or errors
 */
declare interface NodeSteamRawItemArray {
    /**
     * Array of thrown errors
     */
    errors: NodeSteamItemError[];
    /**
     * Array of item objects
     */
    results: NodeSteamRawItem[];
}

declare type NodeSteamCallback<T> = (error: Error, result: T) => void;
