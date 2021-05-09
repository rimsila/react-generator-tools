import { FormProps } from 'antd/lib/form';
import { ColProps } from 'antd/lib/col';
interface IProp extends FormProps {
    next?: {
        logo?: string;
        logoWidth?: string;
        colProps?: ColProps;
        titleAlign?: string;
        title?: string;
        type?: 'reset' | 'verify';
        verifyCodeField?: boolean;
        passwordFiled?: boolean;
        confirmPasswordFiled?: boolean;
    };
}
declare const ResetPassword: ({ next, ...rest }: IProp) => JSX.Element;
export default ResetPassword;
