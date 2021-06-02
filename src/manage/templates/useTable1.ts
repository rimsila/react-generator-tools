/*

 * @Date: 2020-05-08 16:14:11
 * @LastEditTime: 2020-10-27 14:07:26
 */
import { capitalize } from 'lodash';

export interface Payload<T> {
  pageName: string;
}

export default function generateUseTable1<T>(payload: Payload<T>): string {
  if (payload) {
    const { pageName } = payload;
    const pageNameCapitalize = capitalize(pageName);

    const code = `
    import { ITableList } from '@/components/TableForm/TableListCrud';
    import { ISuccessAction, successAction } from '@/components/TableForm/TableListCrud/successAction';
    import { ICrudState } from '@/components/TableForm/TableListCrud/TableCrud';
    import { API } from '@/graphQl/API';
    import { useCreate${pageNameCapitalize}Mutation, useDelete${pageNameCapitalize}sMutation, useGet${pageNameCapitalize}sQuery, useUpdate${pageNameCapitalize}sMutation } from '@/graphQl/hooks';
    import { getOnlyValue } from '@/utils/arrObj';
    import { PageInfo } from '@ant-design/pro-table/lib/typing';
    import { useCreation } from 'ahooks';
    import { useLocalStorageState, usePersistFn, useReactive } from 'ahooks/es';
    import { Form } from 'antd';
    import isEmpty from 'lodash/isEmpty';
/**
 * ----------------------- Interface ----------------------
 */
export type I${pageNameCapitalize}Type = {
  filter: API.Get${pageNameCapitalize}sQueryVariables['filter'];
  ${pageName}Input: API.Create${pageNameCapitalize}MutationVariables['input'];
  ${pageName}Update: API.Update${pageNameCapitalize}sMutationVariables['input'];
  ${pageName}Delete: API.Delete${pageNameCapitalize}sMutationVariables;
  ${pageName}Record: API.Get${pageNameCapitalize}sQuery['get${pageNameCapitalize}s']['records'][0] & { status: any };
  ${pageName}Metadata: API.Get${pageNameCapitalize}sQuery['get${pageNameCapitalize}s']['metadata'];
};

type IState = Partial<ICrudState & { record: I${pageNameCapitalize}Type['${pageName}Record'] }>;

export const use${pageNameCapitalize} = () => {
  /**
   * ----------------------- State and Function ----------------------
   */
  const [form] = Form.useForm();

  const [columnsStateMap, setColMap] = useLocalStorageState('${pageName}Column', {});

  const defaultFilter: I${pageNameCapitalize}Type['filter'] = {
    limit: 10,
    page: 1,
  };

  const filterValue = useReactive<{ filter?: I${pageNameCapitalize}Type['filter'] }>({
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
    successAction({ form, state: state as any, refetch: refetch${pageNameCapitalize}s, ...params });
  };

  /**
   * ----------------------- useGet${pageNameCapitalize}sQuery ----------------------
   */
  const { data: data${pageNameCapitalize}s, loading: loadingGet${pageNameCapitalize}, refetch: refetch${pageNameCapitalize}s } = useGet${pageNameCapitalize}sQuery({
    variables: {
      filter,
    },
  });

  /**
   * ----------------------- delete${pageNameCapitalize}Mutation ----------------------
   */
  const [delete${pageNameCapitalize}Mutation, { loading: loadingDelete${pageNameCapitalize} }] = useDelete${pageNameCapitalize}sMutation({
    onCompleted: (res) => {
      res?.delete${pageNameCapitalize} && afterSuccessAction();
    },
  });
  /**
   * ----------------------- update${pageNameCapitalize}Mutation ----------------------
   */
  const [update${pageNameCapitalize}Mutation, { loading: loadingUpdate${pageNameCapitalize} }] = useUpdate${pageNameCapitalize}sMutation({
    onCompleted: (res) => {
      res?.update${pageNameCapitalize} && afterSuccessAction();
    },
  });

  /**
   * ----------------------- create${pageNameCapitalize}Mutation ----------------------
   */
  const [create${pageNameCapitalize}Mutation, { loading: loadingCreate${pageNameCapitalize} }] = useCreate${pageNameCapitalize}Mutation({
    onCompleted: (res) => {
      res?.create${pageNameCapitalize} && afterSuccessAction();
    },
  });

  /**
   *   ----------------------- Submit Part ----------------------
   */
  const setMode = usePersistFn(({ record }: IState) => {
    if (state.isDelete) {
      delete${pageNameCapitalize}Mutation({ variables: { id: record?.id } });
    }
  });

  /**
   * ----------------------- Return State& Props ----------------------
   */
  const dataSource = data${pageNameCapitalize}s?.get${pageNameCapitalize}s?.records;

  const pageName = ${pageNameCapitalize};
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
    loadingSubmit: loadingGet${pageNameCapitalize} || loadingUpdate${pageNameCapitalize} || loadingCreate${pageNameCapitalize},
  };

  console.log('lo', loadingGet${pageNameCapitalize});

  return {
    ...customProps,
    dataSource,
    columnsStateMap,
    form,
    loading: loadingGet${pageNameCapitalize} || loadingDelete${pageNameCapitalize} || state.loadingRefetch,
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
    onSubmit: usePersistFn((record: I${pageNameCapitalize}Type['${pageName}Record']) => {
      // console.log('submit', record);
      if (!isEmpty(record)) {
        const input = getOnlyValue(record) as typeof record;
        if (state.edit) {
          update${pageNameCapitalize}Mutation({ variables: { input } });
        }
        if (state.add) {
          // console.log('add', record);
          create${pageNameCapitalize}Mutation({ variables: { input } });
        }
      }
    }),
    beforeSearchSubmit: (params?: I${pageNameCapitalize}Type['${pageName}Record'] & PageInfo) => {
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
    onChange: (pagination) => {
      const { pageSize, current } = pagination;
      // console.log('dd', pagination);
      filterValue.filter = {
        ...filterValue.filter,
        limit: pageSize,
        page: current,
      };
    },
  } as ITableList & typeof customProps;
}
 `;
    return code;
  }
  return'';
}
