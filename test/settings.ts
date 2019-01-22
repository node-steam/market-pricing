import * as fs from 'fs';

const base    = 'https://steamcommunity.com';
const path    = '/market/priceoverview';
const version = JSON.parse(fs.readFileSync('package.json', 'utf-8')).version;

export {
    base,
    path,
    version,
};
