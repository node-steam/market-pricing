import * as fs  from 'fs';
import * as dir from 'path';

/**
 * Package
 * @hidden
 */
const pkg = JSON.parse(fs.readFileSync(dir.join(__dirname, '../package.json'), 'utf-8'));

/**
 * Module version
 * @hidden
 */
export const version: string = pkg.version;

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
 * @hidden
 */
export const useragent = `N|Steam Market-Pricing v${version} (https://github.com/node-steam/market-pricing)`;
