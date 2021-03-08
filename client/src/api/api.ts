/* tslint:disable */
/* eslint-disable */
/**
 * Neko Rooms
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface RoomEntry
 */
export interface RoomEntry {
    /**
     * 
     * @type {string}
     * @memberof RoomEntry
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof RoomEntry
     */
    url?: string;
    /**
     * 
     * @type {string}
     * @memberof RoomEntry
     */
    name?: string;
    /**
     * 
     * @type {number}
     * @memberof RoomEntry
     */
    max_connections?: number;
    /**
     * 
     * @type {string}
     * @memberof RoomEntry
     */
    image?: string;
    /**
     * 
     * @type {boolean}
     * @memberof RoomEntry
     */
    running?: boolean;
    /**
     * 
     * @type {string}
     * @memberof RoomEntry
     */
    status?: string;
    /**
     * 
     * @type {string}
     * @memberof RoomEntry
     */
    created?: string;
}
/**
 * 
 * @export
 * @interface RoomID
 */
export interface RoomID {
    /**
     * 
     * @type {string}
     * @memberof RoomID
     */
    id?: string;
}
/**
 * 
 * @export
 * @interface RoomSettings
 */
export interface RoomSettings {
    /**
     * 
     * @type {string}
     * @memberof RoomSettings
     */
    name?: string;
    /**
     * 
     * @type {number}
     * @memberof RoomSettings
     */
    max_connections?: number;
    /**
     * 
     * @type {string}
     * @memberof RoomSettings
     */
    user_pass?: string;
    /**
     * 
     * @type {string}
     * @memberof RoomSettings
     */
    admin_pass?: string;
    /**
     * 
     * @type {string}
     * @memberof RoomSettings
     */
    broadcast_pipeline?: string;
    /**
     * 
     * @type {string}
     * @memberof RoomSettings
     */
    screen?: string;
    /**
     * 
     * @type {string}
     * @memberof RoomSettings
     */
    video_codec?: string;
    /**
     * 
     * @type {number}
     * @memberof RoomSettings
     */
    video_bitrate?: number;
    /**
     * 
     * @type {string}
     * @memberof RoomSettings
     */
    video_pipeline?: string;
    /**
     * 
     * @type {number}
     * @memberof RoomSettings
     */
    video_max_fps?: number;
    /**
     * 
     * @type {string}
     * @memberof RoomSettings
     */
    audio_codec?: string;
    /**
     * 
     * @type {number}
     * @memberof RoomSettings
     */
    audio_bitrate?: number;
    /**
     * 
     * @type {string}
     * @memberof RoomSettings
     */
    audio_pipeline?: string;
}

/**
 * RoomsApi - axios parameter creator
 * @export
 */
