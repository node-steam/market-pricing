/// <reference types="node" />

declare module 'request' {
    import * as form   from 'form-data';
    import * as fs     from 'fs';
    import * as http   from 'http';
    import * as https  from 'https';
    import * as stream from 'stream';
    import * as url    from 'url';

    interface RequestAPI<TRequest extends Request,
        TOptions extends CoreOptions,
        TUriUrlOptions> {

        initParams: any;
        debug: boolean;

        defaults(options: TOptions): RequestAPI<TRequest, TOptions, RequiredUriUrl>;
        defaults(options: RequiredUriUrl & TOptions): DefaultUriUrlRequestApi<TRequest, TOptions, OptionalUriUrl>;

        (uri: string, options?: TOptions, callback?: RequestCallback): TRequest;
        (uri: string, callback?: RequestCallback): TRequest;
        (options: TUriUrlOptions & TOptions, callback?: RequestCallback): TRequest;

        get(uri: string, options?: TOptions, callback?: RequestCallback): TRequest;
        get(uri: string, callback?: RequestCallback): TRequest;
        get(options: TUriUrlOptions & TOptions, callback?: RequestCallback): TRequest;

        post(uri: string, options?: TOptions, callback?: RequestCallback): TRequest;
        post(uri: string, callback?: RequestCallback): TRequest;
        post(options: TUriUrlOptions & TOptions, callback?: RequestCallback): TRequest;

        put(uri: string, options?: TOptions, callback?: RequestCallback): TRequest;
        put(uri: string, callback?: RequestCallback): TRequest;
        put(options: TUriUrlOptions & TOptions, callback?: RequestCallback): TRequest;

        head(uri: string, options?: TOptions, callback?: RequestCallback): TRequest;
        head(uri: string, callback?: RequestCallback): TRequest;
        head(options: TUriUrlOptions & TOptions, callback?: RequestCallback): TRequest;

        patch(uri: string, options?: TOptions, callback?: RequestCallback): TRequest;
        patch(uri: string, callback?: RequestCallback): TRequest;
        patch(options: TUriUrlOptions & TOptions, callback?: RequestCallback): TRequest;

        del(uri: string, options?: TOptions, callback?: RequestCallback): TRequest;
        del(uri: string, callback?: RequestCallback): TRequest;
        del(options: TUriUrlOptions & TOptions, callback?: RequestCallback): TRequest;

        delete(uri: string, options?: TOptions, callback?: RequestCallback): TRequest;
        delete(uri: string, callback?: RequestCallback): TRequest;
        delete(options: TUriUrlOptions & TOptions, callback?: RequestCallback): TRequest;

        forever(agentOptions: any, optionsArg: any): TRequest;
        jar(store?: any): CookieJar;
        cookie(str: string): Cookie;
    }

    interface DefaultUriUrlRequestApi<TRequest extends Request,
        TOptions extends CoreOptions,
        TUriUrlOptions> extends RequestAPI<TRequest, TOptions, TUriUrlOptions> {

        defaults(options: TOptions): DefaultUriUrlRequestApi<TRequest, TOptions, OptionalUriUrl>;
        (): TRequest;
        get(): TRequest;
        post(): TRequest;
        put(): TRequest;
        head(): TRequest;
        patch(): TRequest;
        del(): TRequest;
    }

    interface CoreOptions {
        baseUrl?: string;
        callback?: (error: any, response: RequestResponse, body: any) => void;
        jar?: any; // CookieJar
        formData?: any; // Object
        form?: any; // Object or string
        auth?: AuthOptions;
        oauth?: OAuthOptions;
        aws?: AWSOptions;
        hawk?: HawkOptions;
        qs?: any;
        qsStringifyOptions?: any;
        qsParseOptions?: any;
        json?: any;
        jsonReviver?: (key: string, value: any) => any;
        jsonReplacer?: (key: string, value: any) => any;
        multipart?: RequestPart[] | Multipart;
        agent?: http.Agent | https.Agent;
        agentOptions?: any;
        agentClass?: any;
        forever?: any;
        host?: string;
        port?: number;
        method?: string;
        headers?: Headers;
        body?: any;
        followRedirect?: boolean | ((response: http.IncomingMessage) => boolean);
        followAllRedirects?: boolean;
        maxRedirects?: number;
        encoding?: string | null;
        localAddress?: string;
        time?: boolean;
        removeRefererHeader?: boolean;
        pool?: any;
        timeout?: number;
        proxy?: any;
        strictSSL?: boolean;
        gzip?: boolean;
        preambleCRLF?: boolean;
        postambleCRLF?: boolean;
        key?: Buffer;
        cert?: Buffer;
        passphrase?: string;
        ca?: string | Buffer | string[] | Buffer[];
        har?: HttpArchiveRequest;
        useQuerystring?: boolean;
    }

