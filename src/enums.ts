export enum Currency {
    /**
     * [United States dollar](https://en.wikipedia.org/wiki/United_States_dollar)
     */
    USD = 1,
    /**
     * [Pound sterling](https://en.wikipedia.org/wiki/Pound_sterling)
     */
    GBP = 2,
    /**
     * [Euro](https://en.wikipedia.org/wiki/Euro)
     */
    EUR = 3,
    /**
     * [Swiss franc](https://en.wikipedia.org/wiki/Swiss_franc)
     */
    CHF = 4,
    /**
     * [Russian ruble](https://en.wikipedia.org/wiki/Russian_ruble)
     */
    RUB = 5,
    /**
     * [Polish złoty](https://en.wikipedia.org/wiki/Polish_złoty)
     */
    PLN = 6,
    /**
     * [Brazilian real](https://en.wikipedia.org/wiki/Brazilian_real)
     */
    BRL = 7,
    /**
     * [Japanese yen](https://en.wikipedia.org/wiki/Japanese_yen)
     */
    JPY = 8,
    /**
     * [Norwegian krone](https://en.wikipedia.org/wiki/Norwegian_krone)
     */
    NOK = 9,
    /**
     * [Indonesian rupiah](https://en.wikipedia.org/wiki/Indonesian_rupiah)
     */
    IDR = 10,
    /**
     * [Malaysian ringgit](https://en.wikipedia.org/wiki/Malaysian_ringgit)
     */
    MYR = 11,
    /**
     * [Philippine peso](https://en.wikipedia.org/wiki/Philippine_peso)
     */
    PHP = 12,
    /**
     * [Singapore dollar](https://en.wikipedia.org/wiki/Singapore_dollar)
     */
    SGD = 13,
    /**
     * [Thai baht](https://en.wikipedia.org/wiki/Thai_baht)
     */
    THB = 14,
    /**
     * [Vietnamese đồng](https://en.wikipedia.org/wiki/Vietnamese_đồng)
     */
    VND = 15,
    /**
     * [South Korean won](https://en.wikipedia.org/wiki/South_Korean_won)
     */
    KRW = 16,
    /**
     * [Turkish lira](https://en.wikipedia.org/wiki/Turkish_lira)
     */
    TRY = 17,
    /**
     * [Ukrainian hryvnia](https://en.wikipedia.org/wiki/Ukrainian_hryvnia)
     */
    UAH = 18,
    /**
     * [Mexican peso](https://en.wikipedia.org/wiki/Mexican_peso)
     */
    MXN = 19,
    /**
     * [Canadian dollar](https://en.wikipedia.org/wiki/Canadian_dollar)
     */
    CAD = 20,
    /**
     * [Australian dollar](https://en.wikipedia.org/wiki/Australian_dollar)
     */
    AUD = 21,
    /**
     * [New Zealand dollar](https://en.wikipedia.org/wiki/New_Zealand_dollar)
     */
    NZD = 22,
    /**
     * [Chinese yuan](https://en.wikipedia.org/wiki/Renminbi)
     */
    CNY = 23,
    /**
     * [Indian rupee](https://en.wikipedia.org/wiki/Indian_rupee)
     */
    INR = 24,
    /**
     * [Chilean peso](https://en.wikipedia.org/wiki/Chilean_peso)
     */
    CLP = 25,
    /**
     * [Peruvian Sol](https://en.wikipedia.org/wiki/Peruvian_Sol)
     */
    PEN = 26,
    /**
     * [Colombian peso](https://en.wikipedia.org/wiki/Colombian_peso)
     */
    COP = 27,
    /**
     * [South African rand](https://en.wikipedia.org/wiki/South_African_rand)
     */
    ZAR = 28,
    /**
     * [Hong Kong dollar](https://en.wikipedia.org/wiki/Hong_Kong_dollar)
     */
    HKD = 29,
    /**
     * [New Taiwan dollar](https://en.wikipedia.org/wiki/New_Taiwan_dollar)
     */
    TWD = 30,
    /**
     * [Saudi riyal](https://en.wikipedia.org/wiki/Saudi_riyal)
     */
    SAR = 31,
    /**
     * [United Arab Emirates dirham](https://en.wikipedia.org/wiki/United_Arab_Emirates_dirham)
     */
    AED = 32,
    /**
     * [Swedish krona](https://en.wikipedia.org/wiki/Swedish_krona)
     */
    SEK = 33,
}

/**
 * @private
 */
