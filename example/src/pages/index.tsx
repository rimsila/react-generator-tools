import { FormLayout } from '@/components/NextLayout';
import TableListCrud from '@/components/TableForm/TableListCrud';
import { ProColumns } from '@ant-design/pro-table';
import React, { memo } from 'react';
import { IJobType, useIndex } from './useIndex';

export default memo(() => {
  const allTableProps = useIndex();
  const { isModifyMode } = allTableProps;

  //* ------------------ columns data ------------------------
  const columns: ProColumns<IJobType['jobRecord']>[] = [
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
        style: isModifyMode ? { display: 'inline-block', width: 'calc(50% - 0px)', paddingRight: 10 } : {},
        rules: [
          {
            required: true,
            whitespace: true,
          },
        ],
      },
    },
  ];

  //* ------------------ return data ------------------------
  return (
    <FormLayout style={{ maxWidth: '90%', margin: 'auto' }}>
      <TableListCrud {...{ ...allTableProps, columns }} />
    </FormLayout>
  );
});
