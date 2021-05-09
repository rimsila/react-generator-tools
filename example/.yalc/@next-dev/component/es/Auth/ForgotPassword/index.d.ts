import { FormItemProps, FormProps } from 'antd/lib/form';
import { InputProps } from 'antd/lib/input';
import React, { ReactNode } from 'react';
import { NextButtonProps } from '../../NextButton/type';
import { ColProps } from 'antd/lib/col';
interface IProp extends FormProps {
    next?: {
        logoWith?: number | string;
        emailItemProps?: FormItemProps;
        logo?: any;
        alt?: string;
        title?: string;
        submitBtnProps?: NextButtonProps;
        isHideSubmitBtn?: boolean;
        customFooter?: ReactNode;
        emailInputProps?: InputProps;
        logoAlign?: string;
        customField?: ReactNode;
        isHideEmail?: boolean;
        isHasPasswordField?: boolean;
        goBackProps?: NextButtonProps;
        isHasGoBackBtn?: boolean;
        colProps?: ColProps;
    };
}
export declare const defaultProps: {
    next: {
        logoWith: number;
        alt: string;
        title: string;
        logo: string;
    };
};
declare const _default: React.MemoExoticComponent<({ next, ...rest }: IProp) => JSX.Element>;
export default _default;
