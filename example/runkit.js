const { Market, Currency, Application } = require('@node-steam/market-pricing');

const API = new Market({ id: Application.CSGO, currency: Currency.EUR });

return await API.getPrice('★ Bayonet');
