interface ResponsiveConfig {
    [key: string]: {
        min: number;
        max: number;
    };
}
interface ResponsiveInfo {
    screen: string;
    size: {
        height: number;
        width: number;
    };
}
export declare function configResponsive(config: ResponsiveConfig): void;
export declare function useResponsive(): ResponsiveInfo;
export {};
