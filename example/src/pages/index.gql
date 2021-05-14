import { ITableList } from '@/components/TableForm/TableListCrud';
import { API } from '@/graphQl/API';
import { useCreateLoveMutation, useDeleteLoveMutation, useLoveQuery, useUpdateLoveMutation } from '@/graphQl/hooks';
import { LoveFilter } from '@/graphQl/schemas';
import { ProSchemaComponentTypes } from '@ant-design/pro-utils';
import { useCreation } from 'ahooks';
import { useLocalStorageState, useLockFn, usePersistFn, useReactive } from 'ahooks/es';
import { Form, message } from 'antd';
import { omit } from 'lodash';
import isEmpty from 'lodash/isEmpty';

type IState = Partial<{
  isDelete: boolean;
  add: boolean;
  edit: boolean;
  view: boolean;
  record: API.Love;
  type: ProSchemaComponentTypes;
  id: string;
  input: API.UpdateLove;
}>;

export const useHook = () => {
  const [form] = Form.useForm();
  const filterValue = useReactive<{ filter: LoveFilter }>({});
  const state = useReactive<IState>({
    type: 'table',
    add: true,
  });

  const { type } = state;
  const isModifyMode = type === 'form';
  const [columnsStateMap, setColMap] = useLocalStorageState('love', {});
  const resetForm = () => form.resetFields();

  const defaultPaging = {
    limit: 10,
    page: 10,
  };
  const { data: dataLove, loading: loadingTable } = useLoveQuery({
    variables: {
      filter: {
        ...filterValue.filter,
      },
    },
  });

  const [deleteLoveMutation, { loading: loadingDeleteLove }] = useDeleteLoveMutation({
    onCompleted: () => {
      message.success('Deleted Successfully!');
      state.type = 'table';
    },
  });
  const [updateLoveMutation, { loading: loadingUpdateLove }] = useUpdateLoveMutation({
    onCompleted: () => {
      message.success('Update Successfully!');
      state.type = 'table';
    },
  });
  const [createLoveMutation, { loading: loadingCreateLove }] = useCreateLoveMutation({
    onCompleted: () => {
      // console.log('res', res);
      message.success('Created Successfully!');
      resetForm();
    },
  });

  /**
   * crud mode
   */
  const setMode = usePersistFn(({ record }: IState) => {
    if (state.isDelete) {
      console.log('calla api delete', record);
      deleteLoveMutation({ variables: { id: record?.id } });
    }
  });

  const dataSource = dataLove?.love?.data;

  const pageName = 'Love';
  const tabTitleCrud = useCreation(() => (state.edit && 'Edit') || (state.view && 'View') || (state.add && 'Add'), [
    state?.view,
    state?.edit,
    state?.add,
  ]);

  /**
   * all custom props here
   */
  const customProps = {
    setColMap,
    setMode,
    loadingSubmit: loadingUpdateLove || loadingCreateLove,
    isModifyMode,
    state,
    tabTitleList: 'List ' + pageName,
    tabTitleCrud: tabTitleCrud + ' ' + pageName,
    pageName,
  };

  return {
    ...customProps,
    dataSource,
    columnsStateMap,
    form,
    loading: loadingTable || loadingDeleteLove,
    options: {
      // search: {
      //   type: 'search',
      //   onSearch: (v) => {
      //     console.log('search', v);
      //   },
      // },
      reload: () => {
        filterValue.filter = { metadata: defaultPaging };
      },
    },
    onSubmit: usePersistFn(
      useLockFn(async (record: API.LoveType) => {
        // console.log('submit', record);
        if (!isEmpty(record)) {
          const input = omit(record, 'id');
          if (state.edit) {
            await updateLoveMutation({ variables: { input, id: record?.id } });
          }
          if (state.add) {
            console.log('add', record);
            await createLoveMutation({ variables: record });
          }
        }
      }),
    ),
    beforeSearchSubmit: (params?: any) => {
      console.log('ss', params);
      if (!isEmpty(params)) {
        filterValue.filter = {
          ...filterValue,
          metadata: {
            limit: params?.pageSize,
            page: params?.current,
          },
        };
      }
    },
    onChange: pagination => {
      const { pageSize, current } = pagination;
      // console.log('dd', pagination);
      filterValue.filter = {
        ...filterValue.filter,
        metadata: {
          limit: pageSize,
          page: current,
        },
      };
    },
  } as ITableList & typeof customProps;
};
