const { Currency, Application } = require('@node-steam/data');
const { Market } = require('@node-steam/market-pricing');

const API = new Market({ id: Application.CSGO, currency: Currency.EUR });

return await API.getPrice('★ Bayonet');
