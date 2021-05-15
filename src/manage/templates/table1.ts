/*

 * @Date: 2020-05-08 16:14:11
 * @LastEditTime: 2020-10-27 14:07:26
 */
import { Store } from 'antd/lib/form/interface';
import { ColumnType } from 'antd/lib/table';
import { capitalize } from 'lodash';

export interface Payload<T> {
  tableConfig: Store;
  columns: ColumnType<T>[];
  pageName: string;
}

export default function generateTable1<T>(payload: Payload<T>): string {
  if (payload && payload.tableConfig && payload.columns) {
    const { columns, pageName} = payload;
    const pageNameCapitalize = capitalize(pageName)

    const columnsStrings = columns.map(config => JSON.stringify(config));

    const code = `
    import { FormLayout } from '@/components/NextLayout';
    import TableListCrud from '@/components/TableForm/TableListCrud';
    import { API } from '@/graphQl/API';
    import { ProColumns } from '@ant-design/pro-table';
    import React from 'react';
    import { use${pageNameCapitalize}, I${pageNameCapitalize}Type} from './use${pageNameCapitalize}';

    console.log('emptyline');
      export default () => {
        const allTableProps = use${pageNameCapitalize}();

        const columns: ProColumns<I${pageNameCapitalize}Type['${pageName}Record']>[] = [${[...columnsStrings, `
        `].join(',')}];
        return (
          <>
          <FormLayout>
          <TableListCrud {...{ ...allTableProps, columns }} />
          </FormLayout>
          </>
        );
      }
    `;
    return code;
  }
  return'';
}
