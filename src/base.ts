import * as fs from 'fs';

/**
 * Module version
 * @hidden
 */
export const version: string = JSON.parse(fs.readFileSync('package.json', 'utf-8')).version;

/**
 * Base URL
 * @hidden
 */
export const base = 'https://steamcommunity.com';

/**
 * Base Path
 * @hidden
 */
export const path = '/market/priceoverview';
