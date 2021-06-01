import { FormLayout } from '@/components/NextLayout';
import TableListCrud from '@/components/TableForm/TableListCrud';
import '@/graphQl/API';
import { ProColumns } from '@ant-design/pro-table';
import React from 'react';
import { useMode, IModeType } from './useMode';

export default () => {
  const allTableProps = useMode();
  const columns: ProColumns<IModeType['modeRecord']>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      align: 'left',
      valueType: 'index',
    },
    {
      title: 'title',
      dataIndex: 'title',
      align: 'left',
      valueType: 'text',
    },
    {
      title: 'type',
      dataIndex: 'type',
      align: 'left',
      valueType: 'text',
    },
    {
      title: 'description',
      dataIndex: 'description',
      align: 'left',
      valueType: 'textarea',
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
