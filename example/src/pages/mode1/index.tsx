import { FormLayout } from '@/components/NextLayout';
import TableListCrud from '@/components/TableForm/TableListCrud';
import '@/graphQl/API';
import { ProColumns } from '@ant-design/pro-table';
import React from 'react';
import { useMode1, IMode1Type } from './useMode1';

export default () => {
  const allTableProps = useMode1();
  const columns: ProColumns<IMode1Type['mode1Record']>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      align: 'left',
      valueType: 'text',
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
