import { ITableList } from '@/components/TableForm/TableListCrud';
import { ISuccessAction, successAction } from '@/components/TableForm/TableListCrud/successAction';
import { ICrudState } from '@/components/TableForm/TableListCrud/TableCrud';
import { API } from '@/graphQl/API';
import { useCreateJobMutation, useDeleteJobsMutation, useGetJobsQuery, useUpdateJobsMutation } from '@/graphQl/hooks';
import { getOnlyValue } from '@/utils/arrObj';
import { PageInfo } from '@ant-design/pro-table/lib/typing';
import { useCreation } from 'ahooks';
import { useLocalStorageState, usePersistFn, useReactive } from 'ahooks/es';
import { Form } from 'antd';
import isEmpty from 'lodash/isEmpty';
/**
 * ----------------------- Interface ----------------------
 */
export type IJobType = {
  filter: API.GetJobsQueryVariables['filter'];
  jobInput: API.CreateJobMutationVariables['input'];
  jobUpdate: API.UpdateJobsMutationVariables['input'];
  jobDelete: API.DeleteJobsMutationVariables;
  jobRecord: API.GetJobsQuery['getJobs']['records'][0] & { status: any };
  jobMetadata: API.GetJobsQuery['getJobs']['metadata'];
};

type IState = Partial<ICrudState & { record: IJobType['jobRecord'] }>;

export const useJob = () => {
  /**
   * ----------------------- State and Function ----------------------
   */
  const [form] = Form.useForm();

  const [columnsStateMap, setColMap] = useLocalStorageState('jobColumn', {});

  const defaultFilter: IJobType['filter'] = {
    limit: 10,
    page: 1,
  };

  const filterValue = useReactive<{ filter?: IJobType['filter'] }>({
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
    successAction({ form, state: state as any, refetch: refetchJobs, ...params });
  };

  /**
   * ----------------------- useGetJobsQuery ----------------------
   */
  const { data: dataPosts, loading: loadingGetJob, refetch: refetchJobs } = useGetJobsQuery({
    variables: {
      filter,
    },
  });

  /**
   * ----------------------- deletePostMutation ----------------------
   */
  const [deletePostMutation, { loading: loadingDeletePost }] = useDeleteJobsMutation({
    onCompleted: res => {
      res?.deleteJob && afterSuccessAction();
    },
  });
  /**
   * ----------------------- updatePostMutation ----------------------
   */
  const [updatePostMutation, { loading: loadingUpdatePost }] = useUpdateJobsMutation({
    onCompleted: () => {
      afterSuccessAction();
    },
  });

  /**
   * ----------------------- createPostMutation ----------------------
   */
  const [createPostMutation, { loading: loadingCreatePost }] = useCreateJobMutation({
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
  const dataSource = dataPosts?.getJobs?.records;

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
    loadingSubmit: loadingGetJob || loadingUpdatePost || loadingCreatePost,
  };

  console.log('lo', loadingGetJob);

  return {
    ...customProps,
    dataSource,
    columnsStateMap,
    form,
    loading: loadingGetJob || loadingDeletePost || state.loadingRefetch,
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
    onSubmit: usePersistFn((record: IJobType['jobRecord']) => {
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
    beforeSearchSubmit: (params?: IJobType['jobRecord'] & PageInfo) => {
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
