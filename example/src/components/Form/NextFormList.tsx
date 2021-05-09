import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { ProFormListProps } from '@ant-design/pro-form';
import { ProFormList } from '@ant-design/pro-form';
import type { ReactNode } from 'react';
import React from 'react';

export type INextFormList = {
  children: ReactNode;
} & ProFormListProps;

export const NextFormList = (props: INextFormList) => {
  const { children, ...rest } = props;
  return (
    <ProFormList
      {...{
        actionRender: ({ name, key, fieldKey }, { add, remove }) => {
          console.log('fieldKey', key);
          const disabled = fieldKey === 0 && fieldKey < 2;

          return [
            <MinusCircleOutlined
              key={fieldKey}
              onClick={() => (disabled ? null : remove(name))}
              style={{
                fontSize: 18,
                color: disabled ? 'gray' : 'red',
                cursor: disabled ? 'not-allowed' : 'pointer',
              }}
            />,
            <PlusCircleOutlined key={fieldKey} onClick={add} style={{ color: 'green' }} />,
          ];
        },
        ...rest,
      }}
    >
      {children}
    </ProFormList>
  );
};
