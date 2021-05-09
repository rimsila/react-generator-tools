/// <reference types="node" />
import { Moment } from 'moment';
import { IKeyValue } from './core';
export declare function sleep(ms: number): Promise<unknown>;
export declare function urlToList(url?: string): string[];
export declare function isPromise(obj: any): boolean;
export declare const isUrl: (path: string) => boolean;
export declare function listToFlat<T>(items: T[], key?: string | number, text?: string): IKeyValue<keyof T>;
export declare const isBrowser: () => boolean;
export declare const getPageQuery: () => import("querystring").ParsedUrlQuery;
export declare function getDateString({ date, format, }: {
    date: string | Moment;
    format?: string;
}): string;
export declare function fixedZero(val: number): string;
export declare function newGuid(withSplit?: boolean): string;
export declare function formatSecuredInfo(text: string, type: 'mobile' | 'phone' | 'fax' | 'mail' | 'card' | 'identity' | 'name', filterNA?: boolean): string;
export declare function mergeCells<T>(list: T[], key: string | ((item: T) => string)): IKeyValue;
