import NextTable from '@/components/NextTable';
import { ClearOutlined, LeftOutlined, PlusOutlined } from '@ant-design/icons';
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
    actionRef,
    setColMap = () => null,
    setMode = () => null,
    tabTitleList,
    tabTitleCrud,
    ...rest
  } = props;

  const { getCommonTableField } = useNextTable();

  return (
    <>
      <Tabs
        activeKey={state?.type}
        onChange={(e: ITableList['type']) => {
          if (!state.edit && !state.view) {
            rest?.form?.resetFields();
          }
          if (e === 'table') {
            state.view = false;
            state.edit = false;
            state.add = false;
          }
          state.type = e;
        }}
      >
        <Tabs.TabPane tab={tabTitleList} key="table" />
        {<Tabs.TabPane tab={tabTitleCrud} key="form" />}
      </Tabs>
      {['table', 'form'].includes(state?.type) && (
        <>
          <NextTable
            {...({
              ...rest,
              columns: getCommonTableField({
                operation,
                columnsData: rest?.columns as any,
                onClickDelete: (record) => setMode({ isDelete: true, record }),
                onClickEdit: (record) => setMode({ edit: true, record }),
                onClickView: (record) => setMode({ view: true, record }),
                disabled: state.view && state?.type === 'form',
              }),
              onColumnsStateChange: (v: any) => {
                setColMap(v);
              },
              type: state?.type,
              beforeSearchSubmit: (v: any) => {
                if (state?.type === 'table') {
                  rest?.beforeSearchSubmit(v);
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
                              <NextButton icon={<LeftOutlined />} danger onClick={() => (state.type = 'table')}>
                                Back
                              </NextButton>

                              {!state.view && (
                                <>
                                  {!state.edit && (
                                    <NextButton
                                      icon={<ClearOutlined style={{ color: '#edad2d' }} />}
                                      //@ts-ignore
                                      onClick={() => actionRef?.current?.reset()}
                                    >
                                      Reset
                                    </NextButton>
                                  )}
                                  <NextButton
                                    {...{
                                      type: 'primary',
                                      htmlType: 'submit',
                                      // icon: loadingAdd ? null : <SaveOutlined />,
                                      // loading: rest?.loading,
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
                <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => setMode({ add: true })}>
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
            } as any)}
          />
        </>
      )}
    </>
  );
}

export default memo(TableListCrud);
