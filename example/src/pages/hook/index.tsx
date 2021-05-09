import TableListCrud from '@/components/TableForm/TableListCrud';
import '@/components/TableForm/TableListCrud/hook';
import 'ahooks/es';
import 'antd';
import React from 'react';
import { FormLayout } from '@/components/NextLayout';
import { mockData } from '@/constant';

export default () => {
  const columns: ProColumns<any>[] = [
    {
      prop: 'email',
      title: 'email',
      dataIndex: 'email',
      align: 'left',
      ellipsis: false,
      copyable: false,
      valueType: 'text',
      hideInSearch: false,
      hideInTable: false,
    },
  ];

  const getName = () => (isEditMode && 'Edit hook') || (isViewMode && 'View hook') || ' Add hook';

  return (
    <>
      <FormLayout
        style={{
          padding: 30,
        }}
      >
        {/* @ts-ignore */}
        <TableListCrud
          {...{
            refresh: refreshAll,
            loadingAdd,
            loadingEdit,
            loadingTable: loadingTable || loadingDefaultJob,
            loadingDel,
            form,
            tabListName: 'hook List',
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
                setFilter({
                  pageSize,
                  current: page,
                });
              },
            },
          }}
        />
      </FormLayout>
    </>
  );
};
