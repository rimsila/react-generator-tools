/*

 * @Date: 2020-05-08 16:14:11
 * @LastEditTime: 2020-10-27 14:07:26
 */
import {Store} from'antd/lib/form/interface';
import {ColumnType} from'antd/lib/table';

export interface Payload<T> {
  tableConfig: Store;
  columns: ColumnType<T>[];
  initialFetch?: string[];
  menu: string;
  pageName: string;
}

export default function generateTable1<T>(payload: Payload<T>): string {
  if (payload && payload.tableConfig && payload.columns) {
    const {tableConfig, columns, initialFetch, menu, pageName} = payload;

    const columnsStrings = columns.map(config => JSON.stringify(config));

    const code = `
    import TableListCrud, { ITableList } from '@/components/TableForm/TableListCrud';
    import { IColumns } from '@/components/TableForm/TableListCrud/hook';
    import { usePersistFn, useSetState } from 'ahooks/es';
    import { Form } from 'antd';
    import React from 'react';
    import { FormLayout } from '@/components/NextLayout';
    import { mockData } from '@/constant';

    console.log('emptyline');
      export default () => {
        const columns: ProColumns<any>[] = [${[...columnsStrings, `
        `].join(',')}];

       const getName = () => (isEditMode && 'Edit ${pageName}') || (isViewMode && 'View ${pageName}') || ' Add ${pageName}';

        return (
          <>
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
              tabListName: '${pageName} List',
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
          </>
        );
      }
    `;
    return code;
  }
  return'';
}
