const pricing = require('@node-steam/market-pricing');

const { Market, Currency, Application } = pricing;

const API = new Market({ id: Application.CSGO, currency: Currency.EUR });

const x = await API.getPrice('★ Bayonet');

return x;
