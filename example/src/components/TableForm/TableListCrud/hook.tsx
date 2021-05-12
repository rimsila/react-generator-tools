import type { IActionButton } from '@/components/ActionButton';
import ActionButton from '@/components/ActionButton';
import { toCapitalize } from '@/utils/stringRegex';
import type { ProColumns } from '@ant-design/pro-table';
import type { ProFieldValueType } from '@ant-design/pro-utils';
import { useCreation } from 'ahooks/es';
import React from 'react';

export type INextType = 'href' | 'enumBoolean' | ProFieldValueType;

export type ITableListItem1 = {
  dataIndex: string;
};

export type IColumns = {
  fieldType?: INextType;
  cusTableType?: INextType;
} & ProColumns<ITableListItem1>;

export type ICommonExcludeForm = 'operation';

export const useNextTable = () => {
  const onGetCommonTableField = ({
    columnsData,
    onClickEdit,
    onClickDelete,
    onClickView,
    disabled,
    operation,
  }: {
    columnsData: IColumns[] | undefined;
    onClickEdit?: (record?: any, isEdit?: boolean) => void;
    onClickDelete?: (record?: any, isEdit?: boolean) => void;
    onClickView?: (record?: any, isView?: boolean) => void;
    disabled?: boolean;
    operation?: IActionButton;
  }) => {
    const newArr: any[] = [];

    const lastCommonField: IColumns[] =
      columnsData?.length === 0
        ? [
            {
              title: 'operation',
              key: 'operation1',
              search: false,
              fixed: 'right',
              width: 40,
            },
          ]
        : ([
            {
              title: 'No',
              dataIndex: 'id',
              width: 90,
              valueType: 'text',
              hideInTable: true,
              formItemProps: {
                style: {
                  display: 'none',
                },
              },
            },
            {
              title: 'Operation',
              key: 'operation',
              search: false,
              fixed: 'right',
              width: 50,
              align: 'right',
              hideInForm: true,
              hideInDescriptions: true,
              render: (_: any, record: any) => (
                <ActionButton
                  {...{
                    operation: { ...operation, record },
                    onClickView: onClickView ? () => onClickView && onClickView(record, true) : (false as any),
                    onClickEdit: () => onClickEdit && onClickEdit(record, true),
                    delPopconfirmProps: onClickDelete && {
                      onConfirm: () => onClickDelete && onClickDelete(record),
                    },
                  }}
                />
              ),
            },
          ] as IColumns[]);

    columnsData?.map((i) => {
      const { title } = i || {};
      const typeDf = {
        ...i,
        title: toCapitalize(String(title)),
        fieldProps: {
          disabled,
          ...i?.fieldProps,
        },
      };

      // @ts-ignore
      if (!i?.fieldProps?.disabled) {
        // @ts-ignore
        delete i.fieldProps?.disabled;
      }

      const typeInput = {
        ...typeDf,
      };

      return newArr.push(typeInput);
    });
    return [...newArr, ...lastCommonField];
  };

  const getCommonTableField = useCreation(() => onGetCommonTableField, []);

  return {
    getCommonTableField,
  };
};
