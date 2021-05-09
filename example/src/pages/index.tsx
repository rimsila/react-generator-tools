import TableListCrud, { ITableList } from '@/components/TableForm/TableListCrud';
import { IColumns } from '@/components/TableForm/TableListCrud/hook';
import { usePersistFn, useSetState } from 'ahooks/es';
import { Form } from 'antd';
import React from 'react';
import { FormLayout } from '@/components/NextLayout';
import { mockData } from '@/constant';

type IAddSchema = {
  isAddSchema: boolean;
};

type IState = {
  visibleModal: boolean;
  visiblePopDel: boolean;
  isEditMode: boolean;
  isViewMode: boolean;
  isAddMode: boolean;
  type?: 'form' | 'table';
  filter?: {
    _timestamp?: number;
  };

  isModalMode: boolean; //* form mode style
  record?: any;
} & IAddSchema;

export default () => {
  const [formFilter] = Form.useForm();

  const [state, setState] = useSetState<Partial<IState>>({
    filter: {},
    type: 'table',
  });

  const { visibleModal, visiblePopDel, isEditMode, isViewMode, isModalMode, isAddMode, record = {}, filter, type } =
    state || {};

  const data = {};
  const {
    runGetJob,
    loadingTable,
    runEditJob,
    runAddJob,
    // runDelJob,
    loadingDel,
    loadingAdd,
    loadingEdit,
    form,
    jobMetadata,
    runDelJob,
    loadingDefaultJob,
  } = data || {};

  // console.log('dataSource', dataSource);

  const isMutate = isAddMode || isEditMode;

  //* ------------------ set modal/form mode ------------------------

  const setType = usePersistFn((type?: 'form' | 'table') => {
    setState({
      type,
    });
  });

  //* ------------------ set modal/form mode ------------------------

  const setFilter = usePersistFn((filter?: any) => {
    setState({
      filter,
    });
  });

  // * ------------ refresh and clear filter --------------
  const refreshAll = async () => {
    formFilter.resetFields();
    setFilter({});
    // await refresh();
  };

  const setVisibleModal = usePersistFn(() => {
    setState((prev) => ({
      visibleModal: !prev.visibleModal,
    }));
  });

  const setAdd = usePersistFn((isAddMode: boolean) => {
    setState({
      isAddMode,
    });
  });

  const setEdit = usePersistFn((isEditMode: boolean, record?: any) => {
    setState({
      isEditMode,
      record,
    });
  });

  const setViewMode = usePersistFn((isViewMode: boolean) => {
    setState({
      isViewMode,
    });
  });

  const backTable = () => {
    setEdit(false);
    setAdd(false);
    setType('table');
  };

  //* ------------------ Submit part ------------------------
  const onClickDelete = usePersistFn((v) => {
    if (v?.id) {
      // runDelJob(v?.id);
    }

    console.log('delete', v);
  });

  const onSubmit = usePersistFn(async (params: any) => {
    // console.log('11111111111', params);
    // if (isEditMode && record?.id && !isEmpty(params)) {
    //   runEditJob({ ...params, id: record?.id }).then((res) => {
    //     if (!res?.data) {
    //       backTable();
    //     }
    //   });
    // }
    // if (!isViewMode && !isEditMode && !isEmpty(params)) {
    //   runAddJob(params);
    // }
    // // console.log('submit edit', params);
    // if (!isViewMode) {
    //   // setEdit(false);
    //   setViewMode(false);
    // }
    // if (isModalMode) {
    //   setVisibleModal();
    // }
  });

  const beforeSearchSubmit = (params) => {
    // runGetJob({ status: params.status });
    // setFilter(params);
    // console.log('222222', params);
  };

  //* ------------------ columns data ------------------------

  const columns: IColumns[] = [
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
        style: !isMutate ? {} : { display: 'inline-block', width: 'calc(50% - 0px)', paddingRight: 10 },

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
        style: !isMutate ? {} : { display: 'inline-block', width: 'calc(50% - 0px)', paddingRight: 10 },

        rules: [
          {
            required: true,
            whitespace: true,
          },
        ],
      },
    },
  ];

  console.log('mockData', mockData());

  const getName = () => (isEditMode && 'Edit Job') || (isViewMode && 'View Job') || ' Add Job';

  //* ------------------ return data ------------------------
  return (
    <FormLayout style={{ padding: 30 }}>
      {/* @ts-ignore */}
      <TableListCrud
        {...{
          refresh: refreshAll,
          loadingAdd,
          loadingEdit,
          loadingTable: loadingTable || loadingDefaultJob,
          loadingDel,
          form,
          tabListName: 'Job List',
          tabFormName: (isViewMode && 'View Job Form') || (isEditMode && 'Edit Job Form') || 'Add Job Form',
          model: {
            isShowAdd: true,
            isModalMode,
            onClickDelete,
            setEdit,
            setVisibleModal,
            onSubmit,
            beforeSearchSubmit,
            visibleModal,
            visiblePopDel,
            isEditMode,
            setViewMode,
            isViewMode,
            setAdd,
            isAddMode,
            setType,
            type,
          },
          title: getName(),
          columns,
          dataSource: mockData(),
          search: {
            form: formFilter,
            labelWidth: 'auto',
          },
          pagination: {
            pageSize: jobMetadata?.limit,
            total: jobMetadata?.total,
            current: jobMetadata?.page,
            onChange: (page, pageSize) => {
              setFilter({ pageSize, current: page });
            },
          },
        }}
      />
    </FormLayout>
  );
};