export const CurrencyType = {
    /**
     * [United Arab Emirates dirham](https://en.wikipedia.org/wiki/United_Arab_Emirates_dirham)
     */
    AED: 'dirham',
    /**
     * [Australian dollar](https://en.wikipedia.org/wiki/Australian_dollar)
     */
    AUD: 'australian-dollar',
    /**
     * [Brazilian real](https://en.wikipedia.org/wiki/Brazilian_real)
     */
    BRL: 'real',
    /**
     * [Canadian dollar](https://en.wikipedia.org/wiki/Canadian_dollar)
     */
    CAD: 'canadian-dollar',
    /**
     * [Swiss franc](https://en.wikipedia.org/wiki/Swiss_franc)
     */
    CHF: 'franc',
    /**
     * [Chilean peso](https://en.wikipedia.org/wiki/Chilean_peso)
     */
    CLP: 'chilean-peso',
    /**
     * [Chinese yuan](https://en.wikipedia.org/wiki/Renminbi)
     */
    CNY: 'renminbi',
    /**
     * [Colombian peso](https://en.wikipedia.org/wiki/Colombian_peso)
     */
    COP: 'colombian-peso',
    /**
     * [Euro](https://en.wikipedia.org/wiki/Euro)
     */
    EUR: 'euro',
    /**
     * [Pound sterling](https://en.wikipedia.org/wiki/Pound_sterling)
     */
    GBP: 'pound',
    /**
     * [Hong Kong dollar](https://en.wikipedia.org/wiki/Hong_Kong_dollar)
     */
    HKD: 'hong-kong-dollar',
    /**
     * [Indonesian rupiah](https://en.wikipedia.org/wiki/Indonesian_rupiah)
     */
    IDR: 'rupiah',
    /**
     * [Indian rupee](https://en.wikipedia.org/wiki/Indian_rupee)
     */
    INR: 'rupee',
    /**
     * [Japanese yen](https://en.wikipedia.org/wiki/Japanese_yen)
     */
    JPY: 'yen',
    /**
     * [South Korean won](https://en.wikipedia.org/wiki/South_Korean_won)
     */
    KRW: 'won',
    /**
     * [Mexican peso](https://en.wikipedia.org/wiki/Mexican_peso)
     */
    MXN: 'mexican-peso',
    /**
     * [Malaysian ringgit](https://en.wikipedia.org/wiki/Malaysian_ringgit)
     */
    MYR: 'ringgit',
    /**
     * [Norwegian krone](https://en.wikipedia.org/wiki/Norwegian_krone)
     */
    NOK: 'krone',
    /**
     * [New Zealand dollar](https://en.wikipedia.org/wiki/New_Zealand_dollar)
     */
    NZD: 'new-zealand-dollar',
    /**
     * [Peruvian Sol](https://en.wikipedia.org/wiki/Peruvian_Sol)
     */
    PEN: 'sol',
    /**
     * [Philippine peso](https://en.wikipedia.org/wiki/Philippine_peso)
     */
    PHP: 'philippine-peso',
    /**
     * [Polish złoty](https://en.wikipedia.org/wiki/Polish_złoty)
     */
    PLN: 'zloty',
    /**
     * [Russian ruble](https://en.wikipedia.org/wiki/Russian_ruble)
     */
    RUB: 'ruble',
    /**
     * [Saudi riyal](https://en.wikipedia.org/wiki/Saudi_riyal)
     */
    SAR: 'riyal',
    /**
     * [Swedish krona](https://en.wikipedia.org/wiki/Swedish_krona)
     */
    SEK: 'krona',
    /**
     * [Singapore dollar](https://en.wikipedia.org/wiki/Singapore_dollar)
     */
    SGD: 'singaporean-dollar',
    /**
     * [Thai baht](https://en.wikipedia.org/wiki/Thai_baht)
     */
    THB: 'baht',
    /**
     * [Turkish lira](https://en.wikipedia.org/wiki/Turkish_lira)
     */
    TRY: 'lira',
    /**
     * [New Taiwan dollar](https://en.wikipedia.org/wiki/New_Taiwan_dollar)
     */
    TWD: 'taiwan-dollar',
    /**
     * [Ukrainian hryvnia](https://en.wikipedia.org/wiki/Ukrainian_hryvnia)
     */
    UAH: 'hryvnia',
    /**
     * [United States dollar](https://en.wikipedia.org/wiki/United_States_dollar)
     */
    USD: 'us-dollar',
    /**
     * [Vietnamese đồng](https://en.wikipedia.org/wiki/Vietnamese_đồng)
     */
    VND: 'dong',
    /**
     * [South African rand](https://en.wikipedia.org/wiki/South_African_rand)
     */
    ZAR: 'rand',
};

/**
 * @private
 */
