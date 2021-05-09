import React from 'react';
import zhCN from './locale/zh_CN';
import enUS from './locale/en_US';
export { zhCN, enUS };
export interface IntlType {
    locale: string;
    getMessage: (id: string, defaultMessage: string) => string;
}
declare const createIntl: (locale: string, localeMap: {
    [key: string]: any;
}) => IntlType;
declare const zhCNIntl: IntlType;
declare const enUSIntl: IntlType;
declare const intlMap: {
    'zh-CN': IntlType;
    'en-US': IntlType;
};
declare const intlMapKeys: string[];
export declare type ParamsType = {
    [key: string]: React.ReactText | React.ReactText[];
};
export { enUSIntl, zhCNIntl, intlMap, intlMapKeys };
declare const ConfigContext: React.Context<{
    intl: IntlType;
}>;
declare const ConfigConsumer: React.Consumer<{
    intl: IntlType;
}>, ConfigProvider: React.Provider<{
    intl: IntlType;
}>;
declare const ConfigProviderWarp: React.FC<{}>;
export { ConfigConsumer, ConfigProvider, ConfigProviderWarp, createIntl };
export declare function useIntl(): IntlType;
export default ConfigContext;
