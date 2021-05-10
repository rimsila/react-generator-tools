import { usePersistFn, useReactive } from 'ahooks/es';
import { Button, Form, Space, Tabs } from 'antd';
import React, { useRef } from 'react';
import { FormLayout } from '@/components/NextLayout';
import { usePostsQuery } from '@/graphQl/hooks';
import { PageQueryOptions } from '@/graphQl/schemas';
import { isEmpty } from 'lodash';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { API } from '@/graphQl/API';
import { ClearOutlined, LeftOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProSchemaComponentTypes } from '@ant-design/pro-utils';
import { NextButton } from '@next-dev/component/es/NextButton';
import { IFormMode, setFormMode } from '@/utils/form';
import NextTable from '@/components/NextTable';
import ProDescriptions from '@ant-design/pro-descriptions';

export default () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();

  const filterValue = useReactive<{ options?: PageQueryOptions }>({});
  const state = useReactive<{
    mode?: { add?: boolean; edit?: boolean; view?: boolean; isShowAdd?: boolean };
    type: ProSchemaComponentTypes;
  }>({
    type: 'table',
  });
  const { mode = {}, type } = state;
  const isModifyMode = type === 'form';
  const setMode = (mode: typeof state.mode) => {
    const reset = () => form.resetFields();

    if (mode.view) {
      form.setFieldsValue({
        title: 'ss',
      });
      state.type = 'descriptions';
    }
    if (mode.edit) {
      form.setFieldsValue({
        title: 'ss',
      });
      state.type = 'form';
    }
    if (mode.add) {
      state.type = 'form';
      reset();
    }
  };

  const { data: dataPosts, loading: loadingTable } = usePostsQuery({
    variables: {
      options: {
        ...filterValue.options,
      },
    },
  });
  const dataSource = dataPosts?.posts?.data as any;

  //* ------------------ Submit part ------------------------
  const onClickDelete = usePersistFn((v) => {
    if (v?.id) {
      // runDelJob(v?.id);
    }

    console.log('delete', v);
  });

  const onSubmit = usePersistFn(async (params: any) => {});

  const beforeSearchSubmit = (params?: any) => {
    console.log('ss', params);

    if (!isEmpty(params)) {
      filterValue.options = {
        paginate: {
          limit: params?.pageSize,
          page: params?.current,
        },
        search: {
          q: params?.title,
        },
      };
      // }
    }
  };

  console.log('data', dataSource);

  //* ------------------ columns data ------------------------

  const columns: ProColumns<API.Post>[] = [
    {
      title: 'No',
      dataIndex: 'id',
      width: 90,
      valueType: 'index',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: 150,
      valueType: 'text',
      formItemProps: {
        style: isModifyMode ? { display: 'inline-block', width: 'calc(50% - 0px)', paddingRight: 10 } : {},
        rules: [
          {
            required: true,
            whitespace: true,
          },
        ],
      },
    },
    {
      title: 'name',
      dataIndex: 'name',
      width: 150,
      valueType: 'text',
      formItemProps: {
        style: isModifyMode ? { display: 'inline-block', width: 'calc(50% - 0px)', paddingRight: 10 } : {},

        rules: [
          {
            required: true,
            whitespace: true,
          },
        ],
      },
    },
  ];

  // console.log('mockData', mockData());

  const getName = () => (mode.edit && 'Edit') || (mode.view && 'View') || ' Add';

  //* ------------------ return data ------------------------
  return (
    <FormLayout style={{ padding: 30 }}>
      <Tabs
        activeKey={type}
        onChange={(e: any) => {
          if (!mode.edit && !mode.view) {
            form.resetFields();
          }
          state.type = e;
        }}
      >
        <Tabs.TabPane tab={getName() + ' Book List'} key="table" />
        {<Tabs.TabPane tab={getName() + ' Book'} key="form" />}
      </Tabs>
      {['table', 'form'].includes(type as any) && (
        <>
          {/* @ts-ignore */}
          <NextTable
            {...{
              actionRef,
              loading: loadingTable,
              type: state?.type,
              beforeSearchSubmit,
              onSubmit,
              columns,
              dataSource,
              search: {
                labelWidth: 'auto',
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
                              <NextButton icon={<LeftOutlined />} danger onClick={() => (state.type = 'table')}>
                                Back
                              </NextButton>

                              {!mode.view && (
                                <>
                                  {!mode.edit && (
                                    <NextButton
                                      icon={<ClearOutlined style={{ color: '#edad2d' }} />}
                                      onClick={() => actionRef.current.reset()}
                                    >
                                      Reset
                                    </NextButton>
                                  )}
                                  <NextButton
                                    {...{
                                      type: 'primary',
                                      htmlType: 'submit',
                                      // icon: loadingAdd ? null : <SaveOutlined />,
                                      loading: loadingTable,
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
                    }
                  : {},
              toolBarRender: () => [
                <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => setMode({ add: true })}>
                  Add
                </Button>,
                <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => setMode({ edit: true })}>
                  edit
                </Button>,
              ],

              onChange: (pagination) => {
                const { pageSize, current } = pagination;
                console.log('dd', pagination);
                filterValue.options = {
                  paginate: {
                    limit: pageSize,
                    page: current,
                  },
                };
              },
              pagination: {
                showQuickJumper: true,
              },
            }}
          />
        </>
      )}

    </FormLayout>
  );
};
