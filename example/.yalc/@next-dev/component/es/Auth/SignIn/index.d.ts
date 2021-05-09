import React, { ReactNode } from 'react';
import { FormProps, FormItemProps } from 'antd/lib/form';
import { NextButtonProps } from '../../NextButton/type';
import { InputProps } from 'antd/lib/input';
import { ColProps } from 'antd/lib/col';
interface IProp extends FormProps {
    next?: {
        logoWith?: number | string;
        emailItemProps?: FormItemProps;
        passwordItemProps?: FormItemProps;
        logo?: any;
        alt?: string;
        title?: string;
        submitBtnProps?: NextButtonProps;
        isHideSubmitBtn?: boolean;
        customFooter?: ReactNode;
        emailInputProps?: InputProps;
        titleAlign?: any;
        forgotPassPath?: string;
        registerPath?: string;
        colProps?: ColProps;
        isWithoutEmail?: boolean;
        isHasRemember?: boolean;
        showRegister?: boolean;
        verifyLink?: string;
    };
}
declare const NextSignIn: React.MemoExoticComponent<({ next, ...rest }: IProp) => JSX.Element>;
export default NextSignIn;
