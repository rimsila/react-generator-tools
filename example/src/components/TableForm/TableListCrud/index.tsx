import { ClearOutlined, FileAddOutlined, LeftOutlined, SaveOutlined } from '@ant-design/icons';
import type { ProTableProps } from '@ant-design/pro-table';
import { SearchConfig } from '@ant-design/pro-table/lib/components/Form/FormRender';
import { NextButton } from '@next-dev/component/es/NextButton';
import { useDebounceFn, useLocalStorageState, usePersistFn } from 'ahooks/es';
import type { FormInstance } from 'antd';
import { Space, Tabs } from 'antd';
import React, { memo, useState } from 'react';
import NextTable from '@/components/NextTable';
import type { IUserForm } from './CrudForm';
import CrudForm from './CrudForm';
import { useNextTable } from './hook';

/**
 * @Global Crud table do not modify it plz ask the component owner
 */

export type ITableList<T = Record<string, any>, U = Record<string, any>, ValueType = 'text'> = {
  title?: string;
  tabListName: string;
  tabFormName: string;
  isAddSchema?: boolean;
  refresh?: () => void;
  restCrudForm?: Partial<IUserForm>;
  model?: {
    setAdd: (arg0?: boolean) => void;
    setEdit: (arg0: boolean, arg1?: any) => void;
    setViewMode: (arg0: boolean) => void;
    setVisibleModal: () => void;
    onSubmit: (param?: any, isForm?: boolean) => any;
    beforeSearchSubmit: (arg0: Partial<Record<string, any>>) => any;
    visibleModal: boolean | undefined;
    visiblePopDel: any;
    isEditMode: boolean;
    isViewMode: boolean;
    isModalMode?: boolean;
    isAddMode?: boolean;
    isShowAdd?: boolean;
    onClickDelete: (v?: any) => void;
    isHideView?: boolean;
    type?: 'form' | 'table' | undefined;
    setType?: (v?: 'form' | 'table' | undefined) => void;
  };
  dataSource?: any[];
  columns?: any[];
  loadingTable?: boolean;
  loadingDel?: boolean;
  loadingAdd?: boolean;
  loadingEdit?: boolean;
  form?: FormInstance;
  search?: SearchConfig;
  operation?: any;
} & ProTableProps<T, U, ValueType>;

