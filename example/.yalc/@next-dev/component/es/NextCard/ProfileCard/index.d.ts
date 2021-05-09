import React from 'react';
import './index.less';
declare const defaultData: {
    avatar: string;
    name: string;
    sub1: string;
    sub2: string;
    socialData: any[];
};
declare type IProfileProps = {
    type: 'style1';
    data: typeof defaultData;
};
export declare const ProfileCard: React.MemoExoticComponent<(props: IProfileProps) => JSX.Element>;
export {};
