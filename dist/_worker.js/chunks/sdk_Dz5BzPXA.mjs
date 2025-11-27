globalThis.process ??= {}; globalThis.process.env ??= {};
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, [])).next());
    });
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

/**
 * Exception thrown by the  package
 */
class AppwriteException extends Error {
    /**
     * Initializes a Appwrite Exception.
     *
     * @param {string} message - The error message.
     * @param {number} code - The error code. Default is 0.
     * @param {string} type - The error type. Default is an empty string.
     * @param {string} response - The response string. Default is an empty string.
     */
    constructor(message, code = 0, type = '', response = '') {
        super(message);
        this.name = 'AppwriteException';
        this.message = message;
        this.code = code;
        this.type = type;
        this.response = response;
    }
}
/**
 * Client that handles requests to Appwrite
 */
class Client {
    constructor() {
        /**
         * Holds configuration such as project.
         */
        this.config = {
            endpoint: 'https://cloud.appwrite.io/v1',
            endpointRealtime: '',
            project: '',
            jwt: '',
            locale: '',
            session: '',
            devkey: '',
        };
        /**
         * Custom headers for API requests.
         */
        this.headers = {
            'x-sdk-name': 'Web',
            'x-sdk-platform': 'client',
            'x-sdk-language': 'web',
            'x-sdk-version': '21.4.0',
            'X-Appwrite-Response-Format': '1.8.0',
        };
        this.realtime = {
            socket: undefined,
            timeout: undefined,
            heartbeat: undefined,
            url: '',
            channels: new Set(),
            subscriptions: new Map(),
            subscriptionsCounter: 0,
            reconnect: true,
            reconnectAttempts: 0,
            lastMessage: undefined,
            connect: () => {
                clearTimeout(this.realtime.timeout);
                this.realtime.timeout = window === null || window === void 0 ? void 0 : window.setTimeout(() => {
                    this.realtime.createSocket();
                }, 50);
            },
            getTimeout: () => {
                switch (true) {
                    case this.realtime.reconnectAttempts < 5:
                        return 1000;
                    case this.realtime.reconnectAttempts < 15:
                        return 5000;
                    case this.realtime.reconnectAttempts < 100:
                        return 10000;
                    default:
                        return 60000;
                }
            },
            createHeartbeat: () => {
                if (this.realtime.heartbeat) {
                    clearTimeout(this.realtime.heartbeat);
                }
                this.realtime.heartbeat = window === null || window === void 0 ? void 0 : window.setInterval(() => {
                    var _a;
                    (_a = this.realtime.socket) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({
                        type: 'ping'
                    }));
                }, 20000);
            },
            createSocket: () => {
                var _a, _b, _c;
                if (this.realtime.channels.size < 1) {
                    this.realtime.reconnect = false;
                    (_a = this.realtime.socket) === null || _a === void 0 ? void 0 : _a.close();
                    return;
                }
                const channels = new URLSearchParams();
                if (this.config.project) {
                    channels.set('project', this.config.project);
                }
                this.realtime.channels.forEach(channel => {
                    channels.append('channels[]', channel);
                });
                const url = this.config.endpointRealtime + '/realtime?' + channels.toString();
                if (url !== this.realtime.url || // Check if URL is present
                    !this.realtime.socket || // Check if WebSocket has not been created
                    ((_b = this.realtime.socket) === null || _b === void 0 ? void 0 : _b.readyState) > WebSocket.OPEN // Check if WebSocket is CLOSING (3) or CLOSED (4)
                ) {
                    if (this.realtime.socket &&
                        ((_c = this.realtime.socket) === null || _c === void 0 ? void 0 : _c.readyState) < WebSocket.CLOSING // Close WebSocket if it is CONNECTING (0) or OPEN (1)
                    ) {
                        this.realtime.reconnect = false;
                        this.realtime.socket.close();
                    }
                    this.realtime.url = url;
                    this.realtime.socket = new WebSocket(url);
                    this.realtime.socket.addEventListener('message', this.realtime.onMessage);
                    this.realtime.socket.addEventListener('open', _event => {
                        this.realtime.reconnectAttempts = 0;
                        this.realtime.createHeartbeat();
                    });
                    this.realtime.socket.addEventListener('close', event => {
                        var _a, _b, _c;
                        if (!this.realtime.reconnect ||
                            (((_b = (_a = this.realtime) === null || _a === void 0 ? void 0 : _a.lastMessage) === null || _b === void 0 ? void 0 : _b.type) === 'error' && // Check if last message was of type error
                                ((_c = this.realtime) === null || _c === void 0 ? void 0 : _c.lastMessage.data).code === 1008 // Check for policy violation 1008
                            )) {
                            this.realtime.reconnect = true;
                            return;
                        }
                        const timeout = this.realtime.getTimeout();
                        console.error(`Realtime got disconnected. Reconnect will be attempted in ${timeout / 1000} seconds.`, event.reason);
                        setTimeout(() => {
                            this.realtime.reconnectAttempts++;
                            this.realtime.createSocket();
                        }, timeout);
                    });
                }
            },
            onMessage: (event) => {
                var _a, _b;
                try {
                    const message = JSON.parse(event.data);
                    this.realtime.lastMessage = message;
                    switch (message.type) {
                        case 'connected':
                            let session = this.config.session;
                            if (!session) {
                                const cookie = JSON.parse((_a = window.localStorage.getItem('cookieFallback')) !== null && _a !== void 0 ? _a : '{}');
                                session = cookie === null || cookie === void 0 ? void 0 : cookie[`a_session_${this.config.project}`];
                            }
                            const messageData = message.data;
                            if (session && !messageData.user) {
                                (_b = this.realtime.socket) === null || _b === void 0 ? void 0 : _b.send(JSON.stringify({
                                    type: 'authentication',
                                    data: {
                                        session
                                    }
                                }));
                            }
                            break;
                        case 'event':
                            let data = message.data;
                            if (data === null || data === void 0 ? void 0 : data.channels) {
                                const isSubscribed = data.channels.some(channel => this.realtime.channels.has(channel));
                                if (!isSubscribed)
                                    return;
                                this.realtime.subscriptions.forEach(subscription => {
                                    if (data.channels.some(channel => subscription.channels.includes(channel))) {
                                        setTimeout(() => subscription.callback(data));
                                    }
                                });
                            }
                            break;
                        case 'pong':
                            break; // Handle pong response if needed
                        case 'error':
                            throw message.data;
                        default:
                            break;
                    }
                }
                catch (e) {
                    console.error(e);
                }
            },
            cleanUp: channels => {
                this.realtime.channels.forEach(channel => {
                    if (channels.includes(channel)) {
                        let found = Array.from(this.realtime.subscriptions).some(([_key, subscription]) => {
                            return subscription.channels.includes(channel);
                        });
                        if (!found) {
                            this.realtime.channels.delete(channel);
                        }
                    }
                });
            }
        };
    }
    /**
     * Set Endpoint
     *
     * Your project endpoint
     *
     * @param {string} endpoint
     *
     * @returns {this}
     */
    setEndpoint(endpoint) {
        if (!endpoint.startsWith('http://') && !endpoint.startsWith('https://')) {
            throw new AppwriteException('Invalid endpoint URL: ' + endpoint);
        }
        this.config.endpoint = endpoint;
        this.config.endpointRealtime = endpoint.replace('https://', 'wss://').replace('http://', 'ws://');
        return this;
    }
    /**
     * Set Realtime Endpoint
     *
     * @param {string} endpointRealtime
     *
     * @returns {this}
     */
    setEndpointRealtime(endpointRealtime) {
        if (!endpointRealtime.startsWith('ws://') && !endpointRealtime.startsWith('wss://')) {
            throw new AppwriteException('Invalid realtime endpoint URL: ' + endpointRealtime);
        }
        this.config.endpointRealtime = endpointRealtime;
        return this;
    }
    /**
     * Set Project
     *
     * Your project ID
     *
     * @param value string
     *
     * @return {this}
     */
    setProject(value) {
        this.headers['X-Appwrite-Project'] = value;
        this.config.project = value;
        return this;
    }
    /**
     * Set JWT
     *
     * Your secret JSON Web Token
     *
     * @param value string
     *
     * @return {this}
     */
    setJWT(value) {
        this.headers['X-Appwrite-JWT'] = value;
        this.config.jwt = value;
        return this;
    }
    /**
     * Set Locale
     *
     * @param value string
     *
     * @return {this}
     */
    setLocale(value) {
        this.headers['X-Appwrite-Locale'] = value;
        this.config.locale = value;
        return this;
    }
    /**
     * Set Session
     *
     * The user session to authenticate with
     *
     * @param value string
     *
     * @return {this}
     */
    setSession(value) {
        this.headers['X-Appwrite-Session'] = value;
        this.config.session = value;
        return this;
    }
    /**
     * Set DevKey
     *
     * Your secret dev API key
     *
     * @param value string
     *
     * @return {this}
     */
    setDevKey(value) {
        this.headers['X-Appwrite-Dev-Key'] = value;
        this.config.devkey = value;
        return this;
    }
    /**
     * Subscribes to Appwrite events and passes you the payload in realtime.
     *
     * @deprecated Use the Realtime service instead.
     * @see Realtime
     *
     * @param {string|string[]} channels
     * Channel to subscribe - pass a single channel as a string or multiple with an array of strings.
     *
     * Possible channels are:
     * - account
     * - collections
     * - collections.[ID]
     * - collections.[ID].documents
     * - documents
     * - documents.[ID]
     * - files
     * - files.[ID]
     * - executions
     * - executions.[ID]
     * - functions.[ID]
     * - teams
     * - teams.[ID]
     * - memberships
     * - memberships.[ID]
     * @param {(payload: RealtimeMessage) => void} callback Is called on every realtime update.
     * @returns {() => void} Unsubscribes from events.
     */
    subscribe(channels, callback) {
        let channelArray = typeof channels === 'string' ? [channels] : channels;
        channelArray.forEach(channel => this.realtime.channels.add(channel));
        const counter = this.realtime.subscriptionsCounter++;
        this.realtime.subscriptions.set(counter, {
            channels: channelArray,
            callback
        });
        this.realtime.connect();
        return () => {
            this.realtime.subscriptions.delete(counter);
            this.realtime.cleanUp(channelArray);
            this.realtime.connect();
        };
    }
    prepareRequest(method, url, headers = {}, params = {}) {
        method = method.toUpperCase();
        headers = Object.assign({}, this.headers, headers);
        if (typeof window !== 'undefined' && window.localStorage) {
            const cookieFallback = window.localStorage.getItem('cookieFallback');
            if (cookieFallback) {
                headers['X-Fallback-Cookies'] = cookieFallback;
            }
        }
        let options = {
            method,
            headers,
        };
        if (headers['X-Appwrite-Dev-Key'] === undefined) {
            options.credentials = 'include';
        }
        if (method === 'GET') {
            for (const [key, value] of Object.entries(Client.flatten(params))) {
                url.searchParams.append(key, value);
            }
        }
        else {
            switch (headers['content-type']) {
                case 'application/json':
                    options.body = JSON.stringify(params);
                    break;
                case 'multipart/form-data':
                    const formData = new FormData();
                    for (const [key, value] of Object.entries(params)) {
                        if (value instanceof File) {
                            formData.append(key, value, value.name);
                        }
                        else if (Array.isArray(value)) {
                            for (const nestedValue of value) {
                                formData.append(`${key}[]`, nestedValue);
                            }
                        }
                        else {
                            formData.append(key, value);
                        }
                    }
                    options.body = formData;
                    delete headers['content-type'];
                    break;
            }
        }
        return { uri: url.toString(), options };
    }
    chunkedUpload(method, url, headers = {}, originalPayload = {}, onProgress) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const [fileParam, file] = (_a = Object.entries(originalPayload).find(([_, value]) => value instanceof File)) !== null && _a !== void 0 ? _a : [];
            if (!file || !fileParam) {
                throw new Error('File not found in payload');
            }
            if (file.size <= Client.CHUNK_SIZE) {
                return yield this.call(method, url, headers, originalPayload);
            }
            let start = 0;
            let response = null;
            while (start < file.size) {
                let end = start + Client.CHUNK_SIZE; // Prepare end for the next chunk
                if (end >= file.size) {
                    end = file.size; // Adjust for the last chunk to include the last byte
                }
                headers['content-range'] = `bytes ${start}-${end - 1}/${file.size}`;
                const chunk = file.slice(start, end);
                let payload = Object.assign({}, originalPayload);
                payload[fileParam] = new File([chunk], file.name);
                response = yield this.call(method, url, headers, payload);
                if (onProgress && typeof onProgress === 'function') {
                    onProgress({
                        $id: response.$id,
                        progress: Math.round((end / file.size) * 100),
                        sizeUploaded: end,
                        chunksTotal: Math.ceil(file.size / Client.CHUNK_SIZE),
                        chunksUploaded: Math.ceil(end / Client.CHUNK_SIZE)
                    });
                }
                if (response && response.$id) {
                    headers['x-appwrite-id'] = response.$id;
                }
                start = end;
            }
            return response;
        });
    }
    ping() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.call('GET', new URL(this.config.endpoint + '/ping'));
        });
    }
    call(method, url, headers = {}, params = {}, responseType = 'json') {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { uri, options } = this.prepareRequest(method, url, headers, params);
            let data = null;
            const response = yield fetch(uri, options);
            // type opaque: No-CORS, different-origin response (CORS-issue)
            if (response.type === 'opaque') {
                throw new AppwriteException(`Invalid Origin. Register your new client (${window.location.host}) as a new Web platform on your project console dashboard`, 403, "forbidden", "");
            }
            const warnings = response.headers.get('x-appwrite-warning');
            if (warnings) {
                warnings.split(';').forEach((warning) => console.warn('Warning: ' + warning));
            }
            if ((_a = response.headers.get('content-type')) === null || _a === void 0 ? void 0 : _a.includes('application/json')) {
                data = yield response.json();
            }
            else if (responseType === 'arrayBuffer') {
                data = yield response.arrayBuffer();
            }
            else {
                data = {
                    message: yield response.text()
                };
            }
            if (400 <= response.status) {
                let responseText = '';
                if (((_b = response.headers.get('content-type')) === null || _b === void 0 ? void 0 : _b.includes('application/json')) || responseType === 'arrayBuffer') {
                    responseText = JSON.stringify(data);
                }
                else {
                    responseText = data === null || data === void 0 ? void 0 : data.message;
                }
                throw new AppwriteException(data === null || data === void 0 ? void 0 : data.message, response.status, data === null || data === void 0 ? void 0 : data.type, responseText);
            }
            const cookieFallback = response.headers.get('X-Fallback-Cookies');
            if (typeof window !== 'undefined' && window.localStorage && cookieFallback) {
                window.console.warn('Appwrite is using localStorage for session management. Increase your security by adding a custom domain as your API endpoint.');
                window.localStorage.setItem('cookieFallback', cookieFallback);
            }
            return data;
        });
    }
    static flatten(data, prefix = '') {
        let output = {};
        for (const [key, value] of Object.entries(data)) {
            let finalKey = prefix ? prefix + '[' + key + ']' : key;
            if (Array.isArray(value)) {
                output = Object.assign(Object.assign({}, output), Client.flatten(value, finalKey));
            }
            else {
                output[finalKey] = value;
            }
        }
        return output;
    }
}
Client.CHUNK_SIZE = 1024 * 1024 * 5;

