/// <reference types="react" />
import { NextBtnType } from '../NextButton/type';
export interface LayoutProps {
    bgColor?: NextBtnType;
    children?: React.ReactNode;
    title?: React.ReactNode;
    docs?: React.ReactNode;
    gut1?: number;
    gut2?: number;
    cls?: string;
}
