import {useState} from'react';
import {ColumnType} from'antd/lib/table';
import {useImmer} from'use-immer';

export default function useTable() {
  const [columns, setColumns] = useImmer<any>([]);
  const [index, setIndex] = useState<number>(0); // the index of the currently selected form element
  const [currentColumn, setCurrentColumn] = useState(); // currently selected form element

  /**
   * Move form item up
   * @param index
   */
  const moveUp = (index: number) => () => {
    if (index === 0) return;

    setColumns(draft => {
      // Get the item corresponding to this index
      const column = draft.splice(index, 1);
      // insert it back
      draft.splice(index-1, 0, ...column);
    });
  };
  /**
   * Move form item down
   * @param index
   */
  const moveDown = (index: number) => () => {
    if (index === columns.length-1) return;

    setColumns(draft => {
      // Get the item corresponding to this index
      const column = draft.splice(index, 1);
      // insert it back
      draft.splice(index + 1, 0, ...column);
    });
  };
  /**
   * Configure table columns
   * @param formItem
   * @param index
   */
  const configColumn = (column: ColumnType<never>, index: number) => {
    setIndex(index);
    setCurrentColumn(column as any);
  };

  /** Configuration complete */
  const handleConfirm = (columnProps: ColumnType<any>) => {
    setColumns(draft => {
      const column = draft.find((item:any) => item?.dataIndex === columnProps.dataIndex);
      if (!currentColumn && !column) {
        draft.push(columnProps as never);
      } else {
        //@ts-ignore
        draft[index] = columnProps;
      }
    });
  };

  /**
   * delete configuration items
   * @param index
   */
  const deleteColumn = (index: number) => () => {
    setColumns(draft => {
      draft.splice(index, 1);
    });
  };

  /**
   * Copy configuration items
   * @param index
   */
  const copyColumn = (index: number) => () => {
    setColumns(draft => {
      const column = draft[index];
      draft.splice(index + 1, 0, column);
    });
  };

  return {
    columns,
    setColumns,
    moveUp,
    moveDown,
    configColumn,
    deleteColumn,
    copyColumn,
    index,
    setIndex,
    currentColumn,
    setCurrentColumn,
    onConfirm: handleConfirm,
  };
}
