/// <reference types="react" />
import { FooterProps } from 'rc-footer/es';
export declare const bgType: {
    bg_light: string;
    bg_success: string;
    bg_warning: string;
    bg_black: string;
    bg_error: string;
    bg_pink_base: string;
    bg_volcano_base: string;
    bg_cyan_base: string;
    bg_cyan_4: string;
    bg_cyan_8: string;
    bg_purple_base: string;
};
export declare const bgTypeArr: string[];
export declare type IBgType = typeof bgType;
export declare type NextTheme = keyof IBgType;
export interface NextFooterProps extends FooterProps {
    children?: React.ReactNode;
    nextTheme?: NextTheme;
    className?: string;
}
