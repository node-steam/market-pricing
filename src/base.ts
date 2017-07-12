import * as fs  from 'fs';
import * as dir from 'path';

/**
 * Module version
 * @hidden
 */
export const version: string = JSON.parse(fs.readFileSync(dir.join(__dirname, '../package.json'), 'utf-8')).version;

/**
 * Base URL
 * @hidden
 */
export const base = 'https://steamcommunity.com';

/**
 * Base path
 * @hidden
 */
export const path = '/market/priceoverview';

/**
 * User agent
 */
export const useragent = `N|Steam Market-Pricing v${version} (https://github.com/node-steam/market-pricing)`;