export const RoomsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Create new room
         * @param {RoomSettings} [roomSettings] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        roomCreate: async (roomSettings?: RoomSettings, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/rooms`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(roomSettings, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get room settings
         * @param {string} roomId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        roomGet: async (roomId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'roomId' is not null or undefined
            assertParamExists('roomGet', 'roomId', roomId)
            const localVarPath = `/api/rooms/{roomId}`
                .replace(`{${"roomId"}}`, encodeURIComponent(String(roomId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Remove room
         * @param {string} roomId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        roomRemove: async (roomId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'roomId' is not null or undefined
            assertParamExists('roomRemove', 'roomId', roomId)
            const localVarPath = `/api/rooms/{roomId}`
                .replace(`{${"roomId"}}`, encodeURIComponent(String(roomId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Restart room
         * @param {string} roomId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        roomRestart: async (roomId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'roomId' is not null or undefined
            assertParamExists('roomRestart', 'roomId', roomId)
            const localVarPath = `/api/rooms/{roomId}/restart`
                .replace(`{${"roomId"}}`, encodeURIComponent(String(roomId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Start room
         * @param {string} roomId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        roomStart: async (roomId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'roomId' is not null or undefined
            assertParamExists('roomStart', 'roomId', roomId)
            const localVarPath = `/api/rooms/{roomId}/start`
                .replace(`{${"roomId"}}`, encodeURIComponent(String(roomId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Stop room
         * @param {string} roomId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        roomStop: async (roomId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'roomId' is not null or undefined
            assertParamExists('roomStop', 'roomId', roomId)
            const localVarPath = `/api/rooms/{roomId}/stop`
                .replace(`{${"roomId"}}`, encodeURIComponent(String(roomId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary List all rooms
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        roomsList: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/rooms`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * RoomsApi - functional programming interface
 * @export
 */
export const RoomsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = RoomsApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Create new room
         * @param {RoomSettings} [roomSettings] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async roomCreate(roomSettings?: RoomSettings, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RoomID>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.roomCreate(roomSettings, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get room settings
         * @param {string} roomId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async roomGet(roomId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RoomSettings>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.roomGet(roomId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Remove room
         * @param {string} roomId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async roomRemove(roomId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.roomRemove(roomId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Restart room
         * @param {string} roomId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async roomRestart(roomId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.roomRestart(roomId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Start room
         * @param {string} roomId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async roomStart(roomId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.roomStart(roomId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Stop room
         * @param {string} roomId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async roomStop(roomId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.roomStop(roomId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary List all rooms
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async roomsList(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<RoomEntry>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.roomsList(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * RoomsApi - factory interface
 * @export
 */
export const RoomsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = RoomsApiFp(configuration)
    return {
        /**
         * 
         * @summary Create new room
         * @param {RoomSettings} [roomSettings] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        roomCreate(roomSettings?: RoomSettings, options?: any): AxiosPromise<RoomID> {
            return localVarFp.roomCreate(roomSettings, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get room settings
         * @param {string} roomId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        roomGet(roomId: string, options?: any): AxiosPromise<RoomSettings> {
            return localVarFp.roomGet(roomId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Remove room
         * @param {string} roomId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        roomRemove(roomId: string, options?: any): AxiosPromise<void> {
            return localVarFp.roomRemove(roomId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Restart room
         * @param {string} roomId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        roomRestart(roomId: string, options?: any): AxiosPromise<void> {
            return localVarFp.roomRestart(roomId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Start room
         * @param {string} roomId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        roomStart(roomId: string, options?: any): AxiosPromise<void> {
            return localVarFp.roomStart(roomId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Stop room
         * @param {string} roomId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        roomStop(roomId: string, options?: any): AxiosPromise<void> {
            return localVarFp.roomStop(roomId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary List all rooms
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        roomsList(options?: any): AxiosPromise<Array<RoomEntry>> {
            return localVarFp.roomsList(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * RoomsApi - object-oriented interface
 * @export
 * @class RoomsApi
 * @extends {BaseAPI}
 */
export class RoomsApi extends BaseAPI {
    /**
     * 
     * @summary Create new room
     * @param {RoomSettings} [roomSettings] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RoomsApi
     */
    public roomCreate(roomSettings?: RoomSettings, options?: any) {
        return RoomsApiFp(this.configuration).roomCreate(roomSettings, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get room settings
     * @param {string} roomId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RoomsApi
     */
    public roomGet(roomId: string, options?: any) {
        return RoomsApiFp(this.configuration).roomGet(roomId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Remove room
     * @param {string} roomId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RoomsApi
     */
    public roomRemove(roomId: string, options?: any) {
        return RoomsApiFp(this.configuration).roomRemove(roomId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Restart room
     * @param {string} roomId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RoomsApi
     */
    public roomRestart(roomId: string, options?: any) {
        return RoomsApiFp(this.configuration).roomRestart(roomId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Start room
     * @param {string} roomId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RoomsApi
     */
    public roomStart(roomId: string, options?: any) {
        return RoomsApiFp(this.configuration).roomStart(roomId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Stop room
     * @param {string} roomId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RoomsApi
     */
    public roomStop(roomId: string, options?: any) {
        return RoomsApiFp(this.configuration).roomStop(roomId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary List all rooms
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RoomsApi
     */
    public roomsList(options?: any) {
        return RoomsApiFp(this.configuration).roomsList(options).then((request) => request(this.axios, this.basePath));
    }
}

