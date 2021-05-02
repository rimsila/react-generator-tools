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
      message.success('删除成功');
      reload && reload();
    },
  });
  const { run: handleDeleteBatch } = useRequest(API.recruitment.person.deleteBatch, {
    manual: true,
    onSuccess: () => {
      message.success('批量删除成功');
      reload && reload();
    },
  });

  /** 新增 */
  formActionRef.current.onAdd = () => history.push('/Users/edit');

  /** 删除 */
  formActionRef.current.onDelete = (row: Store) => handleDelete(row.id);

  /** 编辑 */
  formActionRef.current.onEdit = (row: Store) => history.push(`/Users/edit?id=${row.id}`);

  /** 批量删除 */
  formActionRef.current.onDeleteBatch = (ids: number[]) => handleDeleteBatch(ids);

  return <></>;
});
