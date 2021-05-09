import ProForm, { ProFormDatePicker, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import type { ProFormItemProps } from '@ant-design/pro-form/lib/interface';
import type { ProColumns } from '@ant-design/pro-table';
import type { ProFieldValueType } from '@ant-design/pro-utils';
import { useCreation } from 'ahooks/es';
import { Empty } from 'antd';
import type { ReactNode } from 'react';
import React, { Fragment, memo } from 'react';
import type { INextModal } from '@/components/NextFormModal';
import NextModal from '@/components/NextFormModal';
import type { IColumns, ICommonExcludeForm, INextType } from '../hook';
import css from './index.less';

type ITableListItem1 = {
  dataIndex: string;
  nextType?: INextType;
  title?: string;
  valueType?: ProFieldValueType;
};

export type ICommonTableField = ProColumns<ITableListItem1>;

export type IUserForm = {
  tableFieldName: () => IColumns[];
  isViewMode?: boolean;
} & Partial<INextModal>;

export type ICommonProps = ITableListItem1 & ProFormItemProps;

export const ModalForm = memo((props: IUserForm) => {
  const { tableFieldName, isViewMode } = props || {};

  const excludeFields = () => tableFieldName()?.filter((i) => i.dataIndex);

  const getFinalFields = useCreation(() => excludeFields, []);

  return (
    <>
      <div className={css.arr_form_group}>
        <ProForm.Group>
          {getFinalFields()?.map((v: IColumns, i) => {
            const { title, dataIndex } = v || {};

            v.dataIndex = (v.dataIndex as ICommonExcludeForm) === 'operation' ? '' : v.dataIndex;

            const renderFields = () => {
              const commonProps = {
                name: dataIndex,
                label: title,
                disabled: isViewMode,
                placeholder: `Please enter a ${title?.toString().toLocaleLowerCase()}`,
                ...v,
                // width: getCountLength === 1 ? 'xl' : getCountLength === 2 ? 'md' : 'md',
              } as ICommonProps;

              switch (v?.valueType) {
                case 'select':
                  return (
                    <ProFormSelect
                      {...{
                        showSearch: true,
                        ...commonProps,
                      }}
                    />
                  );
                case 'date':
                  return (
                    <ProFormDatePicker
                      {...{
                        // initialValue: moment(new Date(), dateFormat),
                        ...commonProps,
                      }}
                    />
                  );

                default:
                  return (
                    <ProFormText
                      {...{
                        ...commonProps,
                      }}
                    />
                  );
              }
            };
            return <Fragment key={String(i)}>{renderFields()}</Fragment>;
          })}
        </ProForm.Group>
      </div>
    </>
  );
});

export default (props: IUserForm & { newModalChildren?: ReactNode; isAddSchema?: boolean }) => {
  const { tableFieldName, visible, newModalChildren, isViewMode, ...rest } = props;

  return (
    // @ts-ignore
    <NextModal {...{ visible, ...rest }}>
      {newModalChildren ||
        (tableFieldName && tableFieldName()?.length > 0 ? (
          <ModalForm {...{ tableFieldName, isViewMode }} />
        ) : (
          <Empty />
        ))}
    </NextModal>
  );
};
