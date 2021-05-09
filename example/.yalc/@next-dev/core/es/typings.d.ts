declare module 'jsencrypt' {
  export default class JSEncrypt {
    constructor();
    setPublicKey(pk: string): void;
    getKey(): any;
    encrypt(key: string): string;
  }
}

declare module 'store' {
  export function set(key: string, value: any): void;
  export function get(key: string): any;
  export function remove(key: string): void;
  export function clearAll(): void;
}
declare type MethodType = 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH';