class Service {
    constructor(client) {
        this.client = client;
    }
    static flatten(data, prefix = '') {
        let output = {};
        for (const [key, value] of Object.entries(data)) {
            let finalKey = prefix ? prefix + '[' + key + ']' : key;
            if (Array.isArray(value)) {
                output = Object.assign(Object.assign({}, output), Service.flatten(value, finalKey));
            }
            else {
                output[finalKey] = value;
            }
        }
        return output;
    }
}
/**
 * The size for chunked uploads in bytes.
 */
Service.CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

class Account {
    constructor(client) {
        this.client = client;
    }
    /**
     * Get the currently logged in user.
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.User<Preferences>>}
     */
    get() {
        const apiPath = '/account';
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {};
        return this.client.call('get', uri, apiHeaders, payload);
    }
    create(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                userId: paramsOrFirst,
                email: rest[0],
                password: rest[1],
                name: rest[2]
            };
        }
        const userId = params.userId;
        const email = params.email;
        const password = params.password;
        const name = params.name;
        if (typeof userId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "userId"');
        }
        if (typeof email === 'undefined') {
            throw new AppwriteException('Missing required parameter: "email"');
        }
        if (typeof password === 'undefined') {
            throw new AppwriteException('Missing required parameter: "password"');
        }
        const apiPath = '/account';
        const payload = {};
        if (typeof userId !== 'undefined') {
            payload['userId'] = userId;
        }
        if (typeof email !== 'undefined') {
            payload['email'] = email;
        }
        if (typeof password !== 'undefined') {
            payload['password'] = password;
        }
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('post', uri, apiHeaders, payload);
    }
    updateEmail(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                email: paramsOrFirst,
                password: rest[0]
            };
        }
        const email = params.email;
        const password = params.password;
        if (typeof email === 'undefined') {
            throw new AppwriteException('Missing required parameter: "email"');
        }
        if (typeof password === 'undefined') {
            throw new AppwriteException('Missing required parameter: "password"');
        }
        const apiPath = '/account/email';
        const payload = {};
        if (typeof email !== 'undefined') {
            payload['email'] = email;
        }
        if (typeof password !== 'undefined') {
            payload['password'] = password;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('patch', uri, apiHeaders, payload);
    }
    listIdentities(paramsOrFirst, ...rest) {
        let params;
        if (!paramsOrFirst || (paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                queries: paramsOrFirst,
                total: rest[0]
            };
        }
        const queries = params.queries;
        const total = params.total;
        const apiPath = '/account/identities';
        const payload = {};
        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }
        if (typeof total !== 'undefined') {
            payload['total'] = total;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {};
        return this.client.call('get', uri, apiHeaders, payload);
    }
    deleteIdentity(paramsOrFirst) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                identityId: paramsOrFirst
            };
        }
        const identityId = params.identityId;
        if (typeof identityId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "identityId"');
        }
        const apiPath = '/account/identities/{identityId}'.replace('{identityId}', identityId);
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('delete', uri, apiHeaders, payload);
    }
    /**
     * Use this endpoint to create a JSON Web Token. You can use the resulting JWT to authenticate on behalf of the current user when working with the Appwrite server-side API and SDKs. The JWT secret is valid for 15 minutes from its creation and will be invalid if the user will logout in that time frame.
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.Jwt>}
     */
    createJWT() {
        const apiPath = '/account/jwts';
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('post', uri, apiHeaders, payload);
    }
    listLogs(paramsOrFirst, ...rest) {
        let params;
        if (!paramsOrFirst || (paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                queries: paramsOrFirst,
                total: rest[0]
            };
        }
        const queries = params.queries;
        const total = params.total;
        const apiPath = '/account/logs';
        const payload = {};
        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }
        if (typeof total !== 'undefined') {
            payload['total'] = total;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {};
        return this.client.call('get', uri, apiHeaders, payload);
    }
    updateMFA(paramsOrFirst) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                mfa: paramsOrFirst
            };
        }
        const mfa = params.mfa;
        if (typeof mfa === 'undefined') {
            throw new AppwriteException('Missing required parameter: "mfa"');
        }
        const apiPath = '/account/mfa';
        const payload = {};
        if (typeof mfa !== 'undefined') {
            payload['mfa'] = mfa;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('patch', uri, apiHeaders, payload);
    }
    createMfaAuthenticator(paramsOrFirst) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst) && 'type' in paramsOrFirst)) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                type: paramsOrFirst
            };
        }
        const type = params.type;
        if (typeof type === 'undefined') {
            throw new AppwriteException('Missing required parameter: "type"');
        }
        const apiPath = '/account/mfa/authenticators/{type}'.replace('{type}', type);
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('post', uri, apiHeaders, payload);
    }
    createMFAAuthenticator(paramsOrFirst) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst) && 'type' in paramsOrFirst)) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                type: paramsOrFirst
            };
        }
        const type = params.type;
        if (typeof type === 'undefined') {
            throw new AppwriteException('Missing required parameter: "type"');
        }
        const apiPath = '/account/mfa/authenticators/{type}'.replace('{type}', type);
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('post', uri, apiHeaders, payload);
    }
    updateMfaAuthenticator(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst) && 'type' in paramsOrFirst)) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                type: paramsOrFirst,
                otp: rest[0]
            };
        }
        const type = params.type;
        const otp = params.otp;
        if (typeof type === 'undefined') {
            throw new AppwriteException('Missing required parameter: "type"');
        }
        if (typeof otp === 'undefined') {
            throw new AppwriteException('Missing required parameter: "otp"');
        }
        const apiPath = '/account/mfa/authenticators/{type}'.replace('{type}', type);
        const payload = {};
        if (typeof otp !== 'undefined') {
            payload['otp'] = otp;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('put', uri, apiHeaders, payload);
    }
    updateMFAAuthenticator(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst) && 'type' in paramsOrFirst)) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                type: paramsOrFirst,
                otp: rest[0]
            };
        }
        const type = params.type;
        const otp = params.otp;
        if (typeof type === 'undefined') {
            throw new AppwriteException('Missing required parameter: "type"');
        }
        if (typeof otp === 'undefined') {
            throw new AppwriteException('Missing required parameter: "otp"');
        }
        const apiPath = '/account/mfa/authenticators/{type}'.replace('{type}', type);
        const payload = {};
        if (typeof otp !== 'undefined') {
            payload['otp'] = otp;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('put', uri, apiHeaders, payload);
    }
    deleteMfaAuthenticator(paramsOrFirst) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst) && 'type' in paramsOrFirst)) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                type: paramsOrFirst
            };
        }
        const type = params.type;
        if (typeof type === 'undefined') {
            throw new AppwriteException('Missing required parameter: "type"');
        }
        const apiPath = '/account/mfa/authenticators/{type}'.replace('{type}', type);
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('delete', uri, apiHeaders, payload);
    }
    deleteMFAAuthenticator(paramsOrFirst) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst) && 'type' in paramsOrFirst)) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                type: paramsOrFirst
            };
        }
        const type = params.type;
        if (typeof type === 'undefined') {
            throw new AppwriteException('Missing required parameter: "type"');
        }
        const apiPath = '/account/mfa/authenticators/{type}'.replace('{type}', type);
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('delete', uri, apiHeaders, payload);
    }
    createMfaChallenge(paramsOrFirst) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst) && 'factor' in paramsOrFirst)) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                factor: paramsOrFirst
            };
        }
        const factor = params.factor;
        if (typeof factor === 'undefined') {
            throw new AppwriteException('Missing required parameter: "factor"');
        }
        const apiPath = '/account/mfa/challenge';
        const payload = {};
        if (typeof factor !== 'undefined') {
            payload['factor'] = factor;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('post', uri, apiHeaders, payload);
    }
    createMFAChallenge(paramsOrFirst) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst) && 'factor' in paramsOrFirst)) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                factor: paramsOrFirst
            };
        }
        const factor = params.factor;
        if (typeof factor === 'undefined') {
            throw new AppwriteException('Missing required parameter: "factor"');
        }
        const apiPath = '/account/mfa/challenge';
        const payload = {};
        if (typeof factor !== 'undefined') {
            payload['factor'] = factor;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('post', uri, apiHeaders, payload);
    }
    updateMfaChallenge(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                challengeId: paramsOrFirst,
                otp: rest[0]
            };
        }
        const challengeId = params.challengeId;
        const otp = params.otp;
        if (typeof challengeId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "challengeId"');
        }
        if (typeof otp === 'undefined') {
            throw new AppwriteException('Missing required parameter: "otp"');
        }
        const apiPath = '/account/mfa/challenge';
        const payload = {};
        if (typeof challengeId !== 'undefined') {
            payload['challengeId'] = challengeId;
        }
        if (typeof otp !== 'undefined') {
            payload['otp'] = otp;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('put', uri, apiHeaders, payload);
    }
    updateMFAChallenge(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                challengeId: paramsOrFirst,
                otp: rest[0]
            };
        }
        const challengeId = params.challengeId;
        const otp = params.otp;
        if (typeof challengeId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "challengeId"');
        }
        if (typeof otp === 'undefined') {
            throw new AppwriteException('Missing required parameter: "otp"');
        }
        const apiPath = '/account/mfa/challenge';
        const payload = {};
        if (typeof challengeId !== 'undefined') {
            payload['challengeId'] = challengeId;
        }
        if (typeof otp !== 'undefined') {
            payload['otp'] = otp;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('put', uri, apiHeaders, payload);
    }
    /**
     * List the factors available on the account to be used as a MFA challange.
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.MfaFactors>}
     * @deprecated This API has been deprecated since 1.8.0. Please use `Account.listMFAFactors` instead.
     */
    listMfaFactors() {
        const apiPath = '/account/mfa/factors';
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {};
        return this.client.call('get', uri, apiHeaders, payload);
    }
    /**
     * List the factors available on the account to be used as a MFA challange.
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.MfaFactors>}
     */
    listMFAFactors() {
        const apiPath = '/account/mfa/factors';
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {};
        return this.client.call('get', uri, apiHeaders, payload);
    }
    /**
     * Get recovery codes that can be used as backup for MFA flow. Before getting codes, they must be generated using [createMfaRecoveryCodes](/docs/references/cloud/client-web/account#createMfaRecoveryCodes) method. An OTP challenge is required to read recovery codes.
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.MfaRecoveryCodes>}
     * @deprecated This API has been deprecated since 1.8.0. Please use `Account.getMFARecoveryCodes` instead.
     */
    getMfaRecoveryCodes() {
        const apiPath = '/account/mfa/recovery-codes';
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {};
        return this.client.call('get', uri, apiHeaders, payload);
    }
    /**
     * Get recovery codes that can be used as backup for MFA flow. Before getting codes, they must be generated using [createMfaRecoveryCodes](/docs/references/cloud/client-web/account#createMfaRecoveryCodes) method. An OTP challenge is required to read recovery codes.
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.MfaRecoveryCodes>}
     */
    getMFARecoveryCodes() {
        const apiPath = '/account/mfa/recovery-codes';
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {};
        return this.client.call('get', uri, apiHeaders, payload);
    }
    /**
     * Generate recovery codes as backup for MFA flow. It's recommended to generate and show then immediately after user successfully adds their authehticator. Recovery codes can be used as a MFA verification type in [createMfaChallenge](/docs/references/cloud/client-web/account#createMfaChallenge) method.
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.MfaRecoveryCodes>}
     * @deprecated This API has been deprecated since 1.8.0. Please use `Account.createMFARecoveryCodes` instead.
     */
    createMfaRecoveryCodes() {
        const apiPath = '/account/mfa/recovery-codes';
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('post', uri, apiHeaders, payload);
    }
    /**
     * Generate recovery codes as backup for MFA flow. It's recommended to generate and show then immediately after user successfully adds their authehticator. Recovery codes can be used as a MFA verification type in [createMfaChallenge](/docs/references/cloud/client-web/account#createMfaChallenge) method.
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.MfaRecoveryCodes>}
     */
    createMFARecoveryCodes() {
        const apiPath = '/account/mfa/recovery-codes';
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('post', uri, apiHeaders, payload);
    }
    /**
     * Regenerate recovery codes that can be used as backup for MFA flow. Before regenerating codes, they must be first generated using [createMfaRecoveryCodes](/docs/references/cloud/client-web/account#createMfaRecoveryCodes) method. An OTP challenge is required to regenreate recovery codes.
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.MfaRecoveryCodes>}
     * @deprecated This API has been deprecated since 1.8.0. Please use `Account.updateMFARecoveryCodes` instead.
     */
    updateMfaRecoveryCodes() {
        const apiPath = '/account/mfa/recovery-codes';
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('patch', uri, apiHeaders, payload);
    }
    /**
     * Regenerate recovery codes that can be used as backup for MFA flow. Before regenerating codes, they must be first generated using [createMfaRecoveryCodes](/docs/references/cloud/client-web/account#createMfaRecoveryCodes) method. An OTP challenge is required to regenreate recovery codes.
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.MfaRecoveryCodes>}
     */
    updateMFARecoveryCodes() {
        const apiPath = '/account/mfa/recovery-codes';
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('patch', uri, apiHeaders, payload);
    }
    updateName(paramsOrFirst) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                name: paramsOrFirst
            };
        }
        const name = params.name;
        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }
        const apiPath = '/account/name';
        const payload = {};
        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('patch', uri, apiHeaders, payload);
    }
    updatePassword(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                password: paramsOrFirst,
                oldPassword: rest[0]
            };
        }
        const password = params.password;
        const oldPassword = params.oldPassword;
        if (typeof password === 'undefined') {
            throw new AppwriteException('Missing required parameter: "password"');
        }
        const apiPath = '/account/password';
        const payload = {};
        if (typeof password !== 'undefined') {
            payload['password'] = password;
        }
        if (typeof oldPassword !== 'undefined') {
            payload['oldPassword'] = oldPassword;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('patch', uri, apiHeaders, payload);
    }
    updatePhone(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                phone: paramsOrFirst,
                password: rest[0]
            };
        }
        const phone = params.phone;
        const password = params.password;
        if (typeof phone === 'undefined') {
            throw new AppwriteException('Missing required parameter: "phone"');
        }
        if (typeof password === 'undefined') {
            throw new AppwriteException('Missing required parameter: "password"');
        }
        const apiPath = '/account/phone';
        const payload = {};
        if (typeof phone !== 'undefined') {
            payload['phone'] = phone;
        }
        if (typeof password !== 'undefined') {
            payload['password'] = password;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('patch', uri, apiHeaders, payload);
    }
    /**
     * Get the preferences as a key-value object for the currently logged in user.
     *
     * @throws {AppwriteException}
     * @returns {Promise<Preferences>}
     */
    getPrefs() {
        const apiPath = '/account/prefs';
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {};
        return this.client.call('get', uri, apiHeaders, payload);
    }
    updatePrefs(paramsOrFirst) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst) && 'prefs' in paramsOrFirst)) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                prefs: paramsOrFirst
            };
        }
        const prefs = params.prefs;
        if (typeof prefs === 'undefined') {
            throw new AppwriteException('Missing required parameter: "prefs"');
        }
        const apiPath = '/account/prefs';
        const payload = {};
        if (typeof prefs !== 'undefined') {
            payload['prefs'] = prefs;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('patch', uri, apiHeaders, payload);
    }
    createRecovery(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                email: paramsOrFirst,
                url: rest[0]
            };
        }
        const email = params.email;
        const url = params.url;
        if (typeof email === 'undefined') {
            throw new AppwriteException('Missing required parameter: "email"');
        }
        if (typeof url === 'undefined') {
            throw new AppwriteException('Missing required parameter: "url"');
        }
        const apiPath = '/account/recovery';
        const payload = {};
        if (typeof email !== 'undefined') {
            payload['email'] = email;
        }
        if (typeof url !== 'undefined') {
            payload['url'] = url;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('post', uri, apiHeaders, payload);
    }
    updateRecovery(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                userId: paramsOrFirst,
                secret: rest[0],
                password: rest[1]
            };
        }
        const userId = params.userId;
        const secret = params.secret;
        const password = params.password;
        if (typeof userId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "userId"');
        }
        if (typeof secret === 'undefined') {
            throw new AppwriteException('Missing required parameter: "secret"');
        }
        if (typeof password === 'undefined') {
            throw new AppwriteException('Missing required parameter: "password"');
        }
        const apiPath = '/account/recovery';
        const payload = {};
        if (typeof userId !== 'undefined') {
            payload['userId'] = userId;
        }
        if (typeof secret !== 'undefined') {
            payload['secret'] = secret;
        }
        if (typeof password !== 'undefined') {
            payload['password'] = password;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('put', uri, apiHeaders, payload);
    }
    /**
     * Get the list of active sessions across different devices for the currently logged in user.
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.SessionList>}
     */
    listSessions() {
        const apiPath = '/account/sessions';
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {};
        return this.client.call('get', uri, apiHeaders, payload);
    }
    /**
     * Delete all sessions from the user account and remove any sessions cookies from the end client.
     *
     * @throws {AppwriteException}
     * @returns {Promise<{}>}
     */
    deleteSessions() {
        const apiPath = '/account/sessions';
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('delete', uri, apiHeaders, payload);
    }
    /**
     * Use this endpoint to allow a new user to register an anonymous account in your project. This route will also create a new session for the user. To allow the new user to convert an anonymous account to a normal account, you need to update its [email and password](https://appwrite.io/docs/references/cloud/client-web/account#updateEmail) or create an [OAuth2 session](https://appwrite.io/docs/references/cloud/client-web/account#CreateOAuth2Session).
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.Session>}
     */
    createAnonymousSession() {
        const apiPath = '/account/sessions/anonymous';
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('post', uri, apiHeaders, payload);
    }
    createEmailPasswordSession(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                email: paramsOrFirst,
                password: rest[0]
            };
        }
        const email = params.email;
        const password = params.password;
        if (typeof email === 'undefined') {
            throw new AppwriteException('Missing required parameter: "email"');
        }
        if (typeof password === 'undefined') {
            throw new AppwriteException('Missing required parameter: "password"');
        }
        const apiPath = '/account/sessions/email';
        const payload = {};
        if (typeof email !== 'undefined') {
            payload['email'] = email;
        }
        if (typeof password !== 'undefined') {
            payload['password'] = password;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('post', uri, apiHeaders, payload);
    }
    updateMagicURLSession(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                userId: paramsOrFirst,
                secret: rest[0]
            };
        }
        const userId = params.userId;
        const secret = params.secret;
        if (typeof userId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "userId"');
        }
        if (typeof secret === 'undefined') {
            throw new AppwriteException('Missing required parameter: "secret"');
        }
        const apiPath = '/account/sessions/magic-url';
        const payload = {};
        if (typeof userId !== 'undefined') {
            payload['userId'] = userId;
        }
        if (typeof secret !== 'undefined') {
            payload['secret'] = secret;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('put', uri, apiHeaders, payload);
    }
    createOAuth2Session(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst) && 'provider' in paramsOrFirst)) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                provider: paramsOrFirst,
                success: rest[0],
                failure: rest[1],
                scopes: rest[2]
            };
        }
        const provider = params.provider;
        const success = params.success;
        const failure = params.failure;
        const scopes = params.scopes;
        if (typeof provider === 'undefined') {
            throw new AppwriteException('Missing required parameter: "provider"');
        }
        const apiPath = '/account/sessions/oauth2/{provider}'.replace('{provider}', provider);
        const payload = {};
        if (typeof success !== 'undefined') {
            payload['success'] = success;
        }
        if (typeof failure !== 'undefined') {
            payload['failure'] = failure;
        }
        if (typeof scopes !== 'undefined') {
            payload['scopes'] = scopes;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        payload['project'] = this.client.config.project;
        for (const [key, value] of Object.entries(Service.flatten(payload))) {
            uri.searchParams.append(key, value);
        }
        if (typeof window !== 'undefined' && (window === null || window === void 0 ? void 0 : window.location)) {
            window.location.href = uri.toString();
            return;
        }
        else {
            return uri.toString();
        }
    }
    updatePhoneSession(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                userId: paramsOrFirst,
                secret: rest[0]
            };
        }
        const userId = params.userId;
        const secret = params.secret;
        if (typeof userId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "userId"');
        }
        if (typeof secret === 'undefined') {
            throw new AppwriteException('Missing required parameter: "secret"');
        }
        const apiPath = '/account/sessions/phone';
        const payload = {};
        if (typeof userId !== 'undefined') {
            payload['userId'] = userId;
        }
        if (typeof secret !== 'undefined') {
            payload['secret'] = secret;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('put', uri, apiHeaders, payload);
    }
    createSession(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                userId: paramsOrFirst,
                secret: rest[0]
            };
        }
        const userId = params.userId;
        const secret = params.secret;
        if (typeof userId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "userId"');
        }
        if (typeof secret === 'undefined') {
            throw new AppwriteException('Missing required parameter: "secret"');
        }
        const apiPath = '/account/sessions/token';
        const payload = {};
        if (typeof userId !== 'undefined') {
            payload['userId'] = userId;
        }
        if (typeof secret !== 'undefined') {
            payload['secret'] = secret;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('post', uri, apiHeaders, payload);
    }
    getSession(paramsOrFirst) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                sessionId: paramsOrFirst
            };
        }
        const sessionId = params.sessionId;
        if (typeof sessionId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "sessionId"');
        }
        const apiPath = '/account/sessions/{sessionId}'.replace('{sessionId}', sessionId);
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {};
        return this.client.call('get', uri, apiHeaders, payload);
    }
    updateSession(paramsOrFirst) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                sessionId: paramsOrFirst
            };
        }
        const sessionId = params.sessionId;
        if (typeof sessionId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "sessionId"');
        }
        const apiPath = '/account/sessions/{sessionId}'.replace('{sessionId}', sessionId);
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('patch', uri, apiHeaders, payload);
    }
    deleteSession(paramsOrFirst) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                sessionId: paramsOrFirst
            };
        }
        const sessionId = params.sessionId;
        if (typeof sessionId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "sessionId"');
        }
        const apiPath = '/account/sessions/{sessionId}'.replace('{sessionId}', sessionId);
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('delete', uri, apiHeaders, payload);
    }
    /**
     * Block the currently logged in user account. Behind the scene, the user record is not deleted but permanently blocked from any access. To completely delete a user, use the Users API instead.
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.User<Preferences>>}
     */
    updateStatus() {
        const apiPath = '/account/status';
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('patch', uri, apiHeaders, payload);
    }
    createPushTarget(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                targetId: paramsOrFirst,
                identifier: rest[0],
                providerId: rest[1]
            };
        }
        const targetId = params.targetId;
        const identifier = params.identifier;
        const providerId = params.providerId;
        if (typeof targetId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "targetId"');
        }
        if (typeof identifier === 'undefined') {
            throw new AppwriteException('Missing required parameter: "identifier"');
        }
        const apiPath = '/account/targets/push';
        const payload = {};
        if (typeof targetId !== 'undefined') {
            payload['targetId'] = targetId;
        }
        if (typeof identifier !== 'undefined') {
            payload['identifier'] = identifier;
        }
        if (typeof providerId !== 'undefined') {
            payload['providerId'] = providerId;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('post', uri, apiHeaders, payload);
    }
    updatePushTarget(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                targetId: paramsOrFirst,
                identifier: rest[0]
            };
        }
        const targetId = params.targetId;
        const identifier = params.identifier;
        if (typeof targetId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "targetId"');
        }
        if (typeof identifier === 'undefined') {
            throw new AppwriteException('Missing required parameter: "identifier"');
        }
        const apiPath = '/account/targets/{targetId}/push'.replace('{targetId}', targetId);
        const payload = {};
        if (typeof identifier !== 'undefined') {
            payload['identifier'] = identifier;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('put', uri, apiHeaders, payload);
    }
    deletePushTarget(paramsOrFirst) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                targetId: paramsOrFirst
            };
        }
        const targetId = params.targetId;
        if (typeof targetId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "targetId"');
        }
        const apiPath = '/account/targets/{targetId}/push'.replace('{targetId}', targetId);
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('delete', uri, apiHeaders, payload);
    }
    createEmailToken(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                userId: paramsOrFirst,
                email: rest[0],
                phrase: rest[1]
            };
        }
        const userId = params.userId;
        const email = params.email;
        const phrase = params.phrase;
        if (typeof userId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "userId"');
        }
        if (typeof email === 'undefined') {
            throw new AppwriteException('Missing required parameter: "email"');
        }
        const apiPath = '/account/tokens/email';
        const payload = {};
        if (typeof userId !== 'undefined') {
            payload['userId'] = userId;
        }
        if (typeof email !== 'undefined') {
            payload['email'] = email;
        }
        if (typeof phrase !== 'undefined') {
            payload['phrase'] = phrase;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('post', uri, apiHeaders, payload);
    }
    createMagicURLToken(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                userId: paramsOrFirst,
                email: rest[0],
                url: rest[1],
                phrase: rest[2]
            };
        }
        const userId = params.userId;
        const email = params.email;
        const url = params.url;
        const phrase = params.phrase;
        if (typeof userId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "userId"');
        }
        if (typeof email === 'undefined') {
            throw new AppwriteException('Missing required parameter: "email"');
        }
        const apiPath = '/account/tokens/magic-url';
        const payload = {};
        if (typeof userId !== 'undefined') {
            payload['userId'] = userId;
        }
        if (typeof email !== 'undefined') {
            payload['email'] = email;
        }
        if (typeof url !== 'undefined') {
            payload['url'] = url;
        }
        if (typeof phrase !== 'undefined') {
            payload['phrase'] = phrase;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('post', uri, apiHeaders, payload);
    }
    createOAuth2Token(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst) && 'provider' in paramsOrFirst)) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                provider: paramsOrFirst,
                success: rest[0],
                failure: rest[1],
                scopes: rest[2]
            };
        }
        const provider = params.provider;
        const success = params.success;
        const failure = params.failure;
        const scopes = params.scopes;
        if (typeof provider === 'undefined') {
            throw new AppwriteException('Missing required parameter: "provider"');
        }
        const apiPath = '/account/tokens/oauth2/{provider}'.replace('{provider}', provider);
        const payload = {};
        if (typeof success !== 'undefined') {
            payload['success'] = success;
        }
        if (typeof failure !== 'undefined') {
            payload['failure'] = failure;
        }
        if (typeof scopes !== 'undefined') {
            payload['scopes'] = scopes;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        payload['project'] = this.client.config.project;
        for (const [key, value] of Object.entries(Service.flatten(payload))) {
            uri.searchParams.append(key, value);
        }
        if (typeof window !== 'undefined' && (window === null || window === void 0 ? void 0 : window.location)) {
            window.location.href = uri.toString();
            return;
        }
        else {
            return uri.toString();
        }
    }
    createPhoneToken(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                userId: paramsOrFirst,
                phone: rest[0]
            };
        }
        const userId = params.userId;
        const phone = params.phone;
        if (typeof userId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "userId"');
        }
        if (typeof phone === 'undefined') {
            throw new AppwriteException('Missing required parameter: "phone"');
        }
        const apiPath = '/account/tokens/phone';
        const payload = {};
        if (typeof userId !== 'undefined') {
            payload['userId'] = userId;
        }
        if (typeof phone !== 'undefined') {
            payload['phone'] = phone;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('post', uri, apiHeaders, payload);
    }
    createEmailVerification(paramsOrFirst) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                url: paramsOrFirst
            };
        }
        const url = params.url;
        if (typeof url === 'undefined') {
            throw new AppwriteException('Missing required parameter: "url"');
        }
        const apiPath = '/account/verifications/email';
        const payload = {};
        if (typeof url !== 'undefined') {
            payload['url'] = url;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('post', uri, apiHeaders, payload);
    }
    createVerification(paramsOrFirst) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                url: paramsOrFirst
            };
        }
        const url = params.url;
        if (typeof url === 'undefined') {
            throw new AppwriteException('Missing required parameter: "url"');
        }
        const apiPath = '/account/verifications/email';
        const payload = {};
        if (typeof url !== 'undefined') {
            payload['url'] = url;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('post', uri, apiHeaders, payload);
    }
    updateEmailVerification(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                userId: paramsOrFirst,
                secret: rest[0]
            };
        }
        const userId = params.userId;
        const secret = params.secret;
        if (typeof userId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "userId"');
        }
        if (typeof secret === 'undefined') {
            throw new AppwriteException('Missing required parameter: "secret"');
        }
        const apiPath = '/account/verifications/email';
        const payload = {};
        if (typeof userId !== 'undefined') {
            payload['userId'] = userId;
        }
        if (typeof secret !== 'undefined') {
            payload['secret'] = secret;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('put', uri, apiHeaders, payload);
    }
    updateVerification(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                userId: paramsOrFirst,
                secret: rest[0]
            };
        }
        const userId = params.userId;
        const secret = params.secret;
        if (typeof userId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "userId"');
        }
        if (typeof secret === 'undefined') {
            throw new AppwriteException('Missing required parameter: "secret"');
        }
        const apiPath = '/account/verifications/email';
        const payload = {};
        if (typeof userId !== 'undefined') {
            payload['userId'] = userId;
        }
        if (typeof secret !== 'undefined') {
            payload['secret'] = secret;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('put', uri, apiHeaders, payload);
    }
    /**
     * Use this endpoint to send a verification SMS to the currently logged in user. This endpoint is meant for use after updating a user's phone number using the [accountUpdatePhone](https://appwrite.io/docs/references/cloud/client-web/account#updatePhone) endpoint. Learn more about how to [complete the verification process](https://appwrite.io/docs/references/cloud/client-web/account#updatePhoneVerification). The verification code sent to the user's phone number is valid for 15 minutes.
     *
     * @throws {AppwriteException}
     * @returns {Promise<Models.Token>}
     */
    createPhoneVerification() {
        const apiPath = '/account/verifications/phone';
        const payload = {};
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('post', uri, apiHeaders, payload);
    }
    updatePhoneVerification(paramsOrFirst, ...rest) {
        let params;
        if ((paramsOrFirst && typeof paramsOrFirst === 'object' && !Array.isArray(paramsOrFirst))) {
            params = (paramsOrFirst || {});
        }
        else {
            params = {
                userId: paramsOrFirst,
                secret: rest[0]
            };
        }
        const userId = params.userId;
        const secret = params.secret;
        if (typeof userId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "userId"');
        }
        if (typeof secret === 'undefined') {
            throw new AppwriteException('Missing required parameter: "secret"');
        }
        const apiPath = '/account/verifications/phone';
        const payload = {};
        if (typeof userId !== 'undefined') {
            payload['userId'] = userId;
        }
        if (typeof secret !== 'undefined') {
            payload['secret'] = secret;
        }
        const uri = new URL(this.client.config.endpoint + apiPath);
        const apiHeaders = {
            'content-type': 'application/json',
        };
        return this.client.call('put', uri, apiHeaders, payload);
    }
}

