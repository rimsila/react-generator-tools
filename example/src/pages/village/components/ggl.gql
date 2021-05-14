import { FormLayout } from '@/components/NextLayout';
import TableListCrud from '@/components/TableForm/TableListCrud';
import { API } from '@/graphQl/API';
import { ProColumns } from '@ant-design/pro-table';
import React from 'react';
import { useHook } from './components/useHook';

export default () => {
  const allTableProps = useHook();

  const columns: ProColumns<any>[] = [
    {
      title: 'post_id',
      dataIndex: 'post_id',
      align: 'left',
      ellipsis: false,
      copyable: false,
      valueType: 'text',
      hideInSearch: false,
      hideInTable: false,
    },
  ];
  return (
    <>
      <FormLayout>
        <TableListCrud {...{ ...allTableProps, columns }} />
      </FormLayout>
    </>
  );
};
