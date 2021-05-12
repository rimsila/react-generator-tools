import { ITableList } from '@/components/TableForm/TableListCrud';
import { API } from '@/graphQl/API';
import { useCreatePostMutation, useDeletePostMutation, usePostsQuery, useUpdatePostMutation } from '@/graphQl/hooks';
import { PageQueryOptions } from '@/graphQl/schemas';
import type { ProSchemaComponentTypes } from '@ant-design/pro-utils';
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
  record: API.Post;
  type: ProSchemaComponentTypes;
  id: string;
  input: API.UpdatePostInput;
}>;

export const useIndex = () => {
  const [form] = Form.useForm();
  const filterValue = useReactive<{ options?: PageQueryOptions }>({});
  const state = useReactive<IState>({
    type: 'table',
    add: true,
  });

  const { type } = state;
  const isModifyMode = type === 'form';
  const [columnsStateMap, setColMap] = useLocalStorageState('book', {});
  const resetForm = () => form.resetFields();

  const defaultPaging = {
    limit: 10,
    page: 10,
  };
  const { data: dataPosts, loading: loadingTable } = usePostsQuery({
    variables: {
      options: {
        ...filterValue.options,
      },
    },
  });

  const [deletePostMutation, { loading: loadingDeletePost }] = useDeletePostMutation({
    onCompleted: () => {
      message.success('Deleted Successfully!');
      state.type = 'table';
    },
  });
  const [updatePostMutation, { loading: loadingUpdatePost }] = useUpdatePostMutation({
    onCompleted: () => {
      message.success('Update Successfully!');
      state.type = 'table';
    },
  });
  const [createPostMutation, { loading: loadingCreatePost }] = useCreatePostMutation({
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
      deletePostMutation({ variables: { id: record?.id } });
    }
  });

  const dataSource = dataPosts?.posts?.data;

  const pageName = 'Book';
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
    loadingSubmit: loadingUpdatePost || loadingCreatePost,
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
    loading: loadingTable || loadingDeletePost,
    options: {
      // search: {
      //   type: 'search',
      //   onSearch: (v) => {
      //     console.log('search', v);
      //   },
      // },
      reload: () => {
        filterValue.options = { paginate: defaultPaging };
      },
    },
    onSubmit: usePersistFn(
      useLockFn(async (record: API.Post) => {
        // console.log('submit', record);
        if (!isEmpty(record)) {
          const input = omit(record, 'id');
          if (state.edit) {
            await updatePostMutation({ variables: { input, id: record?.id } });
          }
          if (state.add) {
            console.log('add', record);
            await createPostMutation({ variables: record });
          }
        }
      }),
    ),
    beforeSearchSubmit: (params?: any) => {
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
      }
    },
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
  } as ITableList & typeof customProps;
};
