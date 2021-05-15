import { FormLayout } from '@/components/NextLayout';
import TableListCrud from '@/components/TableForm/TableListCrud';
import '@/graphQl/API';
import { ProColumns } from '@ant-design/pro-table';
import React from 'react';
import { useJob, IJobType } from './useJob';

export default () => {
  const allTableProps = useJob();
  const columns: ProColumns<IJobType['jobRecord']>[] = [
    {
      title: 'grossSalary',
      dataIndex: 'grossSalary',
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
