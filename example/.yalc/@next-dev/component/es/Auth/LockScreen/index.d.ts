import { FormProps } from 'antd/lib/form';
import { ColProps } from 'antd/lib/grid';
declare type IProp = {
    next: {
        colProps?: ColProps;
    };
} & FormProps;
export declare const defaultProps: {
    next: {
        logoWith: number;
        alt: string;
        title: string;
        logo: string;
    };
};
declare const NextLockScreen: ({ next, ...rest }: IProp) => JSX.Element;
export default NextLockScreen;
