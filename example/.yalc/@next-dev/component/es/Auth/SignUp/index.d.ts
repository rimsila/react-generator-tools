import { FormProps } from 'antd/lib/form';
import { ColProps } from 'antd/lib/col';
import { NextButtonProps } from '../../NextButton/type';
interface IProp extends FormProps {
    next?: {
        logo?: any;
        alt?: string;
        title?: string;
        titleAlign?: any;
        isHasSocial?: boolean;
        colProps?: ColProps;
        signUpBtnProps?: NextButtonProps;
        passwordFiled?: boolean;
        confirmPasswordFiled?: boolean;
        firstNameField?: boolean;
        lastNameField?: boolean;
        userNameField?: boolean;
        emailFiled?: boolean;
        emailFiledType?: 'string' | 'email';
        genderField?: boolean;
        phoneCodeFiled?: boolean;
        rememberField?: boolean;
        loginLink?: string;
        showLogo?: boolean;
    };
}
declare const NextSignUp: ({ next, ...rest }: IProp) => JSX.Element;
export default NextSignUp;
