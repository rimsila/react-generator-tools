import { ITableList } from '@/components/TableForm/TableListCrud';
import { ISuccessAction, successAction } from '@/components/TableForm/TableListCrud/successAction';
import { ICrudState } from '@/components/TableForm/TableListCrud/TableCrud';
import { API } from '@/graphQl/API';
import {
  useCreateModeMutation,
  useDeleteModesMutation,
  useGetModesQuery,
  useUpdateModesMutation,
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
export type IModeType = {
  filter: API.GetModesQueryVariables['filter'];
  modeInput: API.CreateModeMutationVariables['input'];
  modeUpdate: API.UpdateModesMutationVariables['input'];
  modeDelete: API.DeleteModesMutationVariables;
  modeRecord: API.GetModesQuery['getModes']['records'][0] & { status: any };
  modeMetadata: API.GetModesQuery['getModes']['metadata'];
};

type IState = Partial<ICrudState & { record: IModeType['modeRecord'] }>;

export const useMode = () => {
  /**
   * ----------------------- State and Function ----------------------
   */
  const [form] = Form.useForm();

  const [columnsStateMap, setColMap] = useLocalStorageState('modeColumn', {});

  const defaultFilter: IModeType['filter'] = {
    limit: 10,
    page: 1,
  };

  const filterValue = useReactive<{ filter?: IModeType['filter'] }>({
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
    successAction({ form, state: state as any, refetch: refetchModes, ...params });
  };

  /**
   * ----------------------- useGetModesQuery ----------------------
   */
  const { data: dataPosts, loading: loadingGetMode, refetch: refetchModes } = useGetModesQuery({
    variables: {
      filter,
    },
  });

  /**
   * ----------------------- deletePostMutation ----------------------
   */
  const [deletePostMutation, { loading: loadingDeletePost }] = useDeleteModesMutation({
    onCompleted: res => {
      res?.deleteMode && afterSuccessAction();
    },
  });
  /**
   * ----------------------- updatePostMutation ----------------------
   */
  const [updatePostMutation, { loading: loadingUpdatePost }] = useUpdateModesMutation({
    onCompleted: () => {
      afterSuccessAction();
    },
  });

  /**
   * ----------------------- createPostMutation ----------------------
   */
  const [createPostMutation, { loading: loadingCreatePost }] = useCreateModeMutation({
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
  const dataSource = dataPosts?.getModes?.records;

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
    loadingSubmit: loadingGetMode || loadingUpdatePost || loadingCreatePost,
  };

  console.log('lo', loadingGetMode);

  return {
    ...customProps,
    dataSource,
    columnsStateMap,
    form,
    loading: loadingGetMode || loadingDeletePost || state.loadingRefetch,
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
    onSubmit: usePersistFn((record: IModeType['modeRecord']) => {
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
    beforeSearchSubmit: (params?: IModeType['modeRecord'] & PageInfo) => {
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
