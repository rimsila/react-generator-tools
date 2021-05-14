import { ITableList } from '@/components/TableForm/TableListCrud';
import { API } from '@/graphQl/API';
import {
  useCreateProductsMutation,
  useDeleteProductsMutation,
  useProductsQuery,
  useUpdateProductsMutation,
} from '@/graphQl/hooks';
import { ProductsFilter } from '@/graphQl/schemas';
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
  record: API.Products;
  type: ProSchemaComponentTypes;
  id: string;
  input: API.UpdateProducts;
}>;

export const useHook = () => {
  const [form] = Form.useForm();
  const filterValue = useReactive<{ filter: ProductsFilter }>({});
  const state = useReactive<IState>({
    type: 'table',
    add: true,
  });

  const { type } = state;
  const isModifyMode = type === 'form';
  const [columnsStateMap, setColMap] = useLocalStorageState('products', {});
  const resetForm = () => form.resetFields();

  const defaultPaging = {
    limit: 10,
    page: 10,
  };
  const { data: dataProducts, loading: loadingTable } = useProductsQuery({
    variables: {
      filter: {
        ...filterValue.filter,
      },
    },
  });

  const [deleteProductsMutation, { loading: loadingDeleteProducts }] = useDeleteProductsMutation({
    onCompleted: () => {
      message.success('Deleted Successfully!');
      state.type = 'table';
    },
  });
  const [updateProductsMutation, { loading: loadingUpdateProducts }] = useUpdateProductsMutation({
    onCompleted: () => {
      message.success('Update Successfully!');
      state.type = 'table';
    },
  });
  const [createProductsMutation, { loading: loadingCreateProducts }] = useCreateProductsMutation({
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
      deleteProductsMutation({ variables: { id: record?.id } });
    }
  });

  const dataSource = dataProducts?.products?.data;

  const pageName = 'Products';
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
    loadingSubmit: loadingUpdateProducts || loadingCreateProducts,
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
    loading: loadingTable || loadingDeleteProducts,
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
      useLockFn(async (record: API.ProductsType) => {
        // console.log('submit', record);
        if (!isEmpty(record)) {
          const input = omit(record, 'id');
          if (state.edit) {
            await updateProductsMutation({ variables: { input, id: record?.id } });
          }
          if (state.add) {
            console.log('add', record);
            await createProductsMutation({ variables: record });
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
