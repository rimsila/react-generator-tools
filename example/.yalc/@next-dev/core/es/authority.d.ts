export interface ITokenProps {
    token: string;
    refreshToken?: string;
    accessKey?: string;
}
export declare const configTokenName: (tokenName: string) => void;
export declare const setToken: (token: ITokenProps, exp?: number) => void;
export declare const getToken: () => ITokenProps;
export declare const clearToken: () => void;
