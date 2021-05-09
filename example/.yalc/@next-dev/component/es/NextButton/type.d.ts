/// <reference types="react" />
import { ButtonProps } from 'antd/es/button';
import * as CSS from 'csstype';
export declare const btnType: {
    btn_warning: string;
    btn_success: string;
    btn_black: string;
    btn_error: string;
    btn_pink_base: string;
    btn_volcano_base: string;
    btn_cyan_base: string;
    btn_cyan_4: string;
    btn_cyan_8: string;
    btn_purple_base: string;
    btn_normal_color: string;
};
export declare const btnTypeArr: string[];
export declare type BtnType = typeof btnType;
export declare type NextBtnType = keyof BtnType;
export interface NextButtonProps extends ButtonProps {
    nextTheme?: NextBtnType;
    children?: React.ReactNode;
    btnDisplay?: 'flex' | 'block';
    btnJustify?: CSS.Property.AlignContent;
    btnContainerCls?: string;
    btnContainerProps?: React.HTMLAttributes<HTMLDivElement>;
    mt?: string | number;
    mb?: string | number;
    ml?: string | number;
    mr?: string | number;
    my?: string | number;
    mx?: string | number;
}
