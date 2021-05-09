import axios, { AxiosRequestConfig, Method, AxiosResponse } from 'axios';
import { CryptoType, IKeyValue } from './core';
export declare type IRequestOption = {
    successTip?: boolean;
    errorTip?: boolean;
    fullTip?: boolean;
    hasParam?: boolean;
    hasParamData?: boolean;
    hasPassByParam?: boolean;
    debug?: boolean;
    hasDfHandleErr?: boolean;
    method?: Method;
    crypto?: CryptoType;
} & AxiosRequestConfig;
declare let instance: import("axios").AxiosInstance;
export declare const configInstance: (config: AxiosRequestConfig) => void;
declare let globalHeaders: () => IKeyValue<string>;
export declare const configGlobalHeader: (func: () => IKeyValue<string>) => void;
export declare const configRefreshToken: (func: () => Promise<any>) => void;
declare const commonRequestInterceptor: ((option: any) => IRequestOption)[];
declare const commonResponseInterceptor: (((response: AxiosResponse) => any) | (({ response }: {
    response: AxiosResponse;
}) => Promise<never>))[];
declare const commonResponseWithRefreshTokenInterceptor: (((response: AxiosResponse) => any) | (({ response }: {
    response: AxiosResponse;
}) => Promise<unknown>))[];
export declare function request<TResult = any>(opt: IRequestOption): Promise<TResult>;
declare function addRequestInterceptor(onFulfilled?: (value: any) => any | Promise<any>, onRejected?: (error: any) => any): number;
declare function ejectRequestInterceptor(interceptorId: number): void;
declare function addResponseInterceptor(onFulfilled?: (value: any) => any | Promise<any>, onRejected?: (error: any) => any): number;
declare function ejectResponseInterceptor(interceptorId: number): void;
export { axios, instance, globalHeaders, commonRequestInterceptor, commonResponseInterceptor, commonResponseWithRefreshTokenInterceptor, addRequestInterceptor, ejectRequestInterceptor, addResponseInterceptor, ejectResponseInterceptor, AxiosRequestConfig, Method, AxiosResponse, };