var RealtimeCode;
(function (RealtimeCode) {
    RealtimeCode[RealtimeCode["NORMAL_CLOSURE"] = 1000] = "NORMAL_CLOSURE";
    RealtimeCode[RealtimeCode["POLICY_VIOLATION"] = 1008] = "POLICY_VIOLATION";
    RealtimeCode[RealtimeCode["UNKNOWN_ERROR"] = -1] = "UNKNOWN_ERROR";
})(RealtimeCode || (RealtimeCode = {}));

var _a, _ID_hexTimestamp;
/**
 * Helper class to generate ID strings for resources.
 */
class ID {
    /**
     * Uses the provided ID as the ID for the resource.
     *
     * @param {string} id
     * @returns {string}
     */
    static custom(id) {
        return id;
    }
    /**
     * Have Appwrite generate a unique ID for you.
     *
     * @param {number} padding. Default is 7.
     * @returns {string}
     */
    static unique(padding = 7) {
        // Generate a unique ID with padding to have a longer ID
        const baseId = __classPrivateFieldGet(ID, _a, "m", _ID_hexTimestamp).call(ID);
        let randomPadding = '';
        for (let i = 0; i < padding; i++) {
            const randomHexDigit = Math.floor(Math.random() * 16).toString(16);
            randomPadding += randomHexDigit;
        }
        return baseId + randomPadding;
    }
}
_a = ID, _ID_hexTimestamp = function _ID_hexTimestamp() {
    const now = new Date();
    const sec = Math.floor(now.getTime() / 1000);
    const msec = now.getMilliseconds();
    // Convert to hexadecimal
    const hexTimestamp = sec.toString(16) + msec.toString(16).padStart(5, '0');
    return hexTimestamp;
};

