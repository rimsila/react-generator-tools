import NextTable from '@/components/NextTable';
import { getOnlyValue } from '@/utils/arrObj';
import { ClearOutlined, EditOutlined, LeftOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import type { ProTableProps } from '@ant-design/pro-table';
import type { ProSchemaComponentTypes } from '@ant-design/pro-utils';
import { NextButton } from '@next-dev/component/es/NextButton';
import { Button, FormInstance, Space, Tabs } from 'antd';
import React, { memo } from 'react';
import { useNextTable } from './hook';

/**
 * @Global Crud table do not modify it plz ask the component owner
 */

type ITableState = {
  isDelete?: boolean;
  add?: boolean;
  edit?: boolean;
  view?: boolean;
  record?: Record<any, any>;
  type?: ProSchemaComponentTypes;
};

export type ITableList<T = Record<string, any>, U = Record<string, any>, ValueType = 'text'> = {
  colMap?: any;
  form?: FormInstance;
  operation?: any;
  loadingSubmit?: boolean;
  state: ITableState;
  setMode: (v?: ITableState) => void;
  setColMap: (v?: Record<any, any>) => void;
  tabTitleList: string;
  tabTitleCrud: string;
} & ProTableProps<T, U, ValueType>;

function TableListCrud<T = Record<string, any>, U = Record<string, any>, ValueType = 'text'>(
  props: ITableList<T, U, ValueType>,
) {
  const {
    state = {},
    operation,
    setColMap = () => null,
    setMode = () => null,
    tabTitleList,
    tabTitleCrud,
    loadingSubmit,
    ...rest
  } = props;

  const { getCommonTableField } = useNextTable();

  const setCommon = (record?: any) => {
    state.edit = false;
    state.type = 'form';
    rest?.form?.setFieldsValue(record);
  };
  const setFalseAddEdit = (record?: any) => {
    setCommon(record);
    state.add = false;
  };

  const setFalseEditView = (record?: any) => {
    state.view = false;
    setCommon(record);
  };

  return (
    <>
      <Tabs
        activeKey={state?.type}
        onChange={(e: ITableList['type']) => {
          if (!state.edit || !state.view) {
            rest?.form?.resetFields();
          }
          if (e === 'table') {
            state.add = true;
            state.edit = false;
            state.view = false;
          }
          state.type = e;
        }}
      >
        <Tabs.TabPane tab={tabTitleList} key="table" />
        {<Tabs.TabPane tab={tabTitleCrud} key="form" />}
      </Tabs>
      {['table', 'form'].includes(state?.type) && (
        <>
          {/* @ts-ignore */}
          <NextTable
            {...{
              ...rest,
              columns: getCommonTableField({
                operation,
                columnsData: rest?.columns as any,
                onClickDelete: (record) => {
                  state.isDelete = true;
                  setMode({ record });
                },
                onClickEdit: (record) => {
                  setFalseAddEdit(record);
                  state.view = false;
                  state.edit = true;
                },
                onClickView: (record) => {
                  setFalseAddEdit(record);
                  state.view = true;
                },
                disabled: state.view && state?.type === 'form',
              }),
              onColumnsStateChange: (v: any) => {
                setColMap(v);
              },
              type: state?.type,
              beforeSearchSubmit: (v = {}) => {
                if (state?.type === 'table') {
                  const getValue = getOnlyValue(v);
                  rest?.beforeSearchSubmit(getValue);
                }
              },
              onSubmit: (v: any) => {
                if (state.type === 'form') {
                  rest?.onSubmit(v);
                }
              },

              search: {
                labelWidth: 'auto',
                ...rest?.search,
              },
              form:
                state?.type === 'form'
                  ? {
                      form: rest?.form,
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
                                onClick={() => {
                                  setFalseEditView();
                                  state.add = true;
                                  state.type = 'table';
                                }}
                              >
                                Back
                              </NextButton>
                              {state.view && (
                                <NextButton
                                  icon={<EditOutlined />}
                                  type="link"
                                  onClick={() => {
                                    state.view = false;
                                    state.edit = true;
                                  }}
                                >
                                  Edit Now
                                </NextButton>
                              )}

                              {!state.view && (
                                <>
                                  {!state.edit && (
                                    <NextButton
                                      icon={<ClearOutlined style={{ color: '#edad2d' }} />}
                                      onClick={() => rest?.form?.resetFields()}
                                    >
                                      Reset
                                    </NextButton>
                                  )}
                                  <NextButton
                                    {...{
                                      type: 'primary',
                                      htmlType: 'submit',
                                      icon: loadingSubmit ? null : <SaveOutlined />,
                                      loading: loadingSubmit,
                                    }}
                                  >
                                    Submit
                                  </NextButton>
                                </>
                              )}
                            </Space>
                          );
                        },
                        ...rest?.form?.submitter,
                      },
                    }
                  : {},
              toolBarRender: () => [
                <Button
                  key="button"
                  icon={<PlusOutlined />}
                  type="primary"
                  onClick={() => {
                    setFalseEditView();
                    state.add = true;
                  }}
                >
                  Add
                </Button>,
              ],
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
