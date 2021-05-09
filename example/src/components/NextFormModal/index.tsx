import { PlusOutlined } from '@ant-design/icons';
import type { ModalFormProps } from '@ant-design/pro-form';
import { ModalForm } from '@ant-design/pro-form';
import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import type { ReactNode } from 'react';
import { memo } from 'react';

export type INextModal<T = Record<string, any>> = {
  children?: ReactNode;
  triggerBtnName?: string;
  isHasBtn?: boolean;
  triggerProps?: ButtonProps;
} & Partial<ModalFormProps<T>>;

function NextModal<T = Record<string, any>>(props: INextModal<T>) {
  const { children, triggerBtnName = 'Add', triggerProps, isHasBtn, ...rest } = props;
  return (
    <ModalForm
      {...{
        trigger: (
          <>
            {isHasBtn ? (
              <Button type="primary" {...triggerProps}>
                <PlusOutlined />
                {triggerBtnName}
              </Button>
            ) : null}
          </>
        ),
        ...rest,

        modalProps: {
          style: {
            top: 40,
          },
          width: 736,
          ...rest.modalProps,
        },
      }}
    >
      {rest?.visible && children}
    </ModalForm>
  );
}
export default memo(NextModal);
