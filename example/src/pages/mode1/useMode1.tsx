import { ITableList } from '@/components/TableForm/TableListCrud';
import { ISuccessAction, successAction } from '@/components/TableForm/TableListCrud/successAction';
import { ICrudState } from '@/components/TableForm/TableListCrud/TableCrud';
import { API } from '@/graphQl/API';
import {
  useCreateMode1Mutation,
  useDeleteMode1sMutation,
  useGetMode1sQuery,
  useUpdateMode1sMutation,
} from '@/graphQl/hooks';
import { getOnlyValue } from '@/utils/arrObj';
import { PageInfo } from '@ant-design/pro-table/lib/typing';
import { useCreation } from 'ahooks';
import { useLocalStorageState, usePersistFn, useReactive } from 'ahooks/es';
import { Form } from 'antd';
import isEmpty from 'lodash/isEmpty';
/**
 * ----------------------- Interface ----------------------
 */
export type IMode1Type = {
  filter: API.GetMode1sQueryVariables['filter'];
  mode1Input: API.CreateMode1MutationVariables['input'];
  mode1Update: API.UpdateMode1sMutationVariables['input'];
  mode1Delete: API.DeleteMode1sMutationVariables;
  mode1Record: API.GetMode1sQuery['getMode1s']['records'][0] & { status: any };
  mode1Metadata: API.GetMode1sQuery['getMode1s']['metadata'];
};

type IState = Partial<ICrudState & { record: IMode1Type['mode1Record'] }>;

export const useMode1 = () => {
  /**
   * ----------------------- State and Function ----------------------
   */
  const [form] = Form.useForm();

  const [columnsStateMap, setColMap] = useLocalStorageState('mode1Column', {});

  const defaultFilter: IMode1Type['filter'] = {
    limit: 10,
    page: 1,
  };

  const filterValue = useReactive<{ filter?: IMode1Type['filter'] }>({
    filter: defaultFilter,
  });

  const { filter } = filterValue || {};

  const state = useReactive<IState>({
    type: 'table',
    add: true,
  });

  const { type } = state;
  const isModifyMode = type === 'form';

  const afterSuccessAction = (params?: ISuccessAction) => {
    successAction({ form, state: state as any, refetch: refetchMode1s, ...params });
  };

  /**
   * ----------------------- useGetMode1sQuery ----------------------
   */
  const { data: dataPosts, loading: loadingGetMode1, refetch: refetchMode1s } = useGetMode1sQuery({
    variables: {
      filter,
    },
  });

  /**
   * ----------------------- deletePostMutation ----------------------
   */
  const [deletePostMutation, { loading: loadingDeletePost }] = useDeleteMode1sMutation({
    onCompleted: res => {
      res?.deleteMode1 && afterSuccessAction();
    },
  });
  /**
   * ----------------------- updatePostMutation ----------------------
   */
  const [updatePostMutation, { loading: loadingUpdatePost }] = useUpdateMode1sMutation({
    onCompleted: () => {
      afterSuccessAction();
    },
  });

  /**
   * ----------------------- createPostMutation ----------------------
   */
  const [createPostMutation, { loading: loadingCreatePost }] = useCreateMode1Mutation({
    onCompleted: () => {
      afterSuccessAction();
    },
  });

  /**
   *   ----------------------- Submit Part ----------------------
   */
  const setMode = usePersistFn(({ record }: IState) => {
    if (state.isDelete) {
      deletePostMutation({ variables: { id: record?.id } });
    }
  });

  /**
   * ----------------------- Return State& Props ----------------------
   */
  const dataSource = dataPosts?.getMode1s?.records;

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
    isModifyMode,
    state,
    tabTitleList: 'List ' + pageName,
    tabTitleCrud: tabTitleCrud + ' ' + pageName,
    pageName,
    loadingSubmit: loadingGetMode1 || loadingUpdatePost || loadingCreatePost,
  };

  console.log('lo', loadingGetMode1);

  return {
    ...customProps,
    dataSource,
    columnsStateMap,
    form,
    loading: loadingGetMode1 || loadingDeletePost || state.loadingRefetch,
    options: {
      // search: {
      //   type: 'search',
      //   onSearch: (v) => {
      //     console.log('search', v);
      //   },
      // },
      reload: () => {
        afterSuccessAction({ isReload: true });
      },
    },
    onSubmit: usePersistFn((record: IMode1Type['mode1Record']) => {
      // console.log('submit', record);
      if (!isEmpty(record)) {
        const input = getOnlyValue(record) as typeof record;
        if (state.edit) {
          updatePostMutation({ variables: { input } });
        }
        if (state.add) {
          // console.log('add', record);
          createPostMutation({ variables: { input } });
        }
      }
    }),
    beforeSearchSubmit: (params?: IMode1Type['mode1Record'] & PageInfo) => {
      const newParam = getOnlyValue(params) as typeof params;
      console.log('ss', params);
      if (!isEmpty(params)) {
        filterValue.filter = {
          ...filterValue.filter,
          limit: newParam?.pageSize,
          page: newParam?.current,
          title: newParam?.title,
        };
      }
    },
    onChange: pagination => {
      const { pageSize, current } = pagination;
      // console.log('dd', pagination);
      filterValue.filter = {
        ...filterValue.filter,
        limit: pageSize,
        page: current,
      };
    },
  } as ITableList & typeof customProps;
};