var Condition;
(function (Condition) {
    Condition["Equal"] = "equal";
    Condition["NotEqual"] = "notEqual";
    Condition["GreaterThan"] = "greaterThan";
    Condition["GreaterThanEqual"] = "greaterThanEqual";
    Condition["LessThan"] = "lessThan";
    Condition["LessThanEqual"] = "lessThanEqual";
    Condition["Contains"] = "contains";
    Condition["IsNull"] = "isNull";
    Condition["IsNotNull"] = "isNotNull";
})(Condition || (Condition = {}));

var AuthenticatorType;
(function (AuthenticatorType) {
    AuthenticatorType["Totp"] = "totp";
})(AuthenticatorType || (AuthenticatorType = {}));

var AuthenticationFactor;
(function (AuthenticationFactor) {
    AuthenticationFactor["Email"] = "email";
    AuthenticationFactor["Phone"] = "phone";
    AuthenticationFactor["Totp"] = "totp";
    AuthenticationFactor["Recoverycode"] = "recoverycode";
})(AuthenticationFactor || (AuthenticationFactor = {}));

var OAuthProvider;
(function (OAuthProvider) {
    OAuthProvider["Amazon"] = "amazon";
    OAuthProvider["Apple"] = "apple";
    OAuthProvider["Auth0"] = "auth0";
    OAuthProvider["Authentik"] = "authentik";
    OAuthProvider["Autodesk"] = "autodesk";
    OAuthProvider["Bitbucket"] = "bitbucket";
    OAuthProvider["Bitly"] = "bitly";
    OAuthProvider["Box"] = "box";
    OAuthProvider["Dailymotion"] = "dailymotion";
    OAuthProvider["Discord"] = "discord";
    OAuthProvider["Disqus"] = "disqus";
    OAuthProvider["Dropbox"] = "dropbox";
    OAuthProvider["Etsy"] = "etsy";
    OAuthProvider["Facebook"] = "facebook";
    OAuthProvider["Figma"] = "figma";
    OAuthProvider["Github"] = "github";
    OAuthProvider["Gitlab"] = "gitlab";
    OAuthProvider["Google"] = "google";
    OAuthProvider["Linkedin"] = "linkedin";
    OAuthProvider["Microsoft"] = "microsoft";
    OAuthProvider["Notion"] = "notion";
    OAuthProvider["Oidc"] = "oidc";
    OAuthProvider["Okta"] = "okta";
    OAuthProvider["Paypal"] = "paypal";
    OAuthProvider["PaypalSandbox"] = "paypalSandbox";
    OAuthProvider["Podio"] = "podio";
    OAuthProvider["Salesforce"] = "salesforce";
    OAuthProvider["Slack"] = "slack";
    OAuthProvider["Spotify"] = "spotify";
    OAuthProvider["Stripe"] = "stripe";
    OAuthProvider["Tradeshift"] = "tradeshift";
    OAuthProvider["TradeshiftBox"] = "tradeshiftBox";
    OAuthProvider["Twitch"] = "twitch";
    OAuthProvider["Wordpress"] = "wordpress";
    OAuthProvider["Yahoo"] = "yahoo";
    OAuthProvider["Yammer"] = "yammer";
    OAuthProvider["Yandex"] = "yandex";
    OAuthProvider["Zoho"] = "zoho";
    OAuthProvider["Zoom"] = "zoom";
    OAuthProvider["Mock"] = "mock";
})(OAuthProvider || (OAuthProvider = {}));

