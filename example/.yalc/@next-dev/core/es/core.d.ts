export declare type IWithFalse<T> = T | false;
export interface IKeyValue<T = any> {
    [key: string]: T;
}
export declare enum CryptoType {
    In = 1,
    Out = 2,
    Both = 4
}
