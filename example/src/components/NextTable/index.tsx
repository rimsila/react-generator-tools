import type { ProTableProps } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ReactNode } from 'react';
import { memo } from 'react';
import css from './index.less';

export type INextTable<T = Record<string, any>, U = Record<string, any>, ValueType = 'text'> = {
  children?: ReactNode;
} & ProTableProps<T, U, ValueType>;

function NextTable<T = Record<string, any>, U = Record<string, any>, ValueType = 'text'>(
  props: INextTable<T, U, ValueType>,
) {
  const { children, ...rest } = props;
  const { options, scroll, headerTitle } = rest || {};

  return (
    <ProTable
      rowKey="id"
      {...{
        className: css.nextTable,
        dateFormatter: 'string',
        // * ------- modal form --------

        ...rest,
        // search: {
        //   ...rest?.search,
        //   filterType:
        //     // @ts-ignore
        //     rest?.filter || isDownMd()
        //       ? 'query'
        //       : // @ts-ignore
        //       rest?.type === 'form' && rest?.search?.filterType === 'light'
        //       ? 'query'
        //       : // @ts-ignore
        //         (rest?.type === 'table' && (rest?.search?.filterType || 'light')) || 'query',
        // },
        scroll: {
          scrollToFirstRowOnChange: true,
          x: true,
          ...scroll,
          // y: (isXl() && '60vh') || (isMd() && '32vh') || '40vh',
        },
        options: {
          fullScreen: true,
          density: true,
          reload: true,
          ...options,
        },
        manualRequest: true,
        headerTitle: (
          <h4
            {...{
              style: {
                margin: 0,
                textTransform: 'capitalize',
              },
            }}
          >
            {headerTitle}
          </h4>
        ),
      }}
    >
      {children}
    </ProTable>
  );
}

export default memo(NextTable);