var Browser;
(function (Browser) {
    Browser["AvantBrowser"] = "aa";
    Browser["AndroidWebViewBeta"] = "an";
    Browser["GoogleChrome"] = "ch";
    Browser["GoogleChromeIOS"] = "ci";
    Browser["GoogleChromeMobile"] = "cm";
    Browser["Chromium"] = "cr";
    Browser["MozillaFirefox"] = "ff";
    Browser["Safari"] = "sf";
    Browser["MobileSafari"] = "mf";
    Browser["MicrosoftEdge"] = "ps";
    Browser["MicrosoftEdgeIOS"] = "oi";
    Browser["OperaMini"] = "om";
    Browser["Opera"] = "op";
    Browser["OperaNext"] = "on";
})(Browser || (Browser = {}));

var CreditCard;
(function (CreditCard) {
    CreditCard["AmericanExpress"] = "amex";
    CreditCard["Argencard"] = "argencard";
    CreditCard["Cabal"] = "cabal";
    CreditCard["Cencosud"] = "cencosud";
    CreditCard["DinersClub"] = "diners";
    CreditCard["Discover"] = "discover";
    CreditCard["Elo"] = "elo";
    CreditCard["Hipercard"] = "hipercard";
    CreditCard["JCB"] = "jcb";
    CreditCard["Mastercard"] = "mastercard";
    CreditCard["Naranja"] = "naranja";
    CreditCard["TarjetaShopping"] = "targeta-shopping";
    CreditCard["UnionPay"] = "unionpay";
    CreditCard["Visa"] = "visa";
    CreditCard["MIR"] = "mir";
    CreditCard["Maestro"] = "maestro";
    CreditCard["Rupay"] = "rupay";
})(CreditCard || (CreditCard = {}));

