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
    import { API } from '@/graphQl/API';
    import { useCreate${pageNameCapitalize}Mutation, useDelete${pageNameCapitalize}Mutation, use${pageNameCapitalize}Query, useUpdate${pageNameCapitalize}Mutation } from '@/graphQl/hooks';
    import { ${pageNameCapitalize}Filter } from '@/graphQl/schemas';
    import  { ProSchemaComponentTypes } from '@ant-design/pro-utils';
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
      record: API.${pageNameCapitalize};
      type: ProSchemaComponentTypes;
      id: string;
      input: API.Update${pageNameCapitalize};
    }>;

    export const useHook = () => {
      const [form] = Form.useForm();
      const filterValue = useReactive<{filter:${pageNameCapitalize}Filter}>({});
      const state = useReactive<IState>({
        type: 'table',
        add: true,
      });

      const { type } = state;
      const isModifyMode = type === 'form';
      const [columnsStateMap, setColMap] = useLocalStorageState('${pageName}', {});
      const resetForm = () => form.resetFields();

      const defaultPaging = {
        limit: 10,
        page: 10,
      };
      const { data: data${pageNameCapitalize}, loading: loadingTable } = use${pageNameCapitalize}Query({
        variables: {
          filter: {
            ...filterValue.filter,
          },
        },
      });

      const [delete${pageNameCapitalize}Mutation, { loading: loadingDelete${pageNameCapitalize} }] = useDelete${pageNameCapitalize}Mutation({
        onCompleted: () => {
          message.success('Deleted Successfully!');
          state.type = 'table';
        },
      });
      const [update${pageNameCapitalize}Mutation, { loading: loadingUpdate${pageNameCapitalize} }] = useUpdate${pageNameCapitalize}Mutation({
        onCompleted: () => {
          message.success('Update Successfully!');
          state.type = 'table';
        },
      });
      const [create${pageNameCapitalize}Mutation, { loading: loadingCreate${pageNameCapitalize} }] = useCreate${pageNameCapitalize}Mutation({
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
          delete${pageNameCapitalize}Mutation({ variables: { id: record?.id } });
        }
      });

      const dataSource = data${pageNameCapitalize}?.${pageName}?.data;

      const pageName = '${pageNameCapitalize}';
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
        loadingSubmit: loadingUpdate${pageNameCapitalize} || loadingCreate${pageNameCapitalize},
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
        loading: loadingTable || loadingDelete${pageNameCapitalize},
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
          useLockFn(async (record: API.${pageNameCapitalize}Type) => {
            // console.log('submit', record);
            if (!isEmpty(record)) {
              const input = omit(record, 'id');
              if (state.edit) {
                await update${pageNameCapitalize}Mutation({ variables: { input, id: record?.id } });
              }
              if (state.add) {
                console.log('add', record);
                await create${pageNameCapitalize}Mutation({ variables: record });
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
        onChange: (pagination) => {
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
    `;
    return code;
  }
  return'';
}
