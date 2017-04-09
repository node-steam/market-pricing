[![Chat](https://img.shields.io/gitter/room/node-steam/market-pricing.svg?style=flat-square)](https://gitter.im/node-steam/market-pricing)
[![Travis CI](https://img.shields.io/travis/node-steam/market-pricing.svg?style=flat-square)](https://travis-ci.org/node-steam/market-pricing)
[![Dependencies](https://img.shields.io/david/node-steam/market-pricing.svg?style=flat-square)](https://david-dm.org/node-steam/market-pricing)
[![Version](https://img.shields.io/npm/v/@node-steam/market-pricing.svg?style=flat-square)](https://www.npmjs.com/package/@node-steam/market-pricing)
[![Downloads](https://img.shields.io/npm/dt/@node-steam/market-pricing.svg?style=flat-square)](https://www.npmjs.com/package/@node-steam/market-pricing)
[![License](https://img.shields.io/npm/l/@node-steam/market-pricing.svg?style=flat-square)](https://www.npmjs.com/package/@node-steam/market-pricing)
[![Runkit](https://img.shields.io/badge/try%20on%20runkit-market--pricing-blue.svg?style=flat-square)](https://runkit.com/npm/@node-steam/market-pricing)

[![npm statistics](https://nodei.co/npm/@node-steam/market-pricing.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/@node-steam/market-pricing)

**Market-Pricing** is a wrapper for the unofficial **Steam Market Pricing API** using Typescript and Promises.

## Installation

You can install **Market-Pricing** through the command line by using the following command:

```
yarn add @node-steam/market-pricing
```

## Usage:

```javascript
import {
    Market,
    Currency,
    Application,
    getPrice,
    getPrices,
} from '@node-steam/market-pricing';

const API = new Market({ id: Application.CSGO, currency: Currency.EUR });
```

## Documentation:

#### `new Market(Options)`
> API class

#### `Options.id: number`
> Application ID of the game you want to query skin/s for
>
> We provide a **[enum](src/enums.ts#L109-L120)** for the most common used games.

#### `Options.currency: number`
> Optional currency integer
>
> We provide a **[enum](src/enums.ts#L1-L35)**  for all available currencies

#### `Options.country: string`
> Optional **[ISO-3166](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)** country code

#### `Options.raw: boolean`
> Will return all objects in their raw form when set to true

#### `API.getPrice(skin: string)`
> Get price for a skin

```javascript
const x = await API.getPrice('★ Bayonet');

// or

const x = await getPrice('★ Bayonet', { id: Application.CSGO, currency: Currency.EUR })

> {
    id: '★ Bayonet',
    price: {
        type: 'euro',
        code: 'EUR',
        sign: '€',
        lowest: 135.44,
        median: 136.61,
    },
    volume: 8,
};
```

#### `API.getPrices(skins: Array<string>)`
> Get prices for a array of skins

```javascript
const x = await API.getPrices([ '★ Falchion Knife', '★ Karambit' ]);

// or

const x = await getPrices([ '★ Falchion Knife', '★ Karambit' ], { id: Application.CSGO, currency: Currency.EUR })

> [
    {
        id: '★ Falchion Knife',
        price: {
            type: 'euro',
            code: 'EUR',
            sign: '€',
            lowest: 59.86,
            median: 57.50,
        },
        volume: 27,
    },
    {
        id: '★ Karambit',
        price: {
            type: 'euro',
            code: 'EUR',
            sign: '€',
            lowest: 215,
            median: 214.74,
        },
        volume: 6,
    }
];
```

## Differences from the raw response of the original API:

### Object Layout:

> **Info:**
>
> You can request the raw item by setting `{ raw: true }` in the options. This is not recommended though.

**Raw:**
```javascript
{
    success: true,
    lowest_price: "215,--€",
    volume: "6",
    median_price: "214,74€"
}
```

**This Module:**
```javascript
{
    id: '★ Karambit',
    price: {
        type: 'euro',
        code: 'EUR',
        sign: '€',
        lowest: 215,
        median: 214.74,
    },
    volume: 6,
}
```

### Prices:

The prices aren't available as a string, but rather split up in object properties with more precise information:

**Example:**

Price you would get from the API:

```javascript
{
    lowest_price: "57,86€",
    median_price: "59,63€"
}
```

Price you get from this module:

```javascript
{
    type: 'euro',
    code: 'EUR',
    sign: '€',
    lowest: 59.86,
    median: 57.74,
}
```

### Volume:

The volume (of available skins) is a integer instead of a string

## Async / Promises:

The examples are shown using `await` for simplicity  - if you don't want to make your function `async` you can always use `.catch().then()` or a `callback` instead.

### Example:

**Async:**
```javascript
const item = await API.getPrice('★ Bayonet');

// do something with the <item>
```

**Promise:**
```javascript
API.getPrice('★ Bayonet')
.catch((e) => {
    console.error(e);
})
.then((item) => {
    // do something with the <item>
});
```

**Callback:**
```javascript
API.getPrice('★ Bayonet', (error, item) => {
    if (error) {
        return console.log(error);
    }

    // do something with the <item>
});
```

## Contributors

- Silas Rech aka. **[lenovouser](mailto:silas.rech@protonmail.com)**

## Contributing:

Interested in contributing to **Market-Pricing**? Contributions are welcome, and are accepted via pull requests. Please [review these guidelines](contributing.md) before submitting any pull requests.

### Help:

**Installing dependencies:**

```
yarn
```

**Compile:**

```
yarn compile
```

**Test:**

```
yarn test
```

**Generate Docs:**

```
yarn docs
```

## Tests:

This module is thoroughly tested with **[ava](https://github.com/avajs/ava)**

> **Note:** All responses from the steam API are currently mocked because of rate limiting. Might change in the future, not sure how to proceed about this though.

## License:
Code licensed under [MIT](license.md), documentation under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
