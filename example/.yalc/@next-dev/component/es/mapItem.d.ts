import React, { FC } from 'react';
export interface IUseMapItem {
    data: any[];
    children?: React.ReactNode;
    antSpan?: number;
    isAntCol?: boolean;
    gut1?: number;
    gut2?: number;
    isDivider?: boolean;
    cssProps?: React.CSSProperties;
    cls?: string;
}
export declare const MapItem: FC<IUseMapItem>;
export default MapItem;
