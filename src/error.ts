export enum codes {
    CONNECTION_RESET =       'CONNECTION_RESET',
    CONNECTION_TIMED_OUT =   'CONNECTION_TIMED_OUT',
    INVALID_APPLICATION_ID = 'INVALID_APPLICATION_ID',
    INVALID_OPTIONS =        'INVALID_OPTIONS',
    ITEM_NO_DATA =           'ITEM_NO_DATA',
    ITEM_NOT_FOUND =         'ITEM_NOT_FOUND',
    RATELIMIT_EXCEEDED =     'RATELIMIT_EXCEEDED',
    SOCKET_TIMED_OUT =       'SOCKET_TIMED_OUT',
    UNKNOWN =                'UNKNOWN',
    UNKNOWN_RESPONSE =       'UNKNOWN_RESPONSE',
}

/**
 * @hidden
 */
export enum messages {
    CONNECTION_RESET =       'Connection Was Reset!',
    CONNECTION_TIMED_OUT =   'Connection Timed Out!',
    INVALID_APPLICATION_ID = 'Invalid Application ID!',
    INVALID_OPTIONS =        'Invalid Options Passed To Constructor!',
    ITEM_NO_DATA =           'Item Was Found But No Data Transmitted!',
    ITEM_NOT_FOUND =         'Item Not Found! Status: %',
    RATELIMIT_EXCEEDED =     'Steam API Rate Limit Exceeded!',
    SOCKET_TIMED_OUT =       'Socket Timed Out!',
    UNKNOWN =                'Unknown Error!',
    UNKNOWN_RESPONSE =       'Unknown Response! Status: %',
}

/**
 * @hidden
 */
export class Exception extends Error {
    public code: keyof typeof messages;

    constructor(code: keyof typeof messages, info?: string | number) {
        let text: string = messages[code];
        if (info) text = text.replace('%', `${info}`);

        super(text);
        this.code = code;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}