var Flag;
(function (Flag) {
    Flag["Afghanistan"] = "af";
    Flag["Angola"] = "ao";
    Flag["Albania"] = "al";
    Flag["Andorra"] = "ad";
    Flag["UnitedArabEmirates"] = "ae";
    Flag["Argentina"] = "ar";
    Flag["Armenia"] = "am";
    Flag["AntiguaAndBarbuda"] = "ag";
    Flag["Australia"] = "au";
    Flag["Austria"] = "at";
    Flag["Azerbaijan"] = "az";
    Flag["Burundi"] = "bi";
    Flag["Belgium"] = "be";
    Flag["Benin"] = "bj";
    Flag["BurkinaFaso"] = "bf";
    Flag["Bangladesh"] = "bd";
    Flag["Bulgaria"] = "bg";
    Flag["Bahrain"] = "bh";
    Flag["Bahamas"] = "bs";
    Flag["BosniaAndHerzegovina"] = "ba";
    Flag["Belarus"] = "by";
    Flag["Belize"] = "bz";
    Flag["Bolivia"] = "bo";
    Flag["Brazil"] = "br";
    Flag["Barbados"] = "bb";
    Flag["BruneiDarussalam"] = "bn";
    Flag["Bhutan"] = "bt";
    Flag["Botswana"] = "bw";
    Flag["CentralAfricanRepublic"] = "cf";
    Flag["Canada"] = "ca";
    Flag["Switzerland"] = "ch";
    Flag["Chile"] = "cl";
    Flag["China"] = "cn";
    Flag["CoteDIvoire"] = "ci";
    Flag["Cameroon"] = "cm";
    Flag["DemocraticRepublicOfTheCongo"] = "cd";
    Flag["RepublicOfTheCongo"] = "cg";
    Flag["Colombia"] = "co";
    Flag["Comoros"] = "km";
    Flag["CapeVerde"] = "cv";
    Flag["CostaRica"] = "cr";
    Flag["Cuba"] = "cu";
    Flag["Cyprus"] = "cy";
    Flag["CzechRepublic"] = "cz";
    Flag["Germany"] = "de";
    Flag["Djibouti"] = "dj";
    Flag["Dominica"] = "dm";
    Flag["Denmark"] = "dk";
    Flag["DominicanRepublic"] = "do";
    Flag["Algeria"] = "dz";
    Flag["Ecuador"] = "ec";
    Flag["Egypt"] = "eg";
    Flag["Eritrea"] = "er";
    Flag["Spain"] = "es";
    Flag["Estonia"] = "ee";
    Flag["Ethiopia"] = "et";
    Flag["Finland"] = "fi";
    Flag["Fiji"] = "fj";
    Flag["France"] = "fr";
    Flag["MicronesiaFederatedStatesOf"] = "fm";
    Flag["Gabon"] = "ga";
    Flag["UnitedKingdom"] = "gb";
    Flag["Georgia"] = "ge";
    Flag["Ghana"] = "gh";
    Flag["Guinea"] = "gn";
    Flag["Gambia"] = "gm";
    Flag["GuineaBissau"] = "gw";
    Flag["EquatorialGuinea"] = "gq";
    Flag["Greece"] = "gr";
    Flag["Grenada"] = "gd";
    Flag["Guatemala"] = "gt";
    Flag["Guyana"] = "gy";
    Flag["Honduras"] = "hn";
    Flag["Croatia"] = "hr";
    Flag["Haiti"] = "ht";
    Flag["Hungary"] = "hu";
    Flag["Indonesia"] = "id";
    Flag["India"] = "in";
    Flag["Ireland"] = "ie";
    Flag["IranIslamicRepublicOf"] = "ir";
    Flag["Iraq"] = "iq";
    Flag["Iceland"] = "is";
    Flag["Israel"] = "il";
    Flag["Italy"] = "it";
    Flag["Jamaica"] = "jm";
    Flag["Jordan"] = "jo";
    Flag["Japan"] = "jp";
    Flag["Kazakhstan"] = "kz";
    Flag["Kenya"] = "ke";
    Flag["Kyrgyzstan"] = "kg";
    Flag["Cambodia"] = "kh";
    Flag["Kiribati"] = "ki";
    Flag["SaintKittsAndNevis"] = "kn";
    Flag["SouthKorea"] = "kr";
    Flag["Kuwait"] = "kw";
    Flag["LaoPeopleSDemocraticRepublic"] = "la";
    Flag["Lebanon"] = "lb";
    Flag["Liberia"] = "lr";
    Flag["Libya"] = "ly";
    Flag["SaintLucia"] = "lc";
    Flag["Liechtenstein"] = "li";
    Flag["SriLanka"] = "lk";
    Flag["Lesotho"] = "ls";
    Flag["Lithuania"] = "lt";
    Flag["Luxembourg"] = "lu";
    Flag["Latvia"] = "lv";
    Flag["Morocco"] = "ma";
    Flag["Monaco"] = "mc";
    Flag["Moldova"] = "md";
    Flag["Madagascar"] = "mg";
    Flag["Maldives"] = "mv";
    Flag["Mexico"] = "mx";
    Flag["MarshallIslands"] = "mh";
    Flag["NorthMacedonia"] = "mk";
    Flag["Mali"] = "ml";
    Flag["Malta"] = "mt";
    Flag["Myanmar"] = "mm";
    Flag["Montenegro"] = "me";
    Flag["Mongolia"] = "mn";
    Flag["Mozambique"] = "mz";
    Flag["Mauritania"] = "mr";
    Flag["Mauritius"] = "mu";
    Flag["Malawi"] = "mw";
    Flag["Malaysia"] = "my";
    Flag["Namibia"] = "na";
    Flag["Niger"] = "ne";
    Flag["Nigeria"] = "ng";
    Flag["Nicaragua"] = "ni";
    Flag["Netherlands"] = "nl";
    Flag["Norway"] = "no";
    Flag["Nepal"] = "np";
    Flag["Nauru"] = "nr";
    Flag["NewZealand"] = "nz";
    Flag["Oman"] = "om";
    Flag["Pakistan"] = "pk";
    Flag["Panama"] = "pa";
    Flag["Peru"] = "pe";
    Flag["Philippines"] = "ph";
    Flag["Palau"] = "pw";
    Flag["PapuaNewGuinea"] = "pg";
    Flag["Poland"] = "pl";
    Flag["FrenchPolynesia"] = "pf";
    Flag["NorthKorea"] = "kp";
    Flag["Portugal"] = "pt";
    Flag["Paraguay"] = "py";
    Flag["Qatar"] = "qa";
    Flag["Romania"] = "ro";
    Flag["Russia"] = "ru";
    Flag["Rwanda"] = "rw";
    Flag["SaudiArabia"] = "sa";
    Flag["Sudan"] = "sd";
    Flag["Senegal"] = "sn";
    Flag["Singapore"] = "sg";
    Flag["SolomonIslands"] = "sb";
    Flag["SierraLeone"] = "sl";
    Flag["ElSalvador"] = "sv";
    Flag["SanMarino"] = "sm";
    Flag["Somalia"] = "so";
    Flag["Serbia"] = "rs";
    Flag["SouthSudan"] = "ss";
    Flag["SaoTomeAndPrincipe"] = "st";
    Flag["Suriname"] = "sr";
    Flag["Slovakia"] = "sk";
    Flag["Slovenia"] = "si";
    Flag["Sweden"] = "se";
    Flag["Eswatini"] = "sz";
    Flag["Seychelles"] = "sc";
    Flag["Syria"] = "sy";
    Flag["Chad"] = "td";
    Flag["Togo"] = "tg";
    Flag["Thailand"] = "th";
    Flag["Tajikistan"] = "tj";
    Flag["Turkmenistan"] = "tm";
    Flag["TimorLeste"] = "tl";
    Flag["Tonga"] = "to";
    Flag["TrinidadAndTobago"] = "tt";
    Flag["Tunisia"] = "tn";
    Flag["Turkey"] = "tr";
    Flag["Tuvalu"] = "tv";
    Flag["Tanzania"] = "tz";
    Flag["Uganda"] = "ug";
    Flag["Ukraine"] = "ua";
    Flag["Uruguay"] = "uy";
    Flag["UnitedStates"] = "us";
    Flag["Uzbekistan"] = "uz";
    Flag["VaticanCity"] = "va";
    Flag["SaintVincentAndTheGrenadines"] = "vc";
    Flag["Venezuela"] = "ve";
    Flag["Vietnam"] = "vn";
    Flag["Vanuatu"] = "vu";
    Flag["Samoa"] = "ws";
    Flag["Yemen"] = "ye";
    Flag["SouthAfrica"] = "za";
    Flag["Zambia"] = "zm";
    Flag["Zimbabwe"] = "zw";
})(Flag || (Flag = {}));

