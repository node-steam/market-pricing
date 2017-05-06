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
export const CurrencyType: { [key: string]: string } = {
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
export const CurrencySign: { [key: string]: string } = {
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
     * [Alien Hostage](https://steamdb.info/app/562430/)
     */
    ALIEN_HOSTAGE = 562430,
    /**
     * [Altitude0: Lower & Faster](https://steamdb.info/app/308080/)
     */
    ALTITUDE0 = 308080,
    /**
     * [- Arcane Raise -](https://steamdb.info/app/603750/)
     */
    ARCANE_RAISE = 603750,
    /**
     * [Armello](https://steamdb.info/app/290340/)
     */
    ARMELLO = 290340,
    /**
     * [.atorb.](https://steamdb.info/app/467530/)
     */
    ATORB = 467530,
    /**
     * [Ballistic Overkill](https://steamdb.info/app/296300/)
     */
    BALLISTIC_OVERKILL = 296300,
    /**
     * [BattleBlock Theater](https://steamdb.info/app/238460/)
     */
    BATTLEBLOCK_THEATER = 238460,
    /**
     * [BATTLECREW Space Pirates](https://steamdb.info/app/411480/)
     */
    BATTLECREW_SPACE_PIRATES = 411480,
    /**
     * [Bloody Walls](https://steamdb.info/app/531960/)
     */
    BLOODY_WALLS = 531960,
    /**
     * [Business Tour](https://steamdb.info/app/397900/)
     */
    BUSINESS_TOUR = 397900,
    /**
     * [Call to Arms](https://steamdb.info/app/302670/)
     */
    CALL_TO_ARMS = 302670,
    /**
     * [Children of Orc](https://steamdb.info/app/544840/)
     */
    CHILDREN_OF_ORC = 544840,
    /**
     * [Counter-Strike: Global Offensive](https://steamdb.info/app/730/)
     */
    CSGO = 730,
    /**
     * [Depth](https://steamdb.info/app/274940/)
     */
    DEPTH = 274940,
    /**
     * [Destinations](https://steamdb.info/app/453170/)
     */
    DESTINATIONS = 453170,
    /**
     * [Don't Starve Together](https://steamdb.info/app/322330/)
     */
    DONT_STARVE_TOGETHER = 322330,
    /**
     * [Dota 2](https://steamdb.info/app/570/)
     */
    DOTA2 = 570,
    /**
     * [El Ninja (Beta)](https://steamdb.info/app/509840/)
     */
    EL_NINJA_BETA = 509840,
    /**
     * [Ember Strike](https://steamdb.info/app/374670/)
     */
    EMBER_STRIKE = 374670,
    /**
     * [Forgotten Lore](https://steamdb.info/app/391240/)
     */
    FORGOTTEN_LORE = 391240,
    /**
     * [FreeCell Quest](https://steamdb.info/app/364640/)
     */
    FREECELL_QUEST = 364640,
    /**
     * [Fruit Ninja VR](https://steamdb.info/app/486780/)
     */
    FRUIT_NINJA_VR = 486780,
    /**
     * [Gremlins, Inc.](https://steamdb.info/app/369990/)
     */
    GREMLINS_INC = 369990,
    /**
     * [H1Z1: Just Survive](https://steamdb.info/app/295110/)
     */
    H1Z1_JUSTSURVIVE = 295110,
    /**
     * [H1Z1: King of the Kill](https://steamdb.info/app/433850/)
     */
    H1Z1_KINGOFTHEKILL = 433850,
    /**
     * [Heliborne](https://steamdb.info/app/433530/)
     */
    HELIBORNE = 433530,
    /**
     * [Immune](https://steamdb.info/app/348670/)
     */
    IMMUNE = 348670,
    /**
     * [INTERSHELTER](https://steamdb.info/app/520530/)
     */
    INTERSHELTER = 520530,
    /**
     * [Intralism](https://steamdb.info/app/513510/)
     */
    INTRALISM = 513510,
    /**
     * [Killing Floor 2](https://steamdb.info/app/232090/)
     */
    KILLING_FLOOR2 = 232090,
    /**
     * [MegaRats](https://steamdb.info/app/534210/)
     */
    MEGARATS = 534210,
    /**
     * [MineSweeper VR](https://steamdb.info/app/516940/)
     */
    MINESWEEPER_VR = 516940,
    /**
     * [Move or Die](https://steamdb.info/app/323850/)
     */
    MOVE_OR_DIE = 323850,
    /**
     * [Natural Selection 2](https://steamdb.info/app/4920/)
     */
    NATURAL_SELECTION2 = 4920,
    /**
     * [Path of Exile](https://steamdb.info/app/238960/)
     */
    PATH_OF_EXILE = 238960,
    /**
     * [PAYDAY 2](https://steamdb.info/app/218620/)
     */
    PAYDAY2 = 218620,
    /**
     * [PLAYERUNKNOWN'S BATTLEGROUNDS](https://steamdb.info/app/578080/)
     */
    PLAYERUNKNOWNS_BATTLEGROUNDS = 578080,
    /**
     * [Primal Carnage: Extinction](https://steamdb.info/app/321360/)
     */
    PRIMAL_CARNAGE_EXTINCTION = 321360,
    /**
     * [Project Lounge](https://steamdb.info/app/508710/)
     */
    PROJECT_LOUNGE = 508710,
    /**
     * [Ratz Instagib 2.0](https://steamdb.info/app/338170/)
     */
    RATZ_INSTAGIB2 = 338170,
    /**
     * [Redout: Enhanced Edition](https://steamdb.info/app/517710/)
     */
    REDOUT_ENHANCED_EDITION = 517710,
    /**
     * [Reflex Arena](https://steamdb.info/app/328070/)
     */
    REFLEX_ARENA = 328070,
    /**
     * [Robot Roller-Derby Disco Dodgeball](https://steamdb.info/app/270450/)
     */
    ROBOT_ROLLER_DERBY_DISCO_DODGEBALL = 270450,
    /**
     * [Rust](https://steamdb.info/app/252490/)
     */
    RUST = 252490,
    /**
     * [Savage Resurrection](https://steamdb.info/app/366440/)
     */
    SAVAGE_RESURRECTION = 366440,
    /**
     * [Screeps](https://steamdb.info/app/464350/)
     */
    SCREEPS = 464350,
    /**
     * [Slymes](https://steamdb.info/app/530300/)
     */
    SLYMES = 530300,
    /**
     * [SNOW](https://steamdb.info/app/244930/)
     */
    SNOW = 244930,
    /**
     * [SpeedRunners](https://steamdb.info/app/207140/)
     */
    SPEEDRUNNERS = 207140,
    /**
     * [Spellsworn](https://steamdb.info/app/360620/)
     */
    SPELLSWORN = 360620,
    /**
     * [Steam](https://steamdb.info/app/753/)
     */
    STEAM = 753,
    /**
     * [Subnautica](https://steamdb.info/app/264710/)
     */
    SUBNAUTICA = 264710,
    /**
     * [Supraball](https://steamdb.info/app/321400/)
     */
    SUPRABALL = 321400,
    /**
     * [Team Fortress 2](https://steamdb.info/app/440/)
     */
    TF2 = 440,
    /**
     * [The Culling](https://steamdb.info/app/437220/)
     */
    THE_CULLING = 437220,
    /**
     * [Unturned](https://steamdb.info/app/304930/)
     */
    UNTURNED = 304930,
    /**
     * [Wallpaper Engine](https://steamdb.info/app/431960/)
     */
    WALLPAPER_ENGINE = 431960,
    /**
     * [Warframe](https://steamdb.info/app/230410/)
     */
    WARFRAME = 230410,
    /**
     * [Zombie Grinder](https://steamdb.info/app/263920/)
     */
    ZOMBIE_GRINDER = 263920,
}
