import { IKeyValue } from './core';
import { AxiosRequestConfig } from 'axios';
interface IWetrialCoreProps {
    RSAKey?: string;
    Base64MAP?: string;
    routeProfix?: string;
    setGlobalHeader?: () => IKeyValue<string>;
    configRefreshToken?: () => Promise<any>;
    configInstance?: AxiosRequestConfig;
}
export declare function initNextDevCore(props: IWetrialCoreProps): void;
export {};