function TableListCrud<T = Record<string, any>, U = Record<string, any>, ValueType = 'text'>(
  props: ITableList<T, U, ValueType>,
) {
  const {
    title,
    restCrudForm,
    model,
    dataSource,
    columns,
    loadingTable,
    form,
    tabListName = '',
    tabFormName = 'Form',
    search,
    loadingDel,
    loadingAdd,
    loadingEdit,
    refresh,
    operation,
    ...rest
  } = props;
  const {
    isViewMode,
    setViewMode,
    setEdit,
    isEditMode,
    onClickDelete,
    isHideView = true,
    isShowAdd,
    type,
    setType,
  } = model || {};

  const { getCommonTableField } = useNextTable();
  const [loading, setLoading] = useState(false);
  const [colMap, setColMap] = useLocalStorageState('column', {});

  const { run: runSetLoading } = useDebounceFn(
    (isTable) => {
      if (setType) {
        setType(isTable as any);
      }
      if (type === 'form' && setViewMode && setEdit) {
        setViewMode(false);
        setEdit(false);
        form?.resetFields();
      }
      setLoading(false);
      if (type === 'form' && setViewMode && isViewMode) {
        setViewMode(false);
      }
      if (isTable === 'form' && !isEditMode && !isViewMode) {
        form?.resetFields();
        model?.setAdd(true);
      } else {
        model?.setAdd(false);
      }
    },
    {
      wait: 0,
    },
  );

  const onRunSetLoading = (isTable: any) => {
    setLoading(true);
    runSetLoading(isTable);
  };

  //* ----------- onClickEdit ----------
  const onClickEdit = usePersistFn((record?: any, isEdit: boolean = false) => {
    if (isEdit) {
      form?.setFieldsValue(record);
      // console.log('record', record);
      model?.setEdit(isEdit, record);
      model?.setViewMode(false);
    } else {
      form?.resetFields();
      model?.setEdit(false);
      model?.setViewMode(false);
    }
    if (model?.isModalMode) {
      model?.setVisibleModal();
    } else {
      onRunSetLoading('form');
    }
  });

  //* ----------- onClickView ----------
  const onClickView = usePersistFn((record?: any, isView: boolean = false) => {
    form?.setFieldsValue(record);
    // console.log('record', record);
    model?.setEdit(true);
    model?.setViewMode(isView);
    if (model?.isModalMode) {
      model?.setVisibleModal();
    } else {
      onRunSetLoading('form');
    }
  });

  // const duplicate = duplicateArrFn(columns?.length > 0 ? columns : [], 'dataIndex');
  return (
    <>
      <Tabs
        activeKey={type}
        onChange={(e: any) => {
          onRunSetLoading(e);
        }}
      >
        <Tabs.TabPane tab={tabListName} key="table" />
        {(isShowAdd || isEditMode) && <Tabs.TabPane tab={tabFormName} key="form" />}
      </Tabs>
      {['table', 'form'].includes(type as any) && (
        <>
          {/* {!loading || !loadingTable ? (
            <SkeletonList />
          ) : ( */}
          {/*  @ts-ignore */}
          <NextTable
            {...{
              options: {
                reload: () => refresh && refresh(),
              },
              form:
                type === 'form'
                  ? {
                      form,
                      submitter: {
                        render: () => {
                          return (
                            <Space
                              style={{
                                display: 'flex',
                              }}
                            >
                              <NextButton
                                icon={<LeftOutlined />}
                                danger
                                onClick={() => onRunSetLoading('table')}
                              >
                                Back
                              </NextButton>

                              {!isViewMode && (
                                <>
                                  {!isEditMode && (
                                    <NextButton
                                      icon={<ClearOutlined style={{ color: '#edad2d' }} />}
                                      onClick={() => form?.resetFields()}
                                    >
                                      Reset
                                    </NextButton>
                                  )}
                                  <NextButton
                                    {...{
                                      type: 'primary',
                                      htmlType: 'submit',
                                      icon: loadingAdd ? null : <SaveOutlined />,
                                      loading: loadingAdd || loadingEdit,
                                    }}
                                  >
                                    Submit
                                  </NextButton>
                                </>
                              )}
                            </Space>
                          );
                        },
                      },
                      style: {
                        padding: 24,
                      },
                    }
                  : {},
              onSubmit: (params) => {
                //* --- submit for add and edit -----------
                if (type === 'form') {
                  model?.onSubmit(params);
                }
              },

              search: !search
                ? false
                : {
                    ...(search as any),
                    filterType:
                      type === 'table' && search?.filterType === 'light' ? 'light' : 'query',
                  },
              type,
              loading: loadingDel || loading || loadingTable,
              columns: getCommonTableField({
                operation,
                columnsData: columns,
                onClickDelete: model?.onClickDelete,
                onClickEdit,
                onClickView: isHideView ? (false as any) : onClickView,
                disabled: model?.isViewMode,
              }),

              onColumnsStateChange: (v: any) => {
                setColMap(v);
              },

              columnsStateMap: colMap,
              dataSource,

              //* --- submit for filter mode -----------

              beforeSearchSubmit: (params) => model?.beforeSearchSubmit(params),

              toolBarRender: () =>
                model?.isModalMode
                  ? [
                      <CrudForm
                        key="Form"
                        {...{
                          ...restCrudForm,
                          form,
                          isViewMode: model?.isViewMode,
                          visible: model?.visibleModal,
                          modalProps: {
                            onCancel: onClickEdit,
                            title,
                          },
                          onFinish: model?.onSubmit,
                          triggerProps: {
                            onClick: onClickEdit,
                          },

                          tableFieldName: () =>
                            getCommonTableField({
                              columnsData: columns,
                              onClickDelete,
                              onClickEdit,
                              onClickView,
                            }),
                        }}
                      />,
                    ]
                  : isShowAdd
                  ? [
                      <NextButton
                        key="add"
                        type="primary"
                        icon={<FileAddOutlined />}
                        onClick={() => {
                          onRunSetLoading('form');
                          model?.setAdd(true);
                        }}
                      >
                        Add
                      </NextButton>,
                    ]
                  : [],
              ...rest,

              pagination:
                rest?.pagination === false
                  ? false
                  : {
                      defaultPageSize: 10,
                      showQuickJumper: true,
                      ...rest?.pagination,
                    },
            }}
          />
        </>
      )}
    </>
  );
}

export default memo(TableListCrud);