var ExecutionMethod;
(function (ExecutionMethod) {
    ExecutionMethod["GET"] = "GET";
    ExecutionMethod["POST"] = "POST";
    ExecutionMethod["PUT"] = "PUT";
    ExecutionMethod["PATCH"] = "PATCH";
    ExecutionMethod["DELETE"] = "DELETE";
    ExecutionMethod["OPTIONS"] = "OPTIONS";
    ExecutionMethod["HEAD"] = "HEAD";
})(ExecutionMethod || (ExecutionMethod = {}));

var ImageGravity;
(function (ImageGravity) {
    ImageGravity["Center"] = "center";
    ImageGravity["Topleft"] = "top-left";
    ImageGravity["Top"] = "top";
    ImageGravity["Topright"] = "top-right";
    ImageGravity["Left"] = "left";
    ImageGravity["Right"] = "right";
    ImageGravity["Bottomleft"] = "bottom-left";
    ImageGravity["Bottom"] = "bottom";
    ImageGravity["Bottomright"] = "bottom-right";
})(ImageGravity || (ImageGravity = {}));

var ImageFormat;
(function (ImageFormat) {
    ImageFormat["Jpg"] = "jpg";
    ImageFormat["Jpeg"] = "jpeg";
    ImageFormat["Png"] = "png";
    ImageFormat["Webp"] = "webp";
    ImageFormat["Heic"] = "heic";
    ImageFormat["Avif"] = "avif";
    ImageFormat["Gif"] = "gif";
})(ImageFormat || (ImageFormat = {}));

var ExecutionTrigger;
(function (ExecutionTrigger) {
    ExecutionTrigger["Http"] = "http";
    ExecutionTrigger["Schedule"] = "schedule";
    ExecutionTrigger["Event"] = "event";
})(ExecutionTrigger || (ExecutionTrigger = {}));

var ExecutionStatus;
(function (ExecutionStatus) {
    ExecutionStatus["Waiting"] = "waiting";
    ExecutionStatus["Processing"] = "processing";
    ExecutionStatus["Completed"] = "completed";
    ExecutionStatus["Failed"] = "failed";
    ExecutionStatus["Scheduled"] = "scheduled";
})(ExecutionStatus || (ExecutionStatus = {}));

export { Account, AppwriteException, AuthenticationFactor, AuthenticatorType, Browser, Client, Condition, CreditCard, ExecutionMethod, ExecutionStatus, ExecutionTrigger, Flag, ID, ImageFormat, ImageGravity, OAuthProvider };