    interface UriOptions {
        uri: string | url.Url;
    }
    interface UrlOptions {
        url: string | url.Url;
    }
    type RequiredUriUrl = UriOptions | UrlOptions;

    interface OptionalUriUrl {
        uri?: string;
        url?: string;
    }

    type OptionsWithUri = UriOptions & CoreOptions;
    type OptionsWithUrl = UrlOptions & CoreOptions;
    type Options = OptionsWithUri | OptionsWithUrl;

    type RequestCallback = (error: any, response: RequestResponse, body: any) => void;

    interface RequestResponse extends http.IncomingMessage {
        request: Options;
        body: any;
        timings: any;
        timingStart: any;
        timingPhases: any;
    }

    interface HttpArchiveRequest {
        url?: string;
        method?: string;
        headers?: NameValuePair[];
        postData?: {
            mimeType?: string;
            params?: NameValuePair[];
        };
    }

    interface NameValuePair {
        name: string;
        value: string;
    }

    interface Multipart {
        chunked?: boolean;
        data?: Array<{
            'content-type'?: string,
            body: string,
        }>;
    }

    interface RequestPart {
        headers?: Headers;
        body: any;
    }

    interface Request extends stream.Stream {
        readable: boolean;
        writable: boolean;

        getAgent(): http.Agent;
        // start(): void;
        // abort(): void;
        pipeDest(dest: any): void;
        setHeader(name: string, value: string, clobber?: boolean): Request;
        setHeaders(headers: Headers): Request;
        qs(q: Object, clobber?: boolean): Request;
        form(): form;
        form(form: any): Request;
        multipart(multipart: RequestPart[]): Request;
        json(val: any): Request;
        aws(opts: AWSOptions, now?: boolean): Request;
        auth(username: string, password: string, sendInmediately?: boolean, bearer?: string): Request;
        oauth(oauth: OAuthOptions): Request;
        jar(jar: CookieJar): Request;

        on(event: string, listener: Function): this;
        on(event: 'request', listener: (req: http.ClientRequest) => void): this;
        on(event: 'response', listener: (resp: http.IncomingMessage) => void): this;
        on(event: 'data', listener: (data: Buffer | string) => void): this;
        on(event: 'error', listener: (e: Error) => void): this;
        on(event: 'complete', listener: (resp: http.IncomingMessage, body?: string | Buffer) => void): this;

        write(x: Buffer | string, cb?: Function): boolean;
        write(str: string, encoding: string, cb?: Function): boolean;
        write(str: string, encoding?: string, fd?: string): boolean;
        end(chunk?: Buffer | string, cb?: Function): void;
        end(chunk: string, encoding: string, cb?: Function): void;
        pause(): void;
        resume(): void;
        abort(): void;
        destroy(): void;
        toJSON(): Object;
    }

    interface Headers {
        [key: string]: any;
    }

    interface AuthOptions {
        user?: string;
        username?: string;
        pass?: string;
        password?: string;
        sendImmediately?: boolean;
        bearer?: string | (() => string);
    }

    interface OAuthOptions {
        callback?: string;
        consumer_key?: string;
        consumer_secret?: string;
        token?: string;
        token_secret?: string;
        verifier?: string;
    }

    interface HawkOptions {
        credentials: any;
    }

    interface AWSOptions {
        secret: string;
        bucket?: string;
    }

    interface CookieJar {
        setCookie(cookie: Cookie, uri: string | url.Url, options?: any): void;
        getCookieString(uri: string | url.Url): string;
        getCookies(uri: string | url.Url): Cookie[];
    }

    interface CookieValue {
        name: string;
        value: any;
        httpOnly: boolean;
    }

    class Cookie extends Array<CookieValue> {
        public str: string;
        public expires: Date;
        public path: string;
        constructor(name: string, req: Request);
        public toString(): string;
    }

    const request: RequestAPI<Request, CoreOptions, RequiredUriUrl>;

    export = request;
}
