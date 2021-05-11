import { FormLayout } from '@/components/NextLayout';
import TableListCrud from '@/components/TableForm/TableListCrud';
import { API } from '@/graphQl/API';
import { usePostsQuery } from '@/graphQl/hooks';
import { PageQueryOptions } from '@/graphQl/schemas';
import { ActionType, ProColumns } from '@ant-design/pro-table';
import type { ProSchemaComponentTypes } from '@ant-design/pro-utils';
import { useCreation } from 'ahooks';
import { useLocalStorageState, usePersistFn, useReactive } from 'ahooks/es';
import { Form } from 'antd';
import { isEmpty } from 'lodash';
import React, { useRef } from 'react';

export default () => {
  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm();

  type IState = {
    isDelete?: boolean;
    add?: boolean;
    edit?: boolean;
    view?: boolean;
    isShowAdd?: boolean;
    record?: Record<any, any>;
    type?: ProSchemaComponentTypes;
  };

  const filterValue = useReactive<{ options?: PageQueryOptions }>({});
  const state = useReactive<IState>({
    type: 'table',
  });

  const { type } = state;
  const isModifyMode = type === 'form';
  const [columnsStateMap, setColMap] = useLocalStorageState('book', {});

  const setMode = usePersistFn(({ isDelete, view, record, add, edit }: IState) => {
    const reset = () => form.resetFields();

    // console.log('mode', mode);
    if (isDelete) {
      console.log('calla api delete', record);
    }
    if (edit || view) {
      state.edit = edit;
      state.view = view;

      form.setFieldsValue({
        ...record,
      });
      state.type = 'form';
    }
    if (add) {
      add = true;
      state.type = 'form';
      reset();
    }
  });

  const { data: dataPosts, loading: loadingTable } = usePostsQuery({
    variables: {
      options: {
        ...filterValue.options,
      },
    },
  });
  const dataSource = dataPosts?.posts?.data as any;

  const onSubmit = usePersistFn(async (params: any) => {
    console.log('submit', params);
  });

  const beforeSearchSubmit = (params?: any) => {
    if (type === 'table') {
      console.log('ss', params);

      if (!isEmpty(params)) {
        filterValue.options = {
          ...filterValue.options,
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
    }
  };

  console.log('data', state.view);

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
      dataIndex: '__typename',
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

  const pageName = 'Book';
  const tabTitleCrud = useCreation(() => (state.edit && 'Edit') || (state.view && 'View') || ' Add', [
    state?.view,
    state?.edit,
    state?.add,
  ]);

  //* ------------------ return data ------------------------
  return (
    <FormLayout style={{ maxWidth: '90%', margin: 'auto' }}>
      <TableListCrud
        {...{
          form,
          onSubmit,
          columns,
          loading: loadingTable,
          setColMap,
          columnsStateMap,
          setMode,
          state,
          tabTitleList: 'List ' + pageName,
          tabTitleCrud: tabTitleCrud + ' ' + pageName,
          actionRef,
          beforeSearchSubmit,
          dataSource,
          onChange: (pagination) => {
            const { pageSize, current } = pagination;
            // console.log('dd', pagination);
            filterValue.options = {
              ...filterValue.options,
              paginate: {
                limit: pageSize,
                page: current,
              },
            };
          },
        }}
      />
    </FormLayout>
  );
};
