import React, { forwardRef } from 'react';
import { Store } from 'antd/es/form/interface';
import { history } from 'umi';
import { useRequest } from 'ahooks';
import { message } from 'antd';

export interface FormActionMethodsInstance {
  onAdd?: () => void;
  onDelete?: (row: Store) => void;
  onEdit?: (row: Store) => void;
  onPreview?: (row: Store) => void;
  onDeleteBatch?: (ids: number[]) => void;
}

export default forwardRef<FormActionMethodsInstance, { reload?: () => void }>(({ reload }, ref) => {
  const formActionRef = ref as React.MutableRefObject<FormActionMethodsInstance>;
  const { run: handleDelete } = useRequest(API.recruitment.person.remove.fetch, {
    manual: true,
    onSuccess: () => {
      message.success('Delete successfully');
      reload && reload();
    },
  });
  const { run: handleDeleteBatch } = useRequest(API.recruitment.person.deleteBatch, {
    manual: true,
    onSuccess: () => {
      message.success('Batch delete success');
      reload && reload();
    },
  });

  /** Add */
  formActionRef.current.onAdd = () => history.push('/Users/edit');

  /** Delete */
  formActionRef.current.onDelete = (row: Store) => handleDelete(row.id);

  /** Edit */
  formActionRef.current.onEdit = (row: Store) => history.push(`/Users/edit?id=${row.id}`);

  /** batch deletion */
  formActionRef.current.onDeleteBatch = (ids: number[]) => handleDeleteBatch(ids);

  return <></>;
});