export const CurrencySign = {
    /**
     * [United Arab Emirates dirham](https://en.wikipedia.org/wiki/United_Arab_Emirates_dirham)
     */
    AED: 'د.إ',
    /**
     * [Australian dollar](https://en.wikipedia.org/wiki/Australian_dollar)
     */
    AUD: '$',
    /**
     * [Brazilian real](https://en.wikipedia.org/wiki/Brazilian_real)
     */
    BRL: 'R$',
    /**
     * [Canadian dollar](https://en.wikipedia.org/wiki/Canadian_dollar)
     */
    CAD: '$',
    /**
     * [Swiss franc](https://en.wikipedia.org/wiki/Swiss_franc)
     */
    CHF: 'SFr.',
    /**
     * [Chilean peso](https://en.wikipedia.org/wiki/Chilean_peso)
     */
    CLP: '$',
    /**
     * [Chinese yuan](https://en.wikipedia.org/wiki/Renminbi)
     */
    CNY: '¥',
    /**
     * [Colombian peso](https://en.wikipedia.org/wiki/Colombian_peso)
     */
    COP: '$',
    /**
     * [Euro](https://en.wikipedia.org/wiki/Euro)
     */
    EUR: '€',
    /**
     * [Pound sterling](https://en.wikipedia.org/wiki/Pound_sterling)
     */
    GBP: '£',
    /**
     * [Hong Kong dollar](https://en.wikipedia.org/wiki/Hong_Kong_dollar)
     */
    HKD: '$',
    /**
     * [Indonesian rupiah](https://en.wikipedia.org/wiki/Indonesian_rupiah)
     */
    IDR: 'Rp',
    /**
     * [Indian rupee](https://en.wikipedia.org/wiki/Indian_rupee)
     */
    INR: '₹',
    /**
     * [Japanese yen](https://en.wikipedia.org/wiki/Japanese_yen)
     */
    JPY: '¥',
    /**
     * [South Korean won](https://en.wikipedia.org/wiki/South_Korean_won)
     */
    KRW: '₩',
    /**
     * [Mexican peso](https://en.wikipedia.org/wiki/Mexican_peso)
     */
    MXN: '$',
    /**
     * [Malaysian ringgit](https://en.wikipedia.org/wiki/Malaysian_ringgit)
     */
    MYR: 'RM',
    /**
     * [Norwegian krone](https://en.wikipedia.org/wiki/Norwegian_krone)
     */
    NOK: 'kr',
    /**
     * [New Zealand dollar](https://en.wikipedia.org/wiki/New_Zealand_dollar)
     */
    NZD: '$',
    /**
     * [Peruvian Sol](https://en.wikipedia.org/wiki/Peruvian_Sol)
     */
    PEN: 'S/',
    /**
     * [Philippine peso](https://en.wikipedia.org/wiki/Philippine_peso)
     */
    PHP: '₱',
    /**
     * [Polish złoty](https://en.wikipedia.org/wiki/Polish_złoty)
     */
    PLN: 'zł',
    /**
     * [Russian ruble](https://en.wikipedia.org/wiki/Russian_ruble)
     */
    RUB: '₽',
    /**
     * [Saudi riyal](https://en.wikipedia.org/wiki/Saudi_riyal)
     */
    SAR: 'ر.س',
    /**
     * [Swedish krona](https://en.wikipedia.org/wiki/Swedish_krona)
     */
    SEK: 'kr',
    /**
     * [Singapore dollar](https://en.wikipedia.org/wiki/Singapore_dollar)
     */
    SGD: '$',
    /**
     * [Thai baht](https://en.wikipedia.org/wiki/Thai_baht)
     */
    THB: '฿',
    /**
     * [Turkish lira](https://en.wikipedia.org/wiki/Turkish_lira)
     */
    TRY: '₺',
    /**
     * [New Taiwan dollar](https://en.wikipedia.org/wiki/New_Taiwan_dollar)
     */
    TWD: 'NT$',
    /**
     * [Ukrainian hryvnia](https://en.wikipedia.org/wiki/Ukrainian_hryvnia)
     */
    UAH: '₴',
    /**
     * [United States dollar](https://en.wikipedia.org/wiki/United_States_dollar)
     */
    USD: '$',
    /**
     * [Vietnamese đồng](https://en.wikipedia.org/wiki/Vietnamese_đồng)
     */
    VND: '₫',
    /**
     * [South African rand](https://en.wikipedia.org/wiki/South_African_rand)
     */
    ZAR: 'R',
};

export enum Application {
    /**
     * [Counter-Strike: Global Offensive](https://steamdb.info/app/730/)
     */
    CSGO = 730,
    /**
     * [Dota 2](https://steamdb.info/app/570/)
     */
    DOTA2 = 570,
    /**
     * [H1Z1: Just Survive](https://steamdb.info/app/295110/)
     */
    H1Z1_JUSTSURVIVE = 295110,
    /**
     * [H1Z1: King of the Kill](https://steamdb.info/app/433850/)
     */
    H1Z1_KINGOFTHEKILL = 433850,
    /**
     * [Killing Floor 2](https://steamdb.info/app/232090/)
     */
    KILLING_FLOOR2 = 232090,
    /**
     * [PAYDAY 2](https://steamdb.info/app/218620/)
     */
    PAYDAY2 = 218620,
    /**
     * [PLAYERUNKNOWN'S BATTLEGROUNDS](https://steamdb.info/app/578080/)
     */
    PLAYERUNKNOWNS_BATTLEGROUNDS = 578080,
    /**
     * [Rust](https://steamdb.info/app/252490/)
     */
    RUST = 252490,
    /**
     * [Team Fortress 2](https://steamdb.info/app/440/)
     */
    TF2 = 440,
    /**
     * [Unturned](https://steamdb.info/app/304930/)
     */
    UNTURNED = 304930,
}
