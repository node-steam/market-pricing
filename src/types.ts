/**
 * Constructor Options
 */
export interface RawMarketOptions {
    /**
     * [ISO-3166](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) Country Code
     */
    country?: string;
    /**
     * Currency Integer
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
}

export interface MarketOptions extends RawMarketOptions {
    /**
     * Application ID Of The Game You Want To Query Skin/s For
     */
    id: number;
}

export interface OverwriteMarketOptions extends RawMarketOptions {
    /**
     * Application ID Of The Game You Want To Query Skin/s For
     */
    id?: number;
}

/**
 * Options for the raw HTTP request
 * @hidden
 */
export interface HTTPRequestOptions {
    name:     string;
    id:       number;
    currency: number;
    country?: string;
    address?: string;
    timeout?: number;
    timings?: boolean;
}

/**
 * Price Object
 */
export interface Price {
    /**
     * Type Of Currency
     * @see {@link CurrencyType}
     */
    type: string;
    /**
     * [ISO-4217 Currency Code](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)
     * @see {@link Currency}
     */
    code: string;
    /**
     * [Currency Symbol](https://en.wikipedia.org/wiki/Currency_symbol#List_of_presently-circulating_currency_symbols)
     * @see {@link CurrencySign}
     */
    sign: string;
    /**
     * Lowest Price On The [Steam Community Market](https://steamcommunity.com/market/)
     */
    lowest: number;
    /**
     * Median Price On The [Steam Community Market](https://steamcommunity.com/market/)
     */
    median?: number;
}

/**
 * Request Timings Object
 */
export interface Timing {
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
 * Clean Item Object
 */
export interface CleanItem {
    /**
     * Market Hash Name Of The Skin
     */
    id: string;
    /**
     * Price Object
     */
    price: Price;
    /**
     * Number Of Available Skins On The Steam Market
     */
    volume?: number;
    /**
     * Optional request timings
     */
    timings?: Timing;
}

/**
 * Raw Item Object
 */
export interface RawItem {
    /**
     * Lowest Price On The [Steam Community Market](https://steamcommunity.com/market/)
     */
    lowest_price: string;
    /**
     * Median Price On The [Steam Community Market](https://steamcommunity.com/market/)
     */
    median_price?: string;
    /**
     * Wether the request was successful or not
     */
    success: boolean;
    /**
     * Number Of Available Skins On The Steam Market
     */
    volume?: string;
    /**
     * Optional request timings
     */
    timings?: Timing;
}

/**
 * Item Object
 */
export type Item = CleanItem | RawItem;

/**
 * Thrown Error When Item Was Queried
 */
export interface ItemError {
    /**
     * Market Hash Name Of The Skin
     */
    id: string;
    /**
     * Error Object
     */
    error: string;
}

/**
 * Object With Arrays Of Item Objects And/Or Errors
 */
export interface ItemArray {
    /**
     * Array Of Thrown Errors
     */
    errors: ItemError[];
    /**
     * Array Of Item Objects
     */
    results: Item[];
}
